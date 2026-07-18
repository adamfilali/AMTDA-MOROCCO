/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle, Home } from 'lucide-react';

interface NotFoundProps {
  setPage: (page: string) => void;
}

export default function NotFound({ setPage }: NotFoundProps) {
  return (
    <div className="animate-fade-in py-20 bg-slate-50 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-amtda-orange flex items-center justify-center text-4xl mx-auto shadow-inner">
          ⚠️
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Page introuvable</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Veuillez utiliser le menu principal ou cliquer sur le bouton ci-dessous pour revenir à l'accueil.
          </p>
        </div>

        <button
          onClick={() => setPage('home')}
          className="bg-amtda-green hover:bg-amtda-dark text-white font-bold px-6 py-3 rounded-lg text-xs shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
