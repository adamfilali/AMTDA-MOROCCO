/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RESOURCES } from '../data';
import { 
  BookOpen, FileText, Download, Play, Check, AlertCircle, HelpCircle, 
  Gamepad2, FolderOpen, MessageSquare, Shield, RefreshCw, Trophy, Heart 
} from 'lucide-react';
import GlassIcon from './GlassIcon';

interface ResourcesProps {
  setPage: (page: string) => void;
}

export default function Resources({ setPage }: ResourcesProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Newsletter Submit Validation
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    setNewsletterSuccess(false);

    if (!newsletterEmail) {
      setNewsletterError('Veuillez entrer une adresse e-mail.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Format d\'adresse e-mail invalide.');
      return;
    }

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  // Categories list from mockup with GlassIcons properties
  const CATEGORIES = [
    { label: 'Guides pratiques', desc: 'Parents & Enseignants', icon: BookOpen, color: 'emerald' as const },
    { label: 'Fiches pédagogiques', desc: 'Activités et exercices', icon: FileText, color: 'blue' as const },
    { label: 'Vidéos éducatives', desc: 'Conseils d\'experts', icon: Play, color: 'orange' as const },
    { label: 'Jeux sérieux', desc: 'Applications ludo-éducatives', icon: Gamepad2, color: 'purple' as const },
    { label: 'Documents utiles', desc: 'Réglementation & droits', icon: FolderOpen, color: 'amber' as const },
    { label: 'Témoignages', desc: 'Paroles de familles', icon: MessageSquare, color: 'rose' as const }
  ];

  // Filtering Logic
  const filteredResources = RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === 'Tous' || res.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="animate-fade-in bg-white">
      {/* Search Header Banner */}
      <section className="bg-gradient-to-br from-amtda-light to-white py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ressources : <br />
              <span className="text-amtda-green">S'informer, comprendre et agir ensemble</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Découvrez notre bibliothèque de ressources pour mieux comprendre les troubles d'apprentissage et accompagner chaque enfant vers la réussite.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs Rows */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catégories de ressources :</h2>
            {selectedCategory !== 'Tous' && (
              <button
                onClick={() => setSelectedCategory('Tous')}
                className="text-xs font-semibold text-amtda-green hover:underline focus:outline-none cursor-pointer"
              >
                Tout afficher
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amtda-green cursor-pointer ${
                    isActive
                      ? 'bg-amtda-green border-amtda-green text-white shadow-md transform -translate-y-0.5'
                      : 'bg-white border-slate-100 text-slate-800 hover:border-slate-300 hover:shadow'
                  }`}
                >
                  <div className="mb-3">
                    <GlassIcon 
                      icon={cat.icon} 
                      color={isActive ? 'emerald' : cat.color} 
                      size="sm" 
                      className={isActive ? 'brightness-125' : ''}
                    />
                  </div>
                  <h3 className={`font-bold text-xs ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {cat.label}
                  </h3>
                  <p className={`text-[10px] mt-0.5 leading-snug ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content (Resources en vedette & Sidebar) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Ressources en vedette</h2>
            <div className="w-8 h-1 bg-amtda-orange mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cards list */}
            <div className="lg:col-span-8 space-y-6">
              {filteredResources.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 p-12 rounded-2xl text-center">
                  <p className="text-slate-500 font-medium">Aucune ressource trouvée pour cette sélection.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredResources.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Custom visual categories tags */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${
                            res.type === 'pdf' ? 'bg-emerald-100 text-amtda-green' :
                            res.type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {res.category}
                          </span>
                          <span className="text-xs text-slate-400">{res.subCategory}</span>
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-sm leading-snug mb-2 group-hover:text-amtda-green transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-6">
                          {res.description}
                        </p>
                      </div>

                      {/* Download link / Play video */}
                      <div className="pt-4 border-t border-slate-50">
                        {res.type === 'video' ? (
                          <a
                            href={res.downloadUrl}
                            className="text-amtda-orange group-hover:text-amtda-green font-bold text-xs flex items-center gap-1.5"
                          >
                            <span className="p-1 bg-orange-100 text-amtda-orange rounded-full">
                              <Play className="w-3.5 h-3.5 fill-current" />
                            </span>
                            Regarder la vidéo
                          </a>
                        ) : res.type === 'game' ? (
                          <a
                            href={res.downloadUrl}
                            className="text-amtda-green group-hover:text-amtda-orange font-bold text-xs flex items-center gap-1.5"
                          >
                            <Gamepad2 className="w-4 h-4 text-amtda-green" />
                            Découvrir les jeux
                          </a>
                        ) : (
                          <a
                            href={res.downloadUrl}
                            className="text-amtda-green group-hover:text-amtda-orange font-bold text-xs flex items-center gap-1.5"
                          >
                            <Download className="w-4 h-4" />
                            Télécharger (PDF)
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Sidebar card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amtda-orange rounded-full opacity-10 blur-2xl"></div>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <GlassIcon icon={HelpCircle} color="orange" size="md" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white leading-snug">Besoin d'un conseil ?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nos spécialistes répondent à vos questions et vous orientent vers les meilleures ressources adaptées au trouble de votre enfant.
                  </p>
                  <button
                    onClick={() => setPage('contact')}
                    className="inline-block bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 py-3 rounded-xl text-xs transition-colors shadow text-center w-full cursor-pointer"
                  >
                    Posez votre question
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid of four helper bullet indicators */}
      <section className="py-8 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <GlassIcon icon={BookOpen} color="emerald" size="sm" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Ressources fiables</h4>
                <p className="text-[10px] text-slate-400">Validées par des spécialistes</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <GlassIcon icon={Shield} color="blue" size="sm" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Accès gratuit</h4>
                <p className="text-[10px] text-slate-400">Pour tous les parents & profs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <GlassIcon icon={RefreshCw} color="amber" size="sm" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Mises à jour régulières</h4>
                <p className="text-[10px] text-slate-400">Des contenus toujours actualisés</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <GlassIcon icon={Trophy} color="rose" size="sm" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Pour la réussite</h4>
                <p className="text-[10px] text-slate-400">De chaque enfant marocain</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter signup & Quote Box */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Newsletter Input Box */}
            <div className="lg:col-span-8 bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 border border-emerald-900 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800 rounded-full opacity-10 blur-3xl"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Abonnement</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">Restez informé(e) !</h3>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-xl">
                    Abonnez-vous à notre newsletter pour recevoir nos nouvelles ressources, conseils et actualités sur les troubles d'apprentissage au Maroc.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-lg">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Votre adresse e-mail..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-emerald-900/60 text-white placeholder-emerald-300 border border-emerald-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amtda-orange"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amtda-green hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors cursor-pointer shrink-0"
                  >
                    S'abonner
                  </button>
                </form>

                {newsletterSuccess && (
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold bg-emerald-900/40 p-3 rounded-lg max-w-lg border border-emerald-800/40">
                    <Check className="w-4 h-4 shrink-0" />
                    Merci ! Votre inscription a bien été prise en compte.
                  </div>
                )}
                {newsletterError && (
                  <div className="flex items-center gap-2 text-red-300 text-xs font-semibold bg-red-950/40 p-3 rounded-lg max-w-lg border border-red-900/40">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {newsletterError}
                  </div>
                )}
              </div>
            </div>

            {/* Right Quote Card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <GlassIcon icon={Heart} color="rose" size="md" />
              </div>
              <p className="text-slate-700 font-medium italic text-xs leading-relaxed max-w-xs">
                "L'éducation et le développement de l'enfant est toujours le centre de nos préoccupations."
              </p>
              <div className="mt-6 flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-amtda-orange"></span>
                <span className="text-[10px] font-bold text-amtda-green tracking-wider uppercase">AMTDA MAROC</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
