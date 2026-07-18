/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playPhoneRing } from '../utils/sound';

export default function Legal() {
  return (
    <div className="animate-fade-in py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mentions légales</h1>
          <div className="flex gap-1 mt-3">
            <span className="w-12 h-1.5 bg-amtda-green rounded-full"></span>
            <span className="w-4 h-1.5 bg-amtda-orange rounded-full"></span>
          </div>
        </div>

        <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">1. Présentation du site</h2>
            <p>
              En vertu des lois sur la transparence numérique, il est précisé aux utilisateurs du site internet <strong className="text-slate-800">amtda.ma</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Propriétaire :</strong> Association Marocaine des Troubles et Difficultés d'Apprentissage (AMTDA)</li>
              <li><strong>Adresse :</strong> Ecole Al Akhtal Banate - Bd Afghanistan, Hay Hassani, Casablanca, Maroc</li>
              <li><strong>Téléphone :</strong> <a href="tel:0661-518927" onMouseEnter={playPhoneRing} className="hover:text-amtda-green hover:underline transition-colors">0661-518927</a></li>
              <li><strong>Email :</strong> contact@amtda.ma</li>
              <li><strong>Directeur de la publication :</strong> Le Président de l'AMTDA</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">2. Propriété intellectuelle</h2>
            <p>
              L'Association AMTDA est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, vidéos, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'association.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">3. Limitations de responsabilité</h2>
            <p>
              L'AMTDA s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
