import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-root-folders-and-api',
        configureServer(server) {
          // 1. Serve static files from root folders: image, pdf, audio, video, assets
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            const folders = ['/image/', '/pdf/', '/audio/', '/video/', '/assets/'];
            const matchedFolder = folders.find(f => url.startsWith(f));
            
            if (matchedFolder) {
              const cleanUrl = url.split('?')[0];
              const filePath = path.join(process.cwd(), cleanUrl);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const mimeTypes: Record<string, string> = {
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.png': 'image/png',
                  '.gif': 'image/gif',
                  '.svg': 'image/svg+xml',
                  '.pdf': 'application/pdf',
                  '.mp3': 'audio/mpeg',
                  '.wav': 'audio/wav',
                  '.mp4': 'video/mp4'
                };
                res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
                res.setHeader('Access-Control-Allow-Origin', '*');
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            next();
          });

          // 2. File management API (GET, POST, DELETE) for Admin Panel
          server.middlewares.use('/api/files', (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', '*');
            
            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }

            const parsedUrl = new URL(req.url || '', `http://${req.headers.host}`);
            
            // GET: List files in a root folder
            if (req.method === 'GET') {
              const folderName = parsedUrl.searchParams.get('folder') || 'image';
              if (!['image', 'pdf', 'audio', 'video', 'assets'].includes(folderName)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid folder name' }));
                return;
              }
              
              const targetDir = path.join(process.cwd(), folderName);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              const files = fs.readdirSync(targetDir).map(file => {
                const stats = fs.statSync(path.join(targetDir, file));
                return {
                  name: file,
                  url: `/${folderName}/${file}`,
                  size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
                  mtime: stats.mtime
                };
              });
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(files));
              return;
            }
            
            // POST: Upload binary file
            if (req.method === 'POST') {
              const folderName = req.headers['x-folder-name'] as string || 'image';
              const rawFileName = req.headers['x-file-name'] as string || '';
              
              if (!rawFileName) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing x-file-name header' }));
                return;
              }
              
              if (!['image', 'pdf', 'audio', 'video', 'assets'].includes(folderName)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid folder name' }));
                return;
              }

              // De-accent, lowercase, convert spaces to underscore, and filter characters for clean format
              const decodedName = decodeURIComponent(rawFileName);
              const nameParts = decodedName.split('.');
              const ext = nameParts.length > 1 ? nameParts.pop()?.toLowerCase() : '';
              const baseName = nameParts.join('.');
              
              const cleanBase = baseName
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^a-z0-9_-]/g, '');
                
              const cleanFileName = ext ? `${cleanBase}.${ext}` : cleanBase;
              
              const targetDir = path.join(process.cwd(), folderName);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              const destPath = path.join(targetDir, cleanFileName);
              const writeStream = fs.createWriteStream(destPath);
              
              req.pipe(writeStream);
              
              writeStream.on('finish', () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, name: cleanFileName, url: `/${folderName}/${cleanFileName}` }));
              });
              
              writeStream.on('error', (err) => {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              });
              return;
            }
            
            // DELETE: Delete file
            if (req.method === 'DELETE') {
              const folderName = parsedUrl.searchParams.get('folder') || 'image';
              const fileName = parsedUrl.searchParams.get('name');
              
              if (!fileName) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing name parameter' }));
                return;
              }
              
              if (!['image', 'pdf', 'audio', 'video', 'assets'].includes(folderName)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid folder' }));
                return;
              }
              
              const targetPath = path.join(process.cwd(), folderName, fileName);
              if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'File not found' }));
              }
              return;
            }
            
            res.statusCode = 405;
            res.end();
          });
        },
        closeBundle() {
          // Copy root storage folders to dist on build for production hosting compatibility
          const folders = ['image', 'pdf', 'audio', 'video', 'assets'];
          const distPath = path.join(process.cwd(), 'dist');
          if (!fs.existsSync(distPath)) return;
          
          const copyRecursive = (src: string, dest: string) => {
            if (!fs.existsSync(src)) return;
            const stats = fs.statSync(src);
            if (stats.isDirectory()) {
              if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
              const children = fs.readdirSync(src);
              children.forEach(child => {
                copyRecursive(path.join(src, child), path.join(dest, child));
              });
            } else {
              fs.copyFileSync(src, dest);
            }
          };

          folders.forEach(folder => {
            const srcDir = path.join(process.cwd(), folder);
            const destDir = path.join(distPath, folder);
            if (fs.existsSync(srcDir)) {
              try {
                copyRecursive(srcDir, destDir);
              } catch (e) {
                console.error(`Error copying folder ${folder} to dist:`, e);
              }
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
