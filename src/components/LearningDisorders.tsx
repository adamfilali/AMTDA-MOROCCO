/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DISORDERS } from '../data';
import { 
  BookOpen, PenTool, Calculator, Activity, MessageSquare, 
  ArrowRight, HelpCircle, Phone, Sparkles, MessageCircle, Landmark, Users, X, CheckCircle2, GraduationCap, Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Disorder } from '../types';
import GlassIcon from './GlassIcon';

interface LearningDisordersProps {
  setPage: (page: string) => void;
}

// Map disorder IDs to modern Lucide Icons & specific GlassIcon color palettes
const DISORDER_ICONS: Record<string, { icon: React.ComponentType<any>; color: 'emerald' | 'blue' | 'orange' | 'purple' | 'rose' | 'amber' }> = {
  dyslexie: { icon: BookOpen, color: 'emerald' },
  dysorthographie: { icon: PenTool, color: 'blue' },
  dyscalculie: { icon: Calculator, color: 'orange' },
  dyspraxie: { icon: Activity, color: 'purple' },
  'troubles-langage': { icon: MessageSquare, color: 'rose' }
};

export default function LearningDisorders({ setPage }: LearningDisordersProps) {
  const [selectedDisorder, setSelectedDisorder] = useState<Disorder | null>(null);

  return (
    <div className="animate-fade-in py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium mb-6 text-slate-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <span onClick={() => setPage('home')} className="hover:text-amtda-green cursor-pointer">Accueil</span>
              <span className="mx-2 text-slate-400">/</span>
            </li>
            <li className="text-slate-800 font-semibold" aria-current="page">Troubles d'apprentissage</li>
          </ol>
        </nav>

        {/* Hero Section of Troubles d'apprentissage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100 mb-16">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Les troubles d'apprentissage</h1>
            <div className="w-12 h-1.5 bg-amtda-green rounded-full mb-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Les troubles d'apprentissage ne sont pas liés à l'intelligence. Ils concernent des fonctions spécifiques et peuvent être accompagnés et pris en charge efficacement avec des méthodes adaptées.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src="/assets/fille.jpg"
              alt="Écolier marocain écrivant attentivement sur son cahier"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover rounded-2xl shadow-md border border-slate-200"
            />
          </div>
        </div>

        {/* Intro Text */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Comprendre pour mieux accompagner</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Chaque enfant est unique. Découvrez les principaux troubles d'apprentissage que nous accompagnons et les signes qui peuvent alerter.
          </p>
        </div>

        {/* Disorder cards (5 columns) with GlassIcons replacement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {DISORDERS.map((disorder) => {
            const iconConfig = DISORDER_ICONS[disorder.id] || { icon: HelpCircle, color: 'emerald' as const };
            return (
              <div
                key={disorder.id}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Custom Glass Icon */}
                  <div className="mb-4">
                    <GlassIcon 
                      icon={iconConfig.icon} 
                      color={iconConfig.color} 
                      size="sm" 
                    />
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-amtda-green transition-colors">
                    {disorder.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[48px]">
                    {disorder.description}
                  </p>

                  {/* Signes possibles list */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signes possibles :</h4>
                    <ul className="space-y-1.5">
                      {disorder.signs.map((sign, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-amtda-orange mt-0.5 shrink-0">•</span>
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDisorder(disorder)}
                  className="text-amtda-green group-hover:text-amtda-orange font-bold text-xs flex items-center gap-1 transition-colors mt-auto focus:outline-none cursor-pointer self-start"
                >
                  En savoir plus <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Statistics section with modern icons */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="mb-2">
                <GlassIcon icon={Users} color="emerald" size="sm" />
              </div>
              <div className="text-2xl font-extrabold text-amtda-green">10 à 13%</div>
              <p className="text-[11px] text-slate-500 font-bold mt-1 max-w-[200px]">des enfants présentent des troubles d'apprentissage</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="mb-2">
                <GlassIcon icon={Landmark} color="orange" size="sm" />
              </div>
              <div className="text-2xl font-extrabold text-amtda-orange">78</div>
              <p className="text-[11px] text-slate-500 font-bold mt-1 max-w-[200px]">écoles visitées à travers plusieurs villes du Maroc</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="mb-2">
                <GlassIcon icon={MessageCircle} color="blue" size="sm" />
              </div>
              <div className="text-2xl font-extrabold text-amtda-green">Des milliers</div>
              <p className="text-[11px] text-slate-500 font-bold mt-1 max-w-[200px]">d'enfants, parents et enseignants sensibilisés</p>
            </div>
          </div>
        </div>

        {/* Double Banner Contact Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block */}
          <div className="lg:col-span-7 bg-emerald-900 text-white p-8 sm:p-10 rounded-3xl border border-emerald-800 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Avenir inclusif</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-emerald-50">Une prise en charge précoce change l'avenir d'un enfant</h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Détecter tôt, comprendre, accompagner et adapter : les clés pour aider chaque enfant à révéler son potentiel et à réussir.
            </p>
          </div>

          {/* Right Block with Heart indicator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-orange-50 to-amber-50/40 p-8 sm:p-10 rounded-3xl border border-orange-100 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">Vous avez un doute ou des questions ?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nos équipes sont là pour vous écouter et vous guider pas à pas dans l'accompagnement de votre enfant.
              </p>
              <button
                id="disorder-contact-btn"
                onClick={() => setPage('contact')}
                className="bg-amtda-green hover:bg-amtda-dark text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition-colors flex items-center gap-2 mt-2 focus:outline-none cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Contactez-nous
              </button>
            </div>
            <div className="shrink-0 hidden sm:block">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-500 shadow-inner border border-orange-200">
                <Heart className="w-10 h-10 animate-pulse text-amtda-orange" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Central intelligent Modal Frame for Disorder details */}
      <AnimatePresence>
        {selectedDisorder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Transparent backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDisorder(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[80vh]"
            >
              {/* Close Button in top-right */}
              <button
                onClick={() => setSelectedDisorder(null)}
                className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content container with scroll intelligent */}
              <div className="overflow-y-auto flex-grow p-6 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                
                {/* Header Icon & Title */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <GlassIcon 
                    icon={DISORDER_ICONS[selectedDisorder.id]?.icon || HelpCircle} 
                    color={DISORDER_ICONS[selectedDisorder.id]?.color || 'emerald'} 
                    size="md" 
                  />
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-amtda-orange uppercase">
                      Informations détaillées
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                      Le trouble : {selectedDisorder.name}
                    </h2>
                  </div>
                </div>

                {/* Main description full text split by paragraphs */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qu'est-ce que c'est ?</h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                    {selectedDisorder.fullText ? (
                      selectedDisorder.fullText.split('\n\n').map((para, idx) => (
                        <p key={idx} className="text-justify font-medium">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="font-medium text-justify">{selectedDisorder.description}</p>
                    )}
                  </div>
                </div>

                {/* Common signs list recap */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amtda-orange animate-ping"></span>
                    Signes d'alerte principaux :
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDisorder.signs.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 font-semibold">
                        <span className="text-amtda-orange shrink-0 font-bold">•</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Adaptations and solutions */}
                {selectedDisorder.solutions && selectedDisorder.solutions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-amtda-green" />
                      Pistes d'accompagnement & Solutions :
                    </h4>
                    <ul className="space-y-2">
                      {selectedDisorder.solutions.map((sol, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-amtda-green shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Close Button Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedDisorder(null);
                    setPage('contact');
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Demander conseil
                </button>
                <button
                  onClick={() => setSelectedDisorder(null)}
                  className="bg-amtda-green hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2 rounded-xl shadow-sm transition-colors cursor-pointer focus:outline-none"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
