/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ARTICLES } from '../data';
import { Calendar, Search, ArrowRight, Check, AlertCircle, Facebook, Youtube, Instagram, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Article } from '../types';

interface NewsProps {
  setPage: (page: string) => void;
}

export default function News({ setPage }: NewsProps) {
  const [selectedCat, setSelectedCat] = useState('Tous');
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');
    setNewsSuccess(false);

    if (!newsEmail) {
      setNewsError('Veuillez entrer une adresse e-mail.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsEmail)) {
      setNewsError('Format d\'adresse e-mail invalide.');
      return;
    }

    setNewsSuccess(true);
    setNewsEmail('');
  };

  const filteredArticles = ARTICLES.filter(art => {
    if (selectedCat === 'Tous') return true;
    if (selectedCat === 'Événements' && art.category === 'ÉVÉNEMENT') return true;
    if (selectedCat === 'Projets' && art.category === 'PROJET') return true;
    if (selectedCat === 'Actualités' && art.category === 'ACTUALITÉ') return true;
    return false;
  });

  return (
    <div className="animate-fade-in bg-white relative">
      {/* Header Banner with Arabic Quote Overlay as in mockup */}
      <section className="relative bg-slate-900 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('./assets/confe.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Actualités</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Restez informés de nos dernières nouvelles, événements, campagnes et actions en faveur des enfants avec des troubles d'apprentissage au Maroc.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Category Filter Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <nav className="text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <span onClick={() => setPage('home')} className="hover:text-amtda-green cursor-pointer">Accueil</span>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-slate-800 font-bold" aria-current="page">Actualités</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filtrer par :</span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amtda-green cursor-pointer"
              >
                <option value="Tous">Toutes les catégories</option>
                <option value="Événements">Événements</option>
                <option value="Projets">Projets</option>
                <option value="Actualités">Actualités</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Articles list */}
            <div className="lg:col-span-8 space-y-8">
              {filteredArticles.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 p-12 rounded-2xl text-center">
                  <p className="text-slate-500 font-medium">Aucun article disponible pour cette catégorie.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between"
                    >
                      <div>
                        {/* Article photo */}
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={art.image}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                          <span className="absolute top-4 left-4 bg-emerald-800 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
                            {art.category}
                          </span>
                        </div>

                        {/* Article detail */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{art.date}</span>
                          </div>
                          <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-amtda-green transition-colors">
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Read more link - triggers modal */}
                      <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                        <button
                          onClick={() => setSelectedArticle(art)}
                          className="text-amtda-green group-hover:text-amtda-orange font-bold text-xs flex items-center gap-1 transition-colors focus:outline-none cursor-pointer"
                        >
                          Lire la suite
                          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Sidebar Newsletter Widget */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-xs mb-1 uppercase tracking-wider">Inscrivez-vous à notre newsletter</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Recevez nos actualités et nos conseils directement par boîte mail.
                </p>

                <form onSubmit={handleNewsSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Votre adresse e-mail..."
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amtda-green hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    S'inscrire
                  </button>
                </form>

                {newsSuccess && (
                  <p className="text-emerald-600 text-[11px] font-semibold mt-3 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Inscription validée !
                  </p>
                )}
                {newsError && (
                  <p className="text-red-500 text-[11px] font-semibold mt-3 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {newsError}
                  </p>
                )}
              </div>

              {/* Sidebar Categories widget */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-xs mb-4 uppercase tracking-wider">Catégories</h3>
                <div className="space-y-2.5">
                  {[
                    { key: 'Tous', label: 'Tous', count: 12 },
                    { key: 'Événements', label: 'Événements', count: 4 },
                    { key: 'Projets', label: 'Projets', count: 3 },
                    { key: 'Actualités', label: 'Actualités', count: 3 },
                    { key: 'Témoignages', label: 'Témoignages', count: 2 }
                  ].map((category) => {
                    const isSelected = selectedCat === category.key;
                    return (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCat(category.key)}
                        className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-amtda-green font-medium focus:outline-none cursor-pointer"
                      >
                        <span className={isSelected ? 'text-amtda-green font-black' : ''}>
                          {category.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected ? 'bg-amtda-green text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Follow-us socials */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-xs mb-4 uppercase tracking-wider">Suivez-nous</h3>
                <div className="flex gap-3">
                  <a href="#facebook" className="p-2.5 bg-white text-slate-600 hover:text-amtda-green rounded-xl shadow-sm border border-slate-100 hover:shadow transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#youtube" className="p-2.5 bg-white text-slate-600 hover:text-amtda-green rounded-xl shadow-sm border border-slate-100 hover:shadow transition-all">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="#instagram" className="p-2.5 bg-white text-slate-600 hover:text-amtda-green rounded-xl shadow-sm border border-slate-100 hover:shadow transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Banner Row: À la une */}
          <div className="border-t border-slate-100 pt-16 mt-16">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-8">À la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-950 text-sm mb-2">Atelier de soutien scolaire et activités éducatives</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Nos ateliers hebdomadaires aident les enfants à renforcer leurs apprentissages dans un cadre bienveillant et adapté.
                  </p>
                </div>
                <button
                  onClick={() => setPage('actions')}
                  className="text-amtda-green hover:text-amtda-orange font-bold text-xs flex items-center gap-1 transition-colors self-start focus:outline-none cursor-pointer"
                >
                  Découvrir nos actions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-950 text-sm mb-2">Devenez bénévole</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Rejoignez notre équipe et contribuez à changer la vie de nombreux enfants ayant des troubles scolaires.
                  </p>
                </div>
                <button
                  onClick={() => setPage('contact')}
                  className="text-amtda-green hover:text-amtda-orange font-bold text-xs flex items-center gap-1 transition-colors self-start focus:outline-none cursor-pointer"
                >
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-950 text-sm mb-2">Soutenez notre mission</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Votre don nous aide à poursuivre nos actions et à accompagner plus d'enfants dans le besoin.
                  </p>
                </div>
                <button
                  onClick={() => setPage('donate')}
                  className="bg-amtda-green hover:bg-amtda-dark text-white font-bold text-[11px] px-4 py-2 rounded-lg transition-colors self-start focus:outline-none cursor-pointer"
                >
                  Faire un don →
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Central Modern Modal Frame for News details */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark blur glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[85vh] md:max-h-[80vh]"
            >
              {/* Close button in top-right */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 bg-slate-950/50 hover:bg-slate-950 text-white rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable container with intelligent scroll style */}
              <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {/* Visual Header image */}
                <div className="relative h-60 sm:h-72 w-full">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {/* Category and date badge at bottom left */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="bg-amtda-green text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black leading-tight text-white">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold pt-1">
                      <Calendar className="w-3.5 h-3.5 text-amtda-orange animate-pulse" />
                      <span>{selectedArticle.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content body with smart spacing */}
                <div className="p-6 sm:p-8 space-y-6 text-slate-700">
                  <p className="text-sm font-bold text-slate-900 border-l-4 border-amtda-orange pl-4 py-1 bg-slate-50 rounded-r-lg">
                    {selectedArticle.excerpt}
                  </p>
                  
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
                    {selectedArticle.content ? (
                      selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-justify font-medium">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-justify font-medium">
                        {selectedArticle.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Close Button Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-amtda-green hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer focus:outline-none"
                >
                  Fermer la lecture
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
