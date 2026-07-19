/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Users, Heart, GraduationCap, CheckCircle, Award, Calendar, Landmark, MessageCircle } from 'lucide-react';
import Logo from './Logo';

export default function About() {
  return (
    <div className="animate-fade-in py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium mb-6 text-slate-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <span className="hover:text-amtda-green cursor-pointer">Accueil</span>
              <span className="mx-2 text-slate-400">/</span>
            </li>
            <li className="text-slate-800 font-semibold" aria-current="page">Qui sommes-nous ?</li>
          </ol>
        </nav>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Qui sommes-nous ?</h1>
          <div className="flex gap-1 mt-3">
            <span className="w-12 h-1.5 bg-amtda-green rounded-full"></span>
            <span className="w-4 h-1.5 bg-amtda-orange rounded-full"></span>
          </div>
        </div>

        {/* Intro & Large photo with overlays */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-slate-700 text-base leading-relaxed">
              L'Association Marocaine des Troubles et Difficultés d'Apprentissage (<strong className="text-amtda-green font-bold">AMTDA</strong>) œuvre depuis 2010 pour la reconnaissance des troubles d'apprentissage et l'amélioration de la prise en charge des enfants concernés au Maroc.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous travaillons en partenariat avec les institutions publiques, les professionnels de l'éducation, les parents et les associations pour que chaque enfant puisse apprendre, s'épanouir et réussir.
            </p>

            {/* Conviction overlay card on the left column */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100 flex items-start gap-4">
              <div className="p-3 bg-white text-amtda-green rounded-xl shadow-sm shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-1">Notre conviction</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chaque enfant a le droit d'apprendre autrement, mais avec les mêmes chances de réussite.
                </p>
              </div>
            </div>
          </div>

          {/* Right School Image with Bottom Overlay */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
              <img
                src="./assets/qui.jpg"
                alt="Notre école, un espace d'inclusion et de réussite"
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-100 shadow text-xs font-bold text-amtda-dark">
                🏢 Initiative Nationale pour le Développement Humain
              </div>
            </div>

            {/* School details overlay card */}
            <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-lg border border-emerald-700 flex items-start gap-4">
              <div className="p-3 bg-emerald-950/40 text-emerald-300 rounded-xl shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm mb-1 text-emerald-200">Notre école, un espace d'inclusion et de réussite</h3>
                <p className="text-xs text-emerald-50/90 leading-relaxed">
                  Un lieu dédié à l'accompagnement et à la rééducation des enfants avec des troubles d'apprentissage.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Notre mission */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Big Star/Logo icon */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-56 h-36 bg-white rounded-2xl flex items-center justify-center text-amtda-green shadow-sm border border-slate-100 p-4">
                <Logo theme="light" className="h-20 w-auto" />
              </div>
            </div>

            {/* Right content list */}
            <div className="md:col-span-8 space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notre mission</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Améliorer l'éducation de base des enfants présentant des troubles d'apprentissage, promouvoir leurs droits et contribuer à leur développement durable en assurant un avenir meilleur.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amtda-green shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700">Faire la promotion et la défense des droits des enfants concernés</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amtda-green shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700">Sensibiliser et former les acteurs éducatifs et les familles</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amtda-green shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700">Accompagner les enfants et leurs parents</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amtda-green shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700">Plaidoyer pour une meilleure inclusion scolaire et sociale</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Nos valeurs */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Écoute */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="w-12 h-12 rounded-full bg-emerald-50 text-amtda-green flex items-center justify-center text-xl font-bold mb-4">👂</span>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Écoute</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Être attentif à chaque enfant et à sa famille</p>
            </div>

            {/* Respect */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="w-12 h-12 rounded-full bg-orange-50 text-amtda-orange flex items-center justify-center text-xl font-bold mb-4">🤝</span>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Respect</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Respecter les engagements et la dignité de tous</p>
            </div>

            {/* Solidarité */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="w-12 h-12 rounded-full bg-emerald-50 text-amtda-green flex items-center justify-center text-xl font-bold mb-4">👥</span>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Solidarité</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Agir ensemble dans un esprit d'entraide</p>
            </div>

            {/* Professionnalisme */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="w-12 h-12 rounded-full bg-orange-50 text-amtda-orange flex items-center justify-center text-xl font-bold mb-4">📢</span>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Professionnalisme</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Offrir un accompagnement de qualité avec rigueur et bienveillance</p>
            </div>

            {/* Communication */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="w-12 h-12 rounded-full bg-emerald-50 text-amtda-green flex items-center justify-center text-xl font-bold mb-4">💬</span>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Communication</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Favoriser le dialogue et l'échange entre tous les partenaires</p>
            </div>

          </div>
        </div>

        {/* 5. En chiffres (2010 - 2019) */}
        <div className="border-t border-slate-100 pt-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">En chiffres <span className="text-slate-400 font-normal text-lg">(2010 - 2019)</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Stat 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 text-center shadow-sm">
              <div className="inline-flex p-3 bg-emerald-50 rounded-full text-amtda-green mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-amtda-green tracking-tight">10 à 13%</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">des enfants présentent des troubles d'apprentissage</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 text-center shadow-sm">
              <div className="inline-flex p-3 bg-orange-50 rounded-full text-amtda-orange mb-3">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-amtda-orange tracking-tight">78</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">écoles visitées à travers plusieurs villes du Maroc</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 text-center shadow-sm">
              <div className="inline-flex p-3 bg-emerald-50 rounded-full text-amtda-green mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-amtda-green tracking-tight">Des milliers</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">d'enfants, parents et enseignants sensibilisés</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
