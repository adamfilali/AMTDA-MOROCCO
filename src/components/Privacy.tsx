/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Privacy() {
  return (
    <div className="animate-fade-in py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Politique de confidentialité</h1>
          <div className="flex gap-1 mt-3">
            <span className="w-12 h-1.5 bg-amtda-green rounded-full"></span>
            <span className="w-4 h-1.5 bg-amtda-orange rounded-full"></span>
          </div>
        </div>

        <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">1. Collecte des données personnelles</h2>
            <p>
              Sur le site de l'AMTDA, les données collectées se limitent exclusivement à celles que vous saisissez volontairement dans nos formulaires :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Formulaire de Contact :</strong> Nom et prénom, Adresse e-mail, Téléphone, Sujet et Message.</li>
              <li><strong>Formulaire d'Abonnement Newsletter :</strong> Adresse e-mail uniquement.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">2. Utilisation des données</h2>
            <p>
              Les données personnelles recueillies sur notre site sont utilisées uniquement pour :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Répondre à vos messages et demandes d'accompagnement ou d'orientation.</li>
              <li>Vous adresser nos newsletters et supports d'information si vous y êtes abonné(e).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">3. Confidentialité et Sécurité</h2>
            <p>
              Vos données restent strictement confidentielles. Elles ne sont jamais vendues, louées, partagées ou divulguées à des tiers.
            </p>
            <p>
              Notre site web utilise un certificat SSL pour garantir l'encryptage et la sécurité des données transmises à travers les formulaires.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
