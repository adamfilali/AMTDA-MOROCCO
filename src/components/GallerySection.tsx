import { useState } from 'react';
import { GalleryItem } from '../types';
import { Grid, Eye, Image as ImageIcon, Calendar } from 'lucide-react';
import { playChime } from './AudioPlayer';

interface GallerySectionProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const [filter, setFilter] = useState<'all' | 'classrooms' | 'screenings' | 'events' | 'drawings'>('all');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  const openLightbox = (url: string) => {
    playChime('click');
    setLightboxImg(url);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
  };

  return (
    <div className="space-y-6" id="galerie-photos">
      {/* Filters bar */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['all', 'events', 'screenings', 'classrooms', 'drawings'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { playChime('click'); setFilter(cat); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              filter === cat
                ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-100'
                : 'bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Tout afficher 🖼️' :
             cat === 'events' ? 'Événements & Partenariats' :
             cat === 'screenings' ? 'Dépistages Écoles' :
             cat === 'classrooms' ? 'Salles Inclusives' :
             'Dessins & Ateliers'}
          </button>
        ))}
      </div>

      {/* Masonry / Grid representation */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100/80 max-w-sm mx-auto">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">Aucune photo dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.url)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover glass overlay */}
                <div className="absolute inset-0 bg-slate-900/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Bottom tag / info */}
              <div className="p-4 bg-white">
                <span className="text-[9px] font-black uppercase text-sky-600 tracking-wider">
                  {item.category}
                </span>
                <h4 className="font-bold text-slate-800 text-sm font-sans mt-0.5 line-clamp-1 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Fullscreen Modal */}
      {lightboxImg && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-slate-900/90 z-100 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="max-w-4xl max-h-full relative overflow-hidden rounded-2xl shadow-2xl bg-black">
            <img
              src={lightboxImg}
              alt="Souvenir Agrandissement"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
