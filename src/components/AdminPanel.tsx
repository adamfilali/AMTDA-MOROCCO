import React, { useState, useEffect } from 'react';
import { Testimonial, GalleryItem, Article, ClickStats, Song, CultureItem } from '../types';
import { 
  Lock, Unlock, BarChart3, Image as ImageIcon, FileText, CheckSquare, 
  Settings, Trash2, Plus, RefreshCw, BookMarked, Upload, Clipboard, CheckCircle, AlertCircle, Music, Edit, Film, BookOpenCheck
} from 'lucide-react';
import { playChime } from './AudioPlayer';

interface AdminPanelProps {
  galleryItems: GalleryItem[];
  setGalleryItems: (items: GalleryItem[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (items: Testimonial[]) => void;
  articles: Article[];
  setArticles: (items: Article[]) => void;
  pdfFiles: any[];
  setPdfFiles: (files: any[]) => void;
  books: any[];
  setBooks: (books: any[]) => void;
  songs?: Song[];
  setSongs?: (songs: Song[]) => void;
  cultureItems?: CultureItem[];
  setCultureItems?: (items: CultureItem[]) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  homePageImage?: string;
  setHomePageImage?: (url: string) => void;
  stats: ClickStats;
  onResetStats: () => void;
}

export default function AdminPanel({
  galleryItems,
  setGalleryItems,
  testimonials,
  setTestimonials,
  articles,
  setArticles,
  pdfFiles,
  setPdfFiles,
  books,
  setBooks,
  songs = [],
  setSongs = () => {},
  cultureItems = [],
  setCultureItems = () => {},
  logoUrl,
  setLogoUrl,
  homePageImage = './image/acc.jpg',
  setHomePageImage,
  stats,
  onResetStats
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'gallery' | 'testimonials' | 'articles' | 'pdfs' | 'books' | 'songs' | 'logo' | 'culture'>('stats');

  // Physical files state from the server storage
  const [physicalImages, setPhysicalImages] = useState<{ name: string; url: string; size: string }[]>([]);
  const [physicalPdfs, setPhysicalPdfs] = useState<{ name: string; url: string; size: string }[]>([]);
  const [physicalAudios, setPhysicalAudios] = useState<{ name: string; url: string; size: string }[]>([]);
  const [physicalVideos, setPhysicalVideos] = useState<{ name: string; url: string; size: string }[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  // Editing states
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Addition form states
  const [newGallery, setNewGallery] = useState({ title: '', url: '', description: '', category: 'events' as any });
  const [newPdf, setNewPdf] = useState({ name: '', url: '', category: 'formation', size: '1.5 MB' });
  const [newArticle, setNewArticle] = useState({ 
    titleFr: '', 
    titleAr: '', 
    excerptFr: '', 
    excerptAr: '', 
    contentFr: '', 
    contentAr: '', 
    image: '' 
  });
  const [newBook, setNewBook] = useState({ title: '', author: 'AMTDA Éditions', description: '', coverColor: '#92C83E', coverImage: '', pagesText: '' });
  const [newSong, setNewSong] = useState({ title: '', artist: 'AMTDA Kids', url: '', lyrics: '' });
  const [newCultureItem, setNewCultureItem] = useState({ 
    type: 'video' as 'video' | 'magazine' | 'tale', 
    title: '', 
    description: '', 
    image: '', 
    actionPayload: '',
    videoUrl: ''
  });
  const [editingCultureId, setEditingCultureId] = useState<string | null>(null);
  const [editingCultureItem, setEditingCultureItem] = useState<CultureItem | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('click');
    if (passwordInput === 'nejjari') {
      setIsAuthenticated(true);
      setErrorMsg('');
      playChime('success');
    } else {
      setErrorMsg('Mot de passe incorrect / رمز خاطئ');
      playChime('fail');
    }
  };

  const handleLogout = () => {
    playChime('click');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const isLocalImage = (url: string) => {
    if (!url) return true;
    if (url.startsWith('data:')) return true; // base64 is local/in-state
    if (url.startsWith('/') || url.startsWith('./')) return true; // relative path is local
    
    // Check if it's an absolute URL pointing to our current host
    try {
      const parsed = new URL(url);
      return parsed.origin === window.location.origin;
    } catch (e) {
      // If it's not a valid URL, it's probably a local relative path, so let it pass
      return true;
    }
  };

  // Fetch listed files from the storage folders
  const fetchPhysicalFiles = async (folder: 'image' | 'pdf' | 'audio' | 'video') => {
    try {
      const res = await fetch(`/api/files?folder=${folder}`);
      if (res.ok) {
        const data = await res.json();
        if (folder === 'image') setPhysicalImages(data);
        else if (folder === 'pdf') setPhysicalPdfs(data);
        else if (folder === 'audio') setPhysicalAudios(data);
        else if (folder === 'video') setPhysicalVideos(data);
      }
    } catch (e) {
      console.error('Error fetching files:', e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPhysicalFiles('image');
      fetchPhysicalFiles('pdf');
      fetchPhysicalFiles('audio');
      fetchPhysicalFiles('video');
    }
  }, [isAuthenticated]);

  // Handle local file uploads (POST to API)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: 'image' | 'pdf' | 'audio' | 'logo' | 'culture_video' | 'homepage_image') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    playChime('click');
    const uploadFolder = folder === 'logo' ? 'image' : (folder === 'homepage_image' ? 'image' : (folder === 'culture_video' ? 'video' : folder));
    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'x-folder-name': uploadFolder,
          'x-file-name': encodeURIComponent(file.name),
        },
        body: file
      });
      if (response.ok) {
        const data = await response.json();
        playChime('success');
        await fetchPhysicalFiles(uploadFolder as any);
        // Automatically link the uploaded file to form states
        if (folder === 'image') {
          setNewArticle(prev => ({ ...prev, image: data.url }));
          setNewGallery(prev => ({ ...prev, url: data.url }));
          setNewBook(prev => ({ ...prev, coverImage: data.url }));
          setNewCultureItem(prev => ({ ...prev, image: data.url }));
          if (editingCultureId && editingCultureItem) {
            setEditingCultureItem(prev => prev ? ({ ...prev, image: data.url }) : null);
          }
        } else if (folder === 'logo') {
          setLogoUrl(data.url);
        } else if (folder === 'homepage_image') {
          setHomePageImage?.(data.url);
        } else if (folder === 'audio') {
          setNewSong(prev => ({ ...prev, url: data.url }));
        } else if (folder === 'culture_video') {
          setNewCultureItem(prev => ({ ...prev, videoUrl: data.url }));
          if (editingCultureId && editingCultureItem) {
            setEditingCultureItem(prev => prev ? ({ ...prev, videoUrl: data.url }) : null);
          }
        } else {
          setNewPdf(prev => ({ 
            name: data.name.split('.')[0].replace(/[-_]/g, ' '), 
            url: data.url, 
            category: 'formation',
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
          }));
        }
      } else {
        playChime('fail');
        alert("Erreur lors de l'envoi du fichier.");
      }
    } catch (err) {
      console.error(err);
      playChime('fail');
    } finally {
      setUploading(false);
    }
  };

  // Delete files physically from disk via API
  const handleDeletePhysicalFile = async (folder: 'image' | 'pdf' | 'audio' | 'video', name: string) => {
    if (!confirm(`Voulez-vous supprimer définitivement le fichier "${name}" de l'espace de stockage ?`)) return;
    playChime('click');
    try {
      const response = await fetch(`/api/files?folder=${folder}&name=${encodeURIComponent(name)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        playChime('success');
        fetchPhysicalFiles(folder);
      } else {
        playChime('fail');
        alert("Impossible de supprimer le fichier.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Actions for Gallery
  const handleAddGallery = () => {
    if (!newGallery.title || !newGallery.url) {
      alert("Veuillez renseigner au moins le titre et l'image.");
      return;
    }
    if (!isLocalImage(newGallery.url)) {
      alert("Erreur : Seules les images locales ou téléversées dans le dossier de stockage sont autorisées. Veuillez ne pas utiliser de liens externes d'autres sites.");
      return;
    }
    playChime('success');
    if (editingGalleryId) {
      setGalleryItems(galleryItems.map(item => item.id === editingGalleryId ? {
        ...item,
        title: newGallery.title,
        url: newGallery.url,
        description: newGallery.description || 'Activité de l\'association',
        category: newGallery.category
      } : item));
      setEditingGalleryId(null);
    } else {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        title: newGallery.title,
        url: newGallery.url,
        description: newGallery.description || 'Activité de l\'association',
        category: newGallery.category
      };
      setGalleryItems([newItem, ...galleryItems]);
    }
    setNewGallery({ title: '', url: '', description: '', category: 'events' });
  };

  const handleStartEditGallery = (item: GalleryItem) => {
    playChime('click');
    setEditingGalleryId(item.id);
    setNewGallery({
      title: item.title,
      url: item.url,
      description: item.description || '',
      category: item.category
    });
  };

  const handleCancelEditGallery = () => {
    playChime('click');
    setEditingGalleryId(null);
    setNewGallery({ title: '', url: '', description: '', category: 'events' });
  };

  const handleDeleteGallery = (id: string) => {
    playChime('click');
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  // Actions for Testimonials
  const handleApproveTestimony = (id: string) => {
    playChime('success');
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, isApproved: true } : t));
  };

  const handleDeleteTestimony = (id: string) => {
    playChime('click');
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleStartEditTestimonial = (t: Testimonial) => {
    playChime('click');
    setEditingTestimonialId(t.id);
    setEditingTestimonial({ ...t });
  };

  const handleSaveTestimonialEdit = () => {
    if (!editingTestimonial || !editingTestimonial.name || !editingTestimonial.text) {
      alert("Veuillez remplir le nom et le texte du témoignage.");
      return;
    }
    playChime('success');
    setTestimonials(testimonials.map(t => t.id === editingTestimonialId ? editingTestimonial : t));
    setEditingTestimonialId(null);
    setEditingTestimonial(null);
  };

  const handleCancelEditTestimonial = () => {
    playChime('click');
    setEditingTestimonialId(null);
    setEditingTestimonial(null);
  };

  // Actions for PDFs
  const handleAddPdf = () => {
    if (!newPdf.name) {
      alert("Veuillez indiquer le nom du document.");
      return;
    }
    playChime('success');
    const finalUrl = newPdf.url || '#';
    const finalSize = newPdf.size || '1.5 MB';
    setPdfFiles([...pdfFiles, { 
      id: Date.now().toString(), 
      name: newPdf.name, 
      url: finalUrl, 
      category: newPdf.category, 
      size: finalSize 
    }]);
    setNewPdf({ name: '', url: '', category: 'formation', size: '1.5 MB' });
  };

  const handleDeletePdf = (id: string) => {
    playChime('click');
    setPdfFiles(pdfFiles.filter(p => p.id !== id));
  };

  // Actions for Books (Romans)
  const handleAddBook = () => {
    if (!newBook.title) {
      alert("Veuillez entrer un titre pour ce roman.");
      return;
    }
    if (!newBook.pagesText) {
      alert("Veuillez rédiger au moins une page séparée par le signe '|'.");
      return;
    }
    if (newBook.coverImage && !isLocalImage(newBook.coverImage)) {
      alert("Erreur : La photo de couverture doit être une image locale ou téléversée dans le dossier de stockage.");
      return;
    }
    playChime('success');
    const rawPages = newBook.pagesText.split('|').map(p => p.trim()).filter(Boolean);
    if (editingBookId) {
      setBooks(books.map(b => b.id === editingBookId ? {
        ...b,
        title: newBook.title,
        author: newBook.author || 'AMTDA Éditions',
        description: newBook.description || 'Histoire éducative inclusive.',
        coverColor: newBook.coverColor,
        coverImage: newBook.coverImage,
        coverUrl: newBook.coverImage,
        pages: rawPages.length > 0 ? rawPages : ['Histoire en cours de rédaction...']
      } : b));
      setEditingBookId(null);
    } else {
      const newItem = {
        id: Date.now().toString(),
        title: newBook.title,
        author: newBook.author || 'AMTDA Éditions',
        description: newBook.description || 'Histoire éducative inclusive.',
        coverColor: newBook.coverColor,
        coverImage: newBook.coverImage,
        coverUrl: newBook.coverImage,
        pages: rawPages.length > 0 ? rawPages : ['Histoire en cours de rédaction...']
      };
      setBooks([newItem, ...books]);
    }
    setNewBook({ title: '', author: 'AMTDA Éditions', description: '', coverColor: '#92C83E', coverImage: '', pagesText: '' });
  };

  const handleStartEditBook = (book: any) => {
    playChime('click');
    setEditingBookId(book.id);
    setNewBook({
      title: book.title,
      author: book.author,
      description: book.description || '',
      coverColor: book.coverColor || '#92C83E',
      coverImage: book.coverImage || book.coverUrl || '',
      pagesText: (book.pages || []).join(' | ')
    });
  };

  const handleCancelEditBook = () => {
    playChime('click');
    setEditingBookId(null);
    setNewBook({ title: '', author: 'AMTDA Éditions', description: '', coverColor: '#92C83E', coverImage: '', pagesText: '' });
  };

  const handleDeleteBook = (id: string) => {
    playChime('click');
    setBooks(books.filter(b => b.id !== id));
  };

  // Actions for Songs (Chants)
  const handleAddSong = () => {
    if (!newSong.title) {
      alert("Veuillez entrer un titre pour le chant scolaire / الرجاء إدخال عنوان النشيد.");
      return;
    }
    playChime('success');
    const defaultUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    const newItem: Song = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist || 'AMTDA Kids',
      url: newSong.url || defaultUrl,
      lyrics: newSong.lyrics || "Chant scolaire joyeux pour stimuler l'apprentissage."
    };
    setSongs([newItem, ...songs]);
    setNewSong({ title: '', artist: 'AMTDA Kids', url: '', lyrics: '' });
  };

  const handleDeleteSong = (id: string) => {
    playChime('click');
    setSongs(songs.filter(s => s.id !== id));
  };

  // Actions for Culture Maroc
  const handleAddCultureItem = () => {
    if (!newCultureItem.title) {
      alert("Veuillez entrer un titre pour le contenu culturel.");
      return;
    }
    if (newCultureItem.image && !isLocalImage(newCultureItem.image)) {
      alert("Erreur : L'image doit être locale (ex: /image/001.jpg ou base64) pour éviter les liens brisés.");
      return;
    }
    playChime('success');
    const item: CultureItem = {
      id: 'cult_' + Date.now(),
      type: newCultureItem.type,
      title: newCultureItem.title,
      description: newCultureItem.description || "Contenu éducatif inclusif.",
      image: newCultureItem.image || './image/chameau.jpg',
      actionPayload: newCultureItem.actionPayload || "Aucun contenu d'action défini.",
      videoUrl: newCultureItem.videoUrl || ''
    };
    setCultureItems([...cultureItems, item]);
    setNewCultureItem({
      type: 'video',
      title: '',
      description: '',
      image: '',
      actionPayload: '',
      videoUrl: ''
    });
  };

  const handleDeleteCultureItem = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet élément de la culture marocaine ?")) {
      playChime('click');
      setCultureItems(cultureItems.filter(item => item.id !== id));
    }
  };

  const handleEditCultureItem = (item: CultureItem) => {
    playChime('click');
    setEditingCultureId(item.id);
    setEditingCultureItem({ ...item });
  };

  const handleCancelEditCultureItem = () => {
    playChime('click');
    setEditingCultureId(null);
    setEditingCultureItem(null);
  };

  const handleSaveCultureItem = () => {
    if (!editingCultureItem || !editingCultureItem.title) {
      alert("Veuillez renseigner un titre valide !");
      return;
    }
    if (editingCultureItem.image && !isLocalImage(editingCultureItem.image)) {
      alert("Erreur : L'image doit être locale (ex: /image/001.jpg ou base64) pour éviter les liens brisés.");
      return;
    }
    playChime('success');
    setCultureItems(cultureItems.map(item => item.id === editingCultureItem.id ? editingCultureItem : item));
    setEditingCultureId(null);
    setEditingCultureItem(null);
  };

  // Actions for Articles (Actualités)
  const handleAddArticle = () => {
    if (!newArticle.titleFr && !newArticle.titleAr) {
      alert("Veuillez saisir au moins un titre (Français ou Arabe).");
      return;
    }
    if (newArticle.image && !isLocalImage(newArticle.image)) {
      alert("Erreur : L'image de l'article doit être locale ou téléversée dans le dossier de stockage.");
      return;
    }
    playChime('success');
    
    // Automatically fill missing translations nicely
    const titleFr = newArticle.titleFr || newArticle.titleAr;
    const titleAr = newArticle.titleAr || newArticle.titleFr;
    const excerptFr = newArticle.excerptFr || newArticle.excerptAr || "Actualités de l'inclusion scolaire de l'AMTDA.";
    const excerptAr = newArticle.excerptAr || newArticle.excerptFr || "أخبار أنشطة الإدماج المدرسي للجمعية المغربية.";
    const contentFr = newArticle.contentFr || newArticle.contentAr || excerptFr;
    const contentAr = newArticle.contentAr || newArticle.contentFr || excerptAr;

    const newItem: Article = {
      id: Date.now().toString(),
      title: { fr: titleFr, en: titleFr, zh: titleFr },
      excerpt: { fr: excerptFr, en: excerptFr, zh: excerptFr },
      content: { fr: contentFr, en: contentFr, zh: contentFr },
      image: newArticle.image || './image/partener.jpg',
      date: new Date().toLocaleDateString('fr-FR'),
      category: 'Activités'
    };
    setArticles([newItem, ...articles]);
    setNewArticle({ 
      titleFr: '', 
      titleAr: '', 
      excerptFr: '', 
      excerptAr: '', 
      contentFr: '', 
      contentAr: '', 
      image: '' 
    });
  };

  const handleDeleteArticle = (id: string) => {
    playChime('click');
    setArticles(articles.filter(a => a.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-900 text-white rounded-3xl p-8 max-w-md mx-auto border border-slate-800 shadow-2xl text-center">
        <Lock className="w-12 h-12 text-[#92C83E] mx-auto mb-4 animate-bounce" />
        <h3 className="text-xl font-bold font-sans">Espace Administration AMTDA</h3>
        <p className="text-xs text-slate-400 mt-2">Saisissez le mot de passe administrateur pour configurer la plateforme</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Mot de passe admin"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-center text-lg focus:outline-hidden focus:border-[#92C83E] font-mono tracking-widest text-white placeholder:text-slate-500"
          />
          {errorMsg && <p className="text-xs text-rose-400 font-bold">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-[#0B722C] hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:scale-101 active:scale-99 cursor-pointer text-xs uppercase tracking-wider"
          >
            Valider et Entrer ➔
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-850 p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Unlock className="w-7 h-7 text-[#92C83E] animate-pulse" />
          <div>
            <h3 className="text-xl font-bold font-sans text-slate-100">Cockpit d'Administration AMTDA</h3>
            <p className="text-xs text-slate-400">Gérez vos articles, documents et fichiers multimédias de manière unifiée</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-102 cursor-pointer border border-rose-500/20 uppercase tracking-wider"
        >
          Sortir de la Session
        </button>
      </div>

      {/* Admin sub-navigation tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('stats')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'stats' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <BarChart3 className="w-4 h-4" /> Stats
        </button>
        <button
          onClick={() => setActiveSubTab('gallery')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'gallery' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <ImageIcon className="w-4 h-4" /> Galerie
        </button>
        <button
          onClick={() => setActiveSubTab('testimonials')}
          className={`flex-1 min-w-[110px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'testimonials' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <CheckSquare className="w-4 h-4" /> Témoignages
        </button>
        <button
          onClick={() => setActiveSubTab('articles')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'articles' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <FileText className="w-4 h-4" /> Articles
        </button>
        <button
          onClick={() => setActiveSubTab('pdfs')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'pdfs' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <FileText className="w-4 h-4" /> PDFs
        </button>
        <button
          onClick={() => setActiveSubTab('books')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'books' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <BookMarked className="w-4 h-4" /> Romans
        </button>
        <button
          onClick={() => setActiveSubTab('songs')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'songs' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Music className="w-4 h-4" /> Chants
        </button>
        <button
          onClick={() => setActiveSubTab('culture')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'culture' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Film className="w-4 h-4" /> Culture Maroc
        </button>
        <button
          onClick={() => setActiveSubTab('logo')}
          className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeSubTab === 'logo' ? 'bg-[#0B722C] text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Settings className="w-4 h-4" /> Logo & Accueil 🎨
        </button>
      </div>

      {/* TAB SUB-CONTENTS WITH SCROLL INSIDE */}
      <div className="max-h-[500px] overflow-y-auto pr-1 space-y-4 custom-scrollbar">

        {/* 1. STATISTICS */}
        {activeSubTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-sm font-bold text-slate-300">Indicateurs d'Impact & Téléchargements</h4>
              <button onClick={onResetStats} className="text-xs text-rose-400 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Réinitialiser
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="block text-xs text-slate-400">Vues de pages</span>
                <span className="text-3xl font-mono font-medium text-sky-400">{stats.pageViews}</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="block text-xs text-slate-400">Rapports Imprimés</span>
                <span className="text-3xl font-mono font-medium text-emerald-400">{stats.prints}</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="block text-xs text-slate-400">Clics Téléphones</span>
                <span className="text-3xl font-mono font-medium text-orange-400">{stats.phoneClicks}</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="block text-xs text-slate-400">Clics WhatsApp</span>
                <span className="text-3xl font-mono font-medium text-teal-400">{stats.whatsappClicks}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. GALLERY MANAGER */}
        {activeSubTab === 'gallery' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Add form */}
              <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                <h4 className="text-sm font-bold text-[#92C83E]">
                  {editingGalleryId ? "Modifier la photo de la galerie" : "Ajouter une nouvelle photo à la galerie"}
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Titre de la photo"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                  />
                  <div className="space-y-2">
                    {newGallery.url ? (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                        <div className="flex items-center gap-2.5">
                          <img src={newGallery.url} className="w-10 h-10 object-cover rounded-lg border border-emerald-500/30" referrerPolicy="no-referrer" />
                          <div className="text-[11px] text-emerald-100">
                            <span className="block font-medium text-emerald-400">✓ Image associée</span>
                            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px] block">{newGallery.url}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewGallery(prev => ({ ...prev, url: '' }))}
                          className="text-slate-400 hover:text-rose-400 text-xs px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          Détacher
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-slate-800 hover:border-emerald-600/50 bg-slate-950/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                        <div className="p-2 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">Téléverser une photo</span>
                        <span className="text-[10px] text-slate-500">Formats acceptés : JPG, PNG, WEBP</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, 'image')} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Brève description"
                    value={newGallery.description}
                    onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                  />
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                  >
                    <option value="events">Événements</option>
                    <option value="screenings">Dépistages Écoles</option>
                    <option value="classrooms">Salles Inclusives</option>
                    <option value="drawings">Ateliers</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddGallery}
                      className="flex-1 bg-[#0B722C] hover:bg-emerald-600 font-bold rounded-xl text-xs py-2.5 text-white flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      {editingGalleryId ? "Enregistrer les modifications" : "Ajouter à la galerie"}
                    </button>
                    {editingGalleryId && (
                      <button
                        onClick={handleCancelEditGallery}
                        className="px-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl text-xs text-slate-300 cursor-pointer"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Physical Storage files manager */}
              <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Espace Stockage /image
                </h4>
                <div className="max-h-[220px] overflow-y-auto space-y-1.5 custom-scrollbar">
                  {physicalImages.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic">Aucun fichier importé pour le moment.</p>
                  ) : (
                    physicalImages.map(img => (
                      <div key={img.name} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            setNewGallery(prev => ({ ...prev, url: img.url }));
                            playChime('hover');
                          }}
                          title="Cliquez pour utiliser cette image dans le formulaire"
                        >
                          <img src={img.url} className="w-8 h-8 object-cover rounded-md shrink-0 bg-slate-800" referrerPolicy="no-referrer" />
                          <div className="text-[10px] max-w-[120px] truncate">
                            <span className="block font-semibold text-slate-200 truncate">{img.name}</span>
                            <span className="text-slate-400 text-[9px]">{img.size}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeletePhysicalFile('image', img.name)}
                          className="p-1 hover:bg-rose-950 text-slate-500 hover:text-rose-400 rounded-md transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Photos actuellement affichées sur le site</h4>
              {galleryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                  <div className="flex items-center gap-3">
                    <img src={item.url} className="w-10 h-10 object-cover rounded-md bg-slate-850" referrerPolicy="no-referrer" />
                    <div>
                      <span className="block text-xs font-bold line-clamp-1">{item.title}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleStartEditGallery(item)} 
                      title="Modifier cette photo"
                      className="p-1.5 hover:bg-amber-950 hover:text-amber-400 rounded-lg text-slate-400 transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteGallery(item.id)} 
                      title="Supprimer cette photo"
                      className="p-1.5 hover:bg-rose-950 hover:text-rose-400 rounded-lg text-slate-400 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TESTIMONIALS MANAGER */}
        {activeSubTab === 'testimonials' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-400">Approbation des retours d'expérience</h4>
            {testimonials.map((t) => {
              const isEditing = t.id === editingTestimonialId && editingTestimonial;
              return (
                <div key={t.id} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-850 flex flex-col gap-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Nom Complet</label>
                          <input
                            type="text"
                            value={editingTestimonial.name}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Rôle / Relation</label>
                          <input
                            type="text"
                            value={editingTestimonial.role}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Témoignage (Texte)</label>
                        <textarea
                          rows={3}
                          value={editingTestimonial.text}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden resize-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancelEditTestimonial}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleSaveTestimonialEdit}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex gap-3">
                        <img src={t.avatar} className="w-10 h-10 object-cover rounded-full bg-slate-800 shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <h5 className="text-xs font-bold">{t.name} <span className="text-slate-500 font-normal">({t.role})</span></h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{t.text}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto shrink-0">
                        {!t.isApproved && (
                          <button
                            onClick={() => handleApproveTestimony(t.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer"
                          >
                            Approuver
                          </button>
                        )}
                        <button
                          onClick={() => handleStartEditTestimonial(t)}
                          title="Modifier"
                          className="p-1.5 bg-amber-950 text-amber-400 rounded-lg hover:brightness-110 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimony(t.id)}
                          title="Supprimer"
                          className="p-1.5 bg-rose-950 text-rose-400 rounded-lg hover:brightness-110 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 4. ARTICLES MANAGER */}
        {activeSubTab === 'articles' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form container */}
              <div className="lg:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-[#92C83E]">Rédiger un nouvel article / activité de l'AMTDA</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Titre de l'article (Français)"
                      value={newArticle.titleFr}
                      onChange={(e) => setNewArticle({ ...newArticle, titleFr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                    />
                    <input
                      type="text"
                      placeholder="العنوان (العربية)"
                      value={newArticle.titleAr}
                      onChange={(e) => setNewArticle({ ...newArticle, titleAr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white text-right"
                      dir="rtl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <textarea
                      placeholder="Résumé / Introduction (Français)"
                      value={newArticle.excerptFr}
                      onChange={(e) => setNewArticle({ ...newArticle, excerptFr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white h-16 resize-none"
                    />
                    <textarea
                      placeholder="المخلص أو التمهيد (العربية)"
                      value={newArticle.excerptAr}
                      onChange={(e) => setNewArticle({ ...newArticle, excerptAr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white h-16 text-right resize-none"
                      dir="rtl"
                    />
                  </div>

                  {/* FULL ARTICLE TEXT CONTENT (SOLVES CORRECTION OF NEW CONTENT BUG) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <textarea
                      placeholder="Texte complet de l'article (Français)"
                      value={newArticle.contentFr}
                      onChange={(e) => setNewArticle({ ...newArticle, contentFr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white h-24 resize-none"
                    />
                    <textarea
                      placeholder="نص المقال الكامل (العربية)"
                      value={newArticle.contentAr}
                      onChange={(e) => setNewArticle({ ...newArticle, contentAr: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white h-24 text-right resize-none"
                      dir="rtl"
                    />
                  </div>

                  {/* Image link & Upload shortcut */}
                  <div className="space-y-2">
                    {newArticle.image ? (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                        <div className="flex items-center gap-2.5">
                          <img src={newArticle.image} className="w-10 h-10 object-cover rounded-lg border border-emerald-500/30" referrerPolicy="no-referrer" />
                          <div className="text-[11px] text-emerald-100">
                            <span className="block font-medium text-emerald-400">✓ Image associée</span>
                            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] block">{newArticle.image}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewArticle(prev => ({ ...prev, image: '' }))}
                          className="text-slate-400 hover:text-rose-400 text-xs px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          Changer
                        </button>
                      </div>
                    ) : (
                      <label className="border border-dashed border-slate-800 hover:border-emerald-600/50 bg-slate-950/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                        <div className="p-1.5 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">Importer une image d'illustration</span>
                        <span className="text-[10px] text-slate-500">Ou cliquez sur une image existante du stockage à droite</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, 'image')} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>

                  <button
                    onClick={handleAddArticle}
                    className="w-full bg-[#0B722C] hover:bg-emerald-600 font-bold py-2.5 rounded-xl text-xs transition-all text-white cursor-pointer"
                  >
                    🚀 Publier l'Actualité sur le site
                  </button>
                </div>
              </div>

              {/* Quick Image Picker from Storage */}
              <div className="lg:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold uppercase text-[#92C83E]">Utiliser une image de stockage :</h5>
                <p className="text-[10px] text-slate-500 leading-tight">Cliquez sur une image importée pour la lier instantanément à l'article.</p>
                <div className="max-h-[300px] overflow-y-auto space-y-1.5 custom-scrollbar pr-1 pt-1">
                  {physicalImages.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic">Aucune image stockée.</p>
                  ) : (
                    physicalImages.map(img => (
                      <div 
                        key={img.name} 
                        onClick={() => {
                          setNewArticle(prev => ({ ...prev, image: img.url }));
                          playChime('hover');
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <img src={img.url} className="w-9 h-9 object-cover rounded-md shrink-0 bg-slate-800" referrerPolicy="no-referrer" />
                        <span className="text-[10px] font-semibold text-slate-300 truncate max-w-[120px]">{img.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Articles en ligne</h4>
              {articles.map((art) => (
                <div key={art.id} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                  <div className="flex items-center gap-3">
                    <img src={art.image} className="w-10 h-10 object-cover rounded-md bg-slate-800" referrerPolicy="no-referrer" />
                    <div>
                      <span className="block text-xs font-bold line-clamp-1">{art.title.fr}</span>
                      <span className="text-[9px] text-slate-400">{art.date}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteArticle(art.id)} className="p-1.5 hover:bg-rose-950 hover:text-rose-400 rounded-lg text-slate-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PDFS / DOCUMENTS MANAGER */}
        {activeSubTab === 'pdfs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form block */}
              <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-[#92C83E]">Publier un nouveau PDF d'apprentissage</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom d'affichage du document"
                    value={newPdf.name}
                    onChange={(e) => setNewPdf({ ...newPdf, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                  />
                  <div className="space-y-2">
                    {newPdf.url ? (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 bg-emerald-900/40 rounded-lg text-[#92C83E] shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="text-[11px] text-emerald-100 min-w-0">
                            <span className="block font-medium text-emerald-400 truncate">✓ Document prêt : {newPdf.name || "Fichier PDF"}</span>
                            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] block">{newPdf.url}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewPdf(prev => ({ ...prev, url: '' }))}
                          className="text-slate-400 hover:text-rose-400 text-xs px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                        >
                          Changer
                        </button>
                      </div>
                    ) : (
                      <label className="border border-dashed border-slate-800 hover:border-emerald-600/50 bg-slate-950/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                        <div className="p-1.5 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">Importer un fichier PDF</span>
                        <span className="text-[10px] text-slate-500">Ou cliquez sur un PDF existant du stockage à droite</span>
                        <input 
                          type="file" 
                          accept="application/pdf" 
                          onChange={(e) => handleFileUpload(e, 'pdf')} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newPdf.category}
                      onChange={(e) => setNewPdf({ ...newPdf, category: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                    >
                      <option value="formation">Support de Formation</option>
                      <option value="inscription">Dossier d'Inscription</option>
                      <option value="exercices">Fiches d'Exercices</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Taille (Ex: 1.2 MB)"
                      value={newPdf.size}
                      onChange={(e) => setNewPdf({ ...newPdf, size: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                    />
                  </div>
                  <button
                    onClick={handleAddPdf}
                    className="w-full bg-[#0B722C] hover:bg-emerald-600 font-bold rounded-xl text-xs py-2.5 text-white flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Publier le PDF
                  </button>
                </div>
              </div>

              {/* Physical Storage files manager */}
              <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Espace Stockage /pdf
                </h4>
                <div className="max-h-[220px] overflow-y-auto space-y-1.5 custom-scrollbar">
                  {physicalPdfs.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic">Aucun PDF stocké à la racine.</p>
                  ) : (
                    physicalPdfs.map(f => (
                      <div key={f.name} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div 
                          className="flex-1 cursor-pointer min-w-0"
                          onClick={() => {
                            setNewPdf({
                              name: f.name.split('.')[0].replace(/[-_]/g, ' '),
                              url: f.url,
                              category: 'formation',
                              size: f.size
                            });
                            playChime('hover');
                          }}
                          title="Sélectionner pour remplir le formulaire"
                        >
                          <span className="block text-[10px] font-semibold text-slate-200 truncate pr-1">{f.name}</span>
                          <span className="text-slate-400 text-[9px] block">{f.size}</span>
                        </div>
                        <button 
                          onClick={() => handleDeletePhysicalFile('pdf', f.name)}
                          className="p-1 hover:bg-rose-950 text-slate-500 hover:text-rose-400 rounded-md transition-all shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Fichiers actuellement en ligne sur le site</h4>
              {pdfFiles.map((file) => (
                <div key={file.id} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                  <div>
                    <span className="block text-xs font-bold">{file.name}</span>
                    <span className="text-[9px] text-sky-400 uppercase font-black">{file.category}</span>
                  </div>
                  <button onClick={() => handleDeletePdf(file.id)} className="p-1.5 hover:bg-rose-950 hover:text-rose-400 rounded-lg text-slate-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BOOKS / ROMANS MANAGER */}
        {activeSubTab === 'books' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-[#92C83E]">
                {editingBookId ? "Modifier le Roman Numérique existant" : "Créer un nouveau Roman Numérique pour enfants"}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rédigez l'histoire en toute simplicité. Séparez chaque page du conte par une barre verticale <strong className="text-[#92C83E]">"|"</strong>.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Titre de l'histoire (ex: Hiba et son chat magique)"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white sm:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Auteur (ex: AMTDA Éditions)"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                />
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                  <span className="text-xs text-slate-400 font-semibold">Couverture :</span>
                  <input
                    type="color"
                    value={newBook.coverColor}
                    onChange={(e) => setNewBook({ ...newBook, coverColor: e.target.value })}
                    className="w-8 h-6 rounded-md cursor-pointer border-0"
                  />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{newBook.coverColor}</span>
                </div>
                
                {/* Local Storage Photo Selector/Uploader for book cover */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase">Image de Couverture (Optionnelle - Locale uniquement)</label>
                  {newBook.coverImage ? (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center gap-2.5">
                        <img src={newBook.coverImage} className="w-10 h-10 object-cover rounded-lg border border-emerald-500/30" referrerPolicy="no-referrer" />
                        <div className="text-[11px] text-emerald-100">
                          <span className="block font-medium text-emerald-400">✓ Image de couverture associée</span>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] block">{newBook.coverImage}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewBook(prev => ({ ...prev, coverImage: '' }))}
                        className="text-slate-400 hover:text-rose-400 text-xs px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="border border-dashed border-slate-800 hover:border-emerald-600/50 bg-slate-950/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                        <div className="p-1.5 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">Importer une couverture</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, 'image')} 
                          className="hidden" 
                        />
                      </label>
                      
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Ou choisir du Stockage :</span>
                        <div className="max-h-[70px] overflow-y-auto space-y-1 custom-scrollbar">
                          {physicalImages.length === 0 ? (
                            <span className="text-[9px] text-slate-500 italic block">Aucune image stockée</span>
                          ) : (
                            physicalImages.map(img => (
                              <button
                                key={img.name}
                                type="button"
                                onClick={() => setNewBook(prev => ({ ...prev, coverImage: img.url }))}
                                className="w-full text-left p-1 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded text-[9px] truncate text-slate-300 block"
                              >
                                ➔ {img.name}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  placeholder="Description ou résumé de l'histoire..."
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white col-span-1 sm:col-span-2 h-16"
                />
                <textarea
                  placeholder="Écrivez le texte. Séparez les pages par le signe '|' (Ex: Il était une fois un petit garçon... | Un jour, il découvrit un ballon... | Fin.)"
                  value={newBook.pagesText}
                  onChange={(e) => setNewBook({ ...newBook, pagesText: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white col-span-1 sm:col-span-2 h-32 font-sans"
                />
                
                <div className="flex gap-2 sm:col-span-2">
                  <button
                    onClick={handleAddBook}
                    className="flex-1 bg-[#0B722C] hover:bg-emerald-600 font-bold rounded-xl text-xs py-2.5 text-white flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    {editingBookId ? "Enregistrer les modifications" : "Publier le Roman Numérique"}
                  </button>
                  {editingBookId && (
                    <button
                      onClick={handleCancelEditBook}
                      className="px-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl text-xs text-slate-300 cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Romans en bibliothèque</h4>
              {books.map((book) => (
                <div key={book.id} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-10 rounded-md shrink-0 shadow-xs border border-white/10 bg-cover bg-center" 
                      style={{ 
                        backgroundColor: book.coverColor || '#92C83E',
                        backgroundImage: (book.coverImage || book.coverUrl) ? `url(${book.coverImage || book.coverUrl})` : undefined
                      }}
                    />
                    <div>
                      <span className="block text-xs font-bold line-clamp-1">{book.title}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{book.author} — {book.pages?.length || 1} pages</span>
                    </div>
                  </div>
                  <div className="flex gap-1 text-slate-400">
                    <button 
                      onClick={() => handleStartEditBook(book)} 
                      title="Modifier ce roman"
                      className="p-1.5 hover:bg-amber-950 hover:text-amber-400 rounded-lg transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteBook(book.id)} 
                      title="Supprimer ce roman"
                      className="p-1.5 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. LOGO & HOMEPAGE UPDATER */}
        {activeSubTab === 'logo' && (
          <div className="space-y-6 animate-fade-in">
            {/* Logo Customizer */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-slate-300">Changer l'image du Logo de l'AMTDA</h4>
              <p className="text-xs text-slate-500">Pour modifier le logo officiel de l'association, importez directement un nouveau fichier image (PNG ou JPG) avec un fond transparent de préférence.</p>

              <div className="space-y-4">
                {/* Logo Preview Container */}
                <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-inner shrink-0">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo AMTDA" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      // Fallback to stylized representation
                      <div className="text-center font-sans">
                        <span className="block text-emerald-600 font-bold text-xs leading-none">AMTDA</span>
                        <span className="text-[7px] text-slate-400 font-bold block mt-1">MASCOT</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-200">Aperçu du Logo actif</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {logoUrl ? "Logo personnalisé téléversé" : "Logo vectoriel d'origine actif"}
                    </span>
                  </div>
                </div>

                {/* Upload Label Button */}
                <label className="border border-dashed border-slate-800 hover:border-[#92C83E]/50 bg-slate-950/40 p-4 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                  <div className="p-1.5 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">Téléverser le nouveau Logo</span>
                  <span className="text-[10px] text-slate-500">Formats acceptés : PNG, JPG, WEBP, SVG</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e, 'logo')} 
                    className="hidden" 
                  />
                </label>

                {logoUrl && (
                  <div className="text-right pt-1">
                    <button
                      onClick={() => {
                        playChime('click');
                        setLogoUrl(''); // reset
                      }}
                      className="text-[10px] text-rose-400 hover:underline cursor-pointer bg-transparent border-0 font-medium"
                    >
                      Rétablir le Logo Vectoriel Original
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Homepage Image Controller */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-left">
              <h4 className="text-sm font-bold text-slate-300">Image Principale de la Page d'Accueil</h4>
              <p className="text-xs text-slate-500">Modifiez l'image mise en valeur sur l'écran d'accueil de la plate-forme de l'association (Première Page).</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Visual Preview */}
                <div className="space-y-2">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase">Image active :</span>
                  <div className="aspect-[4/3] w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-lg">
                    <img 
                      src={homePageImage} 
                      alt="Aperçu Accueil" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-slate-300 truncate max-w-[90%]">
                      {homePageImage}
                    </div>
                  </div>
                </div>

                {/* Form Controls */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Téléverser ou modifier le lien :</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={homePageImage} 
                        onChange={(e) => setHomePageImage?.(e.target.value)} 
                        placeholder="./image/accu.jpg"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-hidden"
                      />
                      <label className="px-3 py-2 bg-[#92C83E]/10 hover:bg-[#92C83E]/20 text-[#92C83E] rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                        <Upload className="w-4 h-4" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, 'homepage_image')} 
                          className="hidden" 
                        />
                        {uploading ? "..." : "Téléverser"}
                      </label>
                    </div>
                  </div>

                  {/* Picker from Physical list */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 block mb-2 uppercase">Choisir une image de stockage :</span>
                    <div className="flex gap-2 overflow-x-auto pb-1 max-w-full custom-scrollbar">
                      {physicalImages.length === 0 ? (
                        <p className="text-[9px] text-slate-500 italic">Aucune image stockée dans `/image`.</p>
                      ) : (
                        physicalImages.map(img => (
                          <button
                            key={img.name}
                            type="button"
                            onClick={() => {
                              setHomePageImage?.(img.url);
                              playChime('hover');
                            }}
                            className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${homePageImage === img.url ? 'border-[#92C83E] scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
                            title={img.name}
                          >
                            <img src={img.url} className="w-full h-full object-cover" alt="" />
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {homePageImage !== './image/accu.jpg' && (
                    <button
                      type="button"
                      onClick={() => {
                        playChime('click');
                        setHomePageImage?.('./image/accu.jpg');
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-800"
                    >
                      Rétablir l'image d'origine par défaut
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. SONGS (CHANTS SCOLAIRES) */}
        {activeSubTab === 'songs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Block */}
              <div className="lg:col-span-7 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 text-left">
                <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#0B722C]" />
                  Ajouter un Chant Scolaire / أناشيد مدرسية للأطفال
                </h4>
                <p className="text-xs text-slate-400">
                  Alimentez la bibliothèque de musique inclusive pour enfants. Renseignez le titre, l'interprète, téléversez un vrai fichier audio ou liez-en un existant.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Titre du chant *</label>
                    <input
                      type="text"
                      value={newSong.title}
                      onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                      placeholder="Ex: Alif Ba Ta - Alphabet"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#92C83E] text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Interprète ou Catégorie</label>
                    <input
                      type="text"
                      value={newSong.artist}
                      onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                      placeholder="Ex: Chœur des enfants AMTDA"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#92C83E] text-white"
                    />
                  </div>
                </div>

                {/* Upload Section / URL */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase block">Fichier Audio associé</label>
                  {newSong.url ? (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 bg-emerald-900/40 rounded-lg text-[#92C83E] shrink-0">
                          <Music className="w-5 h-5 animate-bounce" />
                        </div>
                        <div className="text-[11px] text-emerald-100 min-w-0">
                          <span className="block font-medium text-emerald-400 truncate">✓ Audio lié : {newSong.url.split('/').pop()}</span>
                          <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] block">{newSong.url}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewSong(prev => ({ ...prev, url: '' }))}
                        className="text-slate-400 hover:text-rose-400 text-xs px-2 py-1 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                      >
                        Changer
                      </button>
                    </div>
                  ) : (
                    <label className="border border-dashed border-slate-800 hover:border-emerald-600/50 bg-slate-950/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-emerald-950/10 group">
                      <div className="p-1.5 bg-[#92C83E]/10 rounded-full text-[#92C83E] group-hover:scale-105 transition-transform">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium">Téléverser un fichier Audio (MP3/WAV)</span>
                      <span className="text-[10px] text-slate-500">Ou cliquez sur un audio existant à droite pour le lier</span>
                      <input 
                        type="file" 
                        accept="audio/*" 
                        onChange={(e) => handleFileUpload(e, 'audio')} 
                        className="hidden" 
                      />
                    </label>
                  )}
                  <input
                    type="text"
                    value={newSong.url}
                    onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
                    placeholder="URL ou chemin du fichier audio (Ex: /audio/mon_chant.mp3)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs focus:outline-hidden text-slate-300 font-mono mt-1"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Paroles de la chanson (Karaoké)</label>
                  <textarea
                    value={newSong.lyrics}
                    onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                    placeholder="Écrivez les paroles ici. Elles défileront de façon dynamique pour aider les enfants !"
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#92C83E] text-white"
                  />
                </div>

                <button
                  onClick={handleAddSong}
                  className="w-full md:w-auto px-6 py-2.5 bg-[#0B722C] hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" /> Ajouter ce Chant
                </button>
              </div>

              {/* Storage Section for Audio Files */}
              <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
                <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-[#0B722C]" />
                  Espace Stockage /audio
                </h4>
                <p className="text-[10px] text-slate-500">
                  Cliquez sur un fichier audio pour l'associer instantanément au chant ci-contre.
                </p>
                <div className="max-h-[340px] overflow-y-auto space-y-1.5 custom-scrollbar">
                  {physicalAudios.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic">Aucun fichier audio stocké à la racine.</p>
                  ) : (
                    physicalAudios.map(f => (
                      <div key={f.name} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div 
                          className="flex-1 cursor-pointer min-w-0"
                          onClick={() => {
                            setNewSong(prev => ({ ...prev, url: f.url }));
                            playChime('hover');
                          }}
                          title="Associer cet audio"
                        >
                          <span className="block text-[10px] font-semibold text-slate-200 truncate pr-1">{f.name}</span>
                          <span className="text-slate-400 text-[9px] block">{f.size}</span>
                        </div>
                        <button 
                          onClick={() => handleDeletePhysicalFile('audio', f.name)}
                          className="p-1 hover:bg-rose-950 text-slate-500 hover:text-rose-400 rounded-md transition-all shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3 text-left">
              <h4 className="text-xs font-bold text-slate-300">Bibliothèque active ({songs.length} Chants scolaires)</h4>
              
              <div className="divide-y divide-slate-800">
                {songs.map((song) => (
                  <div key={song.id} className="py-3 flex justify-between items-center gap-4 first:pt-0 last:pb-0 text-left">
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">{song.title}</h5>
                      <p className="text-[10px] text-slate-400">{song.artist}</p>
                      <p className="text-[9px] text-[#92C83E] mt-0.5 line-clamp-1">{song.lyrics}</p>
                      {song.url && (
                        <span className="inline-block text-[8px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded font-mono mt-1">
                          🔊 {song.url}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteSong(song.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer"
                      title="Supprimer ce chant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. MOROCCAN CULTURE MANAGEMENT */}
        {activeSubTab === 'culture' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Block (Add / Edit) */}
              <div className="lg:col-span-7 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 text-left">
                {editingCultureId ? (
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-amber-500" />
                    Modifier l'Élément Culturel
                  </h4>
                ) : (
                  <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#0B722C]" />
                    Ajouter un Élément Culturel Marocain
                  </h4>
                )}
                <p className="text-xs text-slate-400">
                  Gérez de manière autonome les dessins animés, magazines interactifs et contes audio du "Moroccan Culture Corner".
                </p>

                {editingCultureId && editingCultureItem ? (
                  // EDIT MODE FORM
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Titre de l'élément *</label>
                        <input
                          type="text"
                          value={editingCultureItem.title}
                          onChange={(e) => setEditingCultureItem({ ...editingCultureItem, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Type de Contenu *</label>
                        <select
                          value={editingCultureItem.type}
                          onChange={(e) => setEditingCultureItem({ ...editingCultureItem, type: e.target.value as any })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                        >
                          <option value="video">Dessin Animé (Vidéo) 🎥</option>
                          <option value="magazine">Magazine Éducatif 📖</option>
                          <option value="tale">Légende & Conte 🗣️</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Description / Résumé *</label>
                      <textarea
                        value={editingCultureItem.description}
                        onChange={(e) => setEditingCultureItem({ ...editingCultureItem, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Image Miniature *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingCultureItem.image}
                          onChange={(e) => setEditingCultureItem({ ...editingCultureItem, image: e.target.value })}
                          placeholder="./image/chameau.jpg"
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden text-white"
                        />
                        <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, 'image')} 
                            className="hidden" 
                          />
                          {uploading ? '...' : 'Upload'}
                        </label>
                      </div>
                      <span className="text-[9px] text-slate-500 block">Téléversez un fichier image miniature locale, ou cliquez sur une image stockée à droite.</span>
                    </div>

                    {/* Conditional Video Upload */}
                    {editingCultureItem.type === 'video' && (
                      <div className="space-y-1 animate-fade-in border border-slate-800/60 p-3 rounded-xl bg-slate-900/30">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Lien / Fichier Vidéo local (MP4, WebM) *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingCultureItem.videoUrl || ''}
                            onChange={(e) => setEditingCultureItem({ ...editingCultureItem, videoUrl: e.target.value })}
                            placeholder="Ex: /video/chameau.mp4"
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden text-white"
                          />
                          <label className="px-3 py-2 bg-emerald-950 hover:bg-[#0B722C] text-emerald-300 hover:text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <input 
                              type="file" 
                              accept="video/*" 
                              onChange={(e) => handleFileUpload(e, 'culture_video')} 
                              className="hidden" 
                            />
                            {uploading ? '...' : 'Upload Vidéo'}
                          </label>
                        </div>
                        {editingCultureItem.videoUrl && (
                          <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded border border-slate-800 mt-1">
                            <span className="text-[9px] font-mono text-slate-400 truncate">{editingCultureItem.videoUrl}</span>
                            <button 
                              type="button" 
                              onClick={() => setEditingCultureItem({ ...editingCultureItem, videoUrl: '' })} 
                              className="text-[9px] text-rose-400 hover:underline font-bold"
                            >
                              Retirer le lien vidéo
                            </button>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-500 block">Téléversez un fichier vidéo depuis vos fichiers locaux (il sera stocké dans la racine `/video/`).</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        {editingCultureItem.type === 'video' && "Message alternatif ou Action au clic (Payload) *"}
                        {editingCultureItem.type === 'magazine' && "Message alternatif ou Action au clic (Payload) *"}
                        {editingCultureItem.type === 'tale' && "Texte du Conte à Narrer (Lecture vocale) *"}
                      </label>
                      <textarea
                        value={editingCultureItem.actionPayload}
                        onChange={(e) => setEditingCultureItem({ ...editingCultureItem, actionPayload: e.target.value })}
                        rows={3}
                        placeholder={editingCultureItem.type === 'tale' ? "Saisissez l'histoire à lire vocalement en français..." : "Saisissez le texte d'alerte ou l'action..."}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveCultureItem}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Enregistrer les Modifications
                      </button>
                      <button
                        onClick={handleCancelEditCultureItem}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  // ADD MODE FORM
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Titre de l'élément *</label>
                        <input
                          type="text"
                          value={newCultureItem.title}
                          onChange={(e) => setNewCultureItem({ ...newCultureItem, title: e.target.value })}
                          placeholder="Ex: Le petit chameau de Ouarzazate 🐪"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Type de Contenu *</label>
                        <select
                          value={newCultureItem.type}
                          onChange={(e) => setNewCultureItem({ ...newCultureItem, type: e.target.value as any })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                        >
                          <option value="video">Dessin Animé (Vidéo) 🎥</option>
                          <option value="magazine">Magazine Éducatif 📖</option>
                          <option value="tale">Légende & Conte 🗣️</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Description / Résumé *</label>
                      <textarea
                        value={newCultureItem.description}
                        onChange={(e) => setNewCultureItem({ ...newCultureItem, description: e.target.value })}
                        placeholder="Courte description de l'importance éducative de l'item..."
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Image Miniature *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCultureItem.image}
                          onChange={(e) => setNewCultureItem({ ...newCultureItem, image: e.target.value })}
                          placeholder="./image/singee.jpg"
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden text-white"
                        />
                        <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, 'image')} 
                            className="hidden" 
                          />
                          {uploading ? '...' : 'Upload'}
                        </label>
                      </div>
                      <span className="text-[9px] text-slate-500 block">Téléversez un fichier image ou cliquez sur une image stockée à droite pour remplir ce champ !</span>
                    </div>

                    {/* Conditional Video Upload */}
                    {newCultureItem.type === 'video' && (
                      <div className="space-y-1 animate-fade-in border border-slate-800/60 p-3 rounded-xl bg-slate-900/30">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Fichier Vidéo local (MP4, WebM) *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCultureItem.videoUrl || ''}
                            onChange={(e) => setNewCultureItem({ ...newCultureItem, videoUrl: e.target.value })}
                            placeholder="Ex: /video/chameau.mp4"
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden text-white"
                          />
                          <label className="px-3 py-2 bg-emerald-950 hover:bg-[#0B722C] text-emerald-300 hover:text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <input 
                              type="file" 
                              accept="video/*" 
                              onChange={(e) => handleFileUpload(e, 'culture_video')} 
                              className="hidden" 
                            />
                            {uploading ? '...' : 'Upload Vidéo'}
                          </label>
                        </div>
                        {newCultureItem.videoUrl && (
                          <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded border border-slate-800 mt-1">
                            <span className="text-[9px] font-mono text-slate-400 truncate">{newCultureItem.videoUrl}</span>
                            <button 
                              type="button" 
                              onClick={() => setNewCultureItem({ ...newCultureItem, videoUrl: '' })} 
                              className="text-[9px] text-rose-400 hover:underline font-bold"
                            >
                              Retirer le lien vidéo
                            </button>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-500 block">Téléversez un fichier vidéo depuis vos fichiers locaux (il sera stocké dans la racine `/video/`).</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">
                        {newCultureItem.type === 'video' && "Message alternatif ou Action au clic (Payload) *"}
                        {newCultureItem.type === 'magazine' && "Message alternatif ou Action au clic (Payload) *"}
                        {newCultureItem.type === 'tale' && "Texte du Conte à Narrer (Lecture vocale) *"}
                      </label>
                      <textarea
                        value={newCultureItem.actionPayload}
                        onChange={(e) => setNewCultureItem({ ...newCultureItem, actionPayload: e.target.value })}
                        rows={3}
                        placeholder={newCultureItem.type === 'tale' ? "Saisissez le conte traditionnel à lire à l'enfant..." : "Saisissez le message ou l'action au clic..."}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-hidden text-white"
                      />
                    </div>

                    <button
                      onClick={handleAddCultureItem}
                      className="w-full md:w-auto px-6 py-2.5 bg-[#0B722C] hover:bg-[#0B722C]/80 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" /> Ajouter ce Contenu
                    </button>
                  </div>
                )}
              </div>

              {/* Physical Storage Panel for Images & Videos */}
              <div className="lg:col-span-5 space-y-4">
                {/* Images Container */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
                  <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#0B722C]" />
                    Espace Stockage /image
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Cliquez sur une image pour l'affecter comme miniature.
                  </p>
                  <div className="max-h-[220px] overflow-y-auto space-y-1.5 custom-scrollbar">
                    {physicalImages.length === 0 ? (
                      <p className="text-[10px] text-slate-500 italic">Aucune image stockée dans `/image`.</p>
                    ) : (
                      physicalImages.map(f => (
                        <div key={f.name} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div 
                            className="flex-1 cursor-pointer min-w-0 flex items-center gap-2"
                            onClick={() => {
                              if (editingCultureId && editingCultureItem) {
                                setEditingCultureItem({ ...editingCultureItem, image: f.url });
                              } else {
                                setNewCultureItem({ ...newCultureItem, image: f.url });
                              }
                              playChime('hover');
                            }}
                            title="Sélectionner cette miniature"
                          >
                            <img src={f.url} className="w-8 h-8 rounded-md object-cover border border-slate-700" alt="" />
                            <div className="min-w-0">
                              <span className="block text-[10px] font-semibold text-slate-200 truncate pr-1">{f.name}</span>
                              <span className="text-slate-400 text-[9px] block">{f.size}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Videos Container */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
                  <h4 className="text-sm font-bold text-[#92C83E] flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-emerald-500" />
                    Espace Stockage /video
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Vidéos locales. Cliquez pour lier, ou supprimez définitivement.
                  </p>
                  <div className="max-h-[220px] overflow-y-auto space-y-1.5 custom-scrollbar">
                    {physicalVideos.length === 0 ? (
                      <p className="text-[10px] text-slate-500 italic">Aucune vidéo stockée dans `/video`.</p>
                    ) : (
                      physicalVideos.map(f => (
                        <div key={f.name} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <div 
                            className="flex-1 cursor-pointer min-w-0 flex items-center gap-2"
                            onClick={() => {
                              if (editingCultureId && editingCultureItem) {
                                setEditingCultureItem({ ...editingCultureItem, videoUrl: f.url });
                              } else {
                                setNewCultureItem({ ...newCultureItem, videoUrl: f.url });
                              }
                              playChime('hover');
                            }}
                            title="Lier cette vidéo"
                          >
                            <Film className="w-5 h-5 text-rose-500 shrink-0" />
                            <div className="min-w-0">
                              <span className="block text-[10px] font-semibold text-slate-200 truncate pr-1">{f.name}</span>
                              <span className="text-slate-400 text-[9px] block">{f.size}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeletePhysicalFile('video', f.name)}
                            className="p-1 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all"
                            title="Supprimer définitivement du disque"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* List block */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3 text-left">
              <h4 className="text-xs font-bold text-slate-300">Contenu Culturel Actif ({cultureItems.length} Éléments)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cultureItems.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                    <div className="space-y-2">
                      <div className="aspect-[16/10] rounded-lg overflow-hidden relative bg-slate-950">
                        <img src={item.image || './image/teen.jpg'} alt="" className="w-full h-full object-cover" />
                        <span className={`absolute top-1 left-1 text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase ${
                          item.type === 'video' ? 'bg-rose-600' : item.type === 'magazine' ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200 truncate">{item.title}</h5>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                      <button
                        onClick={() => handleEditCultureItem(item)}
                        className="p-1 text-amber-400 hover:bg-amber-950/40 rounded-lg transition-all cursor-pointer"
                        title="Modifier"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCultureItem(item.id)}
                        className="p-1 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {cultureItems.length === 0 && (
                  <p className="col-span-full text-center text-xs text-slate-500 py-4 italic">Aucun contenu culturel enregistré.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
