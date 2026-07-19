/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ACTIONS } from '../data';
import { Sparkles, Heart, GraduationCap, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

interface ActionsProps {
  setPage: (page: string) => void;
}

export default function Actions({ setPage }: ActionsProps) {
  return (
    <div className="animate-fade-in py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium mb-6 text-slate-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <span onClick={() => setPage('home')} className="hover:text-amtda-green cursor-pointer">Accueil</span>
              <span className="mx-2 text-slate-400">/</span>
            </li>
            <li className="text-slate-800 font-semibold" aria-current="page">Nos actions</li>
          </ol>
        </nav>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100 mb-16">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Nos actions</h1>
            <div className="w-12 h-1.5 bg-amtda-green rounded-full"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Chaque jour, nous agissons pour améliorer la vie des enfants ayant des troubles d'apprentissage et accompagner leurs familles et les professionnels de l'éducation.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src="./assets/soutient.jpg"
              alt="Groupe d'enfants du Maroc souriants à l'école"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover rounded-2xl shadow-md border border-slate-200"
            />
          </div>
        </div>

        {/* Domain of interventions title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nos domaines d'intervention</h2>
          <div className="w-8 h-1 bg-amtda-orange mx-auto mt-2"></div>
        </div>

        {/* 6 domain cards with images BELOW description as in mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {ACTIONS.map((action, index) => {
            // Pick static icons corresponding to actions
            const icons = [
              <Sparkles className="w-5 h-5 text-amtda-green" />,
              <GraduationCap className="w-5 h-5 text-amtda-green" />,
              <Award className="w-5 h-5 text-amtda-green" />,
              <ShieldAlert className="w-5 h-5 text-amtda-green" />,
              <Heart className="w-5 h-5 text-amtda-green" />,
              <CheckCircle2 className="w-5 h-5 text-amtda-green" />
            ];

            return (
              <div
                key={action.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2.5 bg-emerald-50 rounded-xl">
                      {icons[index % icons.length]}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {action.description}
                  </p>
                </div>
                
                {/* Image placed BELOW text details */}
                <div className="h-44 overflow-hidden relative border-t border-slate-50">
                  <img
                    src={action.image}
                    alt={action.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Nos objectifs au quotidien (4 columns horizontal layout) */}
        <div className="border-t border-slate-100 pt-16 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nos objectifs au quotidien</h2>
            <div className="w-8 h-1 bg-amtda-green mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Objective 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-3">
              <span className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm text-lg shrink-0">🌟</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Permettre à chaque enfant</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">d'apprendre autrement et de révéler son potentiel.</p>
              </div>
            </div>

            {/* Objective 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-3">
              <span className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm text-lg shrink-0">🏫</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Promouvoir une école</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">inclusive et respectueuse des différences.</p>
              </div>
            </div>

            {/* Objective 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-3">
              <span className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm text-lg shrink-0">❤️</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Soutenir les familles</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">et les accompagner à chaque étape.</p>
              </div>
            </div>

            {/* Objective 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-3">
              <span className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm text-lg shrink-0">🤝</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Contribuer à une société</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">plus juste et plus attentive aux besoins de tous les enfants.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="bg-amtda-green text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amtda-orange"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Rejoignez-nous</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Agir ensemble pour un avenir meilleur</h2>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-2xl">
                Rejoignez-nous dans nos actions et aidez-nous à faire la différence dans la vie des enfants ayant des troubles d'apprentissage. Votre engagement ou vos contributions directes soutiennent l'élargissement de nos centres d'accompagnement.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row items-center gap-4 justify-end">
              <button
                onClick={() => setPage('donate')}
                className="bg-amtda-orange hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-lg shadow-md transition-colors w-full sm:w-auto text-center"
              >
                Soutenir nos actions →
              </button>
              
              {/* Hands illustration icon element representation */}
              <div className="text-5xl shrink-0 animate-pulse select-none hidden sm:block">
                🙌
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
