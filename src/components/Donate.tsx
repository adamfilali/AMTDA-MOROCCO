/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Heart, RefreshCw, Layers, CreditCard, Landmark, Smartphone, Check, Lock } from 'lucide-react';

export default function Donate() {
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [destination, setDestination] = useState('Soutenir l\'ensemble de nos actions');
  const [frequency, setFrequency] = useState('Don ponctuel');
  const [paymentMethod, setPaymentMethod] = useState('Carte bancaire');
  
  // Status alert states
  const [success, setSuccess] = useState(false);

  // Computed Amount
  const finalAmount = selectedPreset === 'custom' ? (parseFloat(customAmount) || 0) : selectedPreset;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;
    setSuccess(true);
  };

  const presets = [
    { value: 100, label: '100 MAD', tag: 'Je soutiens', desc: 'J\'aide à financer nos actions de sensibilisation.' },
    { value: 200, label: '200 MAD', tag: 'Je participe', desc: 'Je contribue aux ateliers et activités éducatives.' },
    { value: 500, label: '500 MAD', tag: 'Je m\'engage', desc: 'Je soutiens l\'accompagnement personnalisé des enfants.' },
    { value: 1000, label: '1000 MAD', tag: 'Je fais la différence', desc: 'Je participe au développement de nos projets.' }
  ];

  return (
    <div className="animate-fade-in bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <section className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Faire un don</h1>
              <div className="w-12 h-1.5 bg-amtda-green rounded-full"></div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Votre soutien nous permet d'accompagner les enfants ayant des troubles d'apprentissage et de construire avec eux un avenir meilleur. Chaque geste compte !
              </p>
            </div>

            {/* Banner graphic mockup representation */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg text-center max-w-xs border border-emerald-800">
                <span className="text-3xl block mb-2">👦👧</span>
                <p className="font-extrabold text-sm mb-1 text-emerald-100">Merci pour votre soutien !</p>
                <p className="text-[10px] text-emerald-300">Ensemble, offrons un avenir scolaire inclusif.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Donation form workflow layout */}
        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-6">
            <span className="w-16 h-16 rounded-full bg-emerald-100 text-amtda-green flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
              ✓
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Merci pour votre générosité !</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Votre don de <strong className="text-amtda-green text-lg font-bold">{finalAmount} MAD</strong> destiné à <strong className="italic text-slate-700">"{destination}"</strong> a bien été reçu et sécurisé. Un reçu fiscal de donation vous sera adressé prochainement par e-mail.
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setSelectedPreset(100);
                setCustomAmount('');
              }}
              className="bg-amtda-green hover:bg-amtda-dark text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Faire un nouveau don
            </button>
          </div>
        ) : (
          <form onSubmit={handleDonateSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Donation settings */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Preset grids */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-50 text-amtda-green flex items-center justify-center text-xs">1</span>
                  Je choisis mon don
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {presets.map((preset) => {
                    const isSelected = selectedPreset === preset.value;
                    return (
                      <button
                        type="button"
                        key={preset.value}
                        onClick={() => setSelectedPreset(preset.value)}
                        className={`p-5 rounded-2xl border text-left transition-all duration-300 relative focus:outline-none flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-amtda-green ring-2 ring-amtda-green/20'
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-4 right-4 bg-amtda-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                            ✓
                          </span>
                        )}
                        <div>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-emerald-100 text-amtda-green' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {preset.tag}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-xl tracking-tight mt-3 mb-1">
                            {preset.label}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal mt-1">
                          {preset.desc}
                        </p>
                      </button>
                    );
                  })}

                  {/* Custom option */}
                  <button
                    type="button"
                    onClick={() => setSelectedPreset('custom')}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 relative focus:outline-none col-span-1 sm:col-span-2 ${
                      selectedPreset === 'custom'
                        ? 'bg-emerald-50 border-amtda-green ring-2 ring-amtda-green/20'
                        : 'bg-white border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {selectedPreset === 'custom' && (
                      <span className="absolute top-4 right-4 bg-amtda-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                        ✓
                      </span>
                    )}
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      selectedPreset === 'custom' ? 'bg-emerald-100 text-amtda-green' : 'bg-slate-100 text-slate-500'
                    }`}>
                      Autre montant
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-3 mb-1">Je choisis librement le montant de mon don.</h4>
                    
                    {selectedPreset === 'custom' && (
                      <div className="mt-3 flex items-center gap-2 max-w-xs">
                        <input
                          type="number"
                          required
                          min={10}
                          placeholder="Saisir montant en MAD..."
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="bg-white text-slate-800 border border-slate-300 rounded-lg py-2 px-3 text-xs w-full focus:outline-none focus:ring-1 focus:ring-amtda-green"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-xs font-bold text-slate-600 shrink-0">MAD</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Destination Radio select */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-50 text-amtda-green flex items-center justify-center text-xs">2</span>
                  Mon don est destiné à :
                </h3>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                  {[
                    'Soutenir l\'ensemble de nos actions',
                    'Accompagnement et rééducation des enfants',
                    'Sensibilisation et formation des enseignants et parents',
                    'Ouverture et équipement de notre école spécialisée'
                  ].map((dest) => (
                    <label key={dest} className="flex items-start gap-3 cursor-pointer text-xs font-semibold text-slate-700 select-none hover:text-amtda-green">
                      <input
                        type="radio"
                        name="destination"
                        checked={destination === dest}
                        onChange={() => setDestination(dest)}
                        className="mt-0.5 h-4 w-4 text-amtda-green focus:ring-amtda-green"
                      />
                      <span>{dest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Frequency selection */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-50 text-amtda-green flex items-center justify-center text-xs">3</span>
                  Fréquence de mon don :
                </h3>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-6">
                  <label className="flex items-start gap-3 cursor-pointer text-xs font-bold text-slate-700 select-none hover:text-amtda-green">
                    <input
                      type="radio"
                      name="frequency"
                      checked={frequency === 'Don ponctuel'}
                      onChange={() => setFrequency('Don ponctuel')}
                      className="mt-0.5 h-4 w-4 text-amtda-green focus:ring-amtda-green"
                    />
                    <div>
                      <span>Don ponctuel</span>
                      <p className="text-[10px] text-slate-400 font-normal mt-0.5">Soutenir de manière ponctuelle selon vos choix.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer text-xs font-bold text-slate-700 select-none hover:text-amtda-green">
                    <input
                      type="radio"
                      name="frequency"
                      checked={frequency === 'Don mensuel'}
                      onChange={() => setFrequency('Don mensuel')}
                      className="mt-0.5 h-4 w-4 text-amtda-green focus:ring-amtda-green"
                    />
                    <div>
                      <span>Don mensuel</span>
                      <p className="text-[10px] text-slate-400 font-normal mt-0.5">Je soutiens régulièrement nos actions par prélèvement.</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right: Sidebar billing */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-150 p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-2">Mon don</h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Montant sélectionné :</span>
                    <span className="font-bold">{finalAmount} MAD</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Frais de transaction :</span>
                    <span className="font-bold text-emerald-600">0 MAD</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200 pt-3">
                    <span>Total :</span>
                    <span>{finalAmount} MAD</span>
                  </div>
                </div>
              </div>

              {/* Secure Payment Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Lock className="w-3.5 h-3.5 text-amtda-green" />
                  Mon paiement sécurisé
                </h3>

                <div className="space-y-3">
                  {[
                    { name: 'Carte bancaire', icon: <CreditCard className="w-4 h-4" /> },
                    { name: 'Virement bancaire', icon: <Landmark className="w-4 h-4" /> },
                    { name: 'Paiement mobile', icon: <Smartphone className="w-4 h-4" /> }
                  ].map((method) => (
                    <label
                      key={method.name}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none text-xs font-semibold hover:border-slate-300 ${
                        paymentMethod === method.name ? 'bg-slate-50 border-slate-300' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.name}
                          onChange={() => setPaymentMethod(method.name)}
                          className="h-4 w-4 text-amtda-green focus:ring-amtda-green"
                        />
                        <span>{method.name}</span>
                      </div>
                      <span className="text-slate-400 shrink-0">{method.icon}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={finalAmount <= 0}
                  className="w-full bg-amtda-green hover:bg-amtda-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-3.5 px-4 rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Je fais un don
                </button>

                <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Paiement 100% sécurisé et encrypté SSL
                </p>
              </div>

            </div>

          </form>
        )}

        {/* Bottom helper bars */}
        <div className="border-t border-slate-100 pt-12 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="p-2 bg-white text-amtda-green rounded-xl shadow-sm text-lg">🛡️</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Sécurisé</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Vos dons sont protégés et 100% sécurisés.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="p-2 bg-white text-amtda-green rounded-xl shadow-sm text-lg">📊</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Transparence</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Nous garantissons une gestion transparente de vos dons.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="p-2 bg-white text-amtda-green rounded-xl shadow-sm text-lg">🌍</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Impact</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Votre don change la vie des enfants et de leurs familles.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
              <span className="p-2 bg-white text-amtda-green rounded-xl shadow-sm text-lg">👍</span>
              <div>
                <h4 className="font-extrabold text-amtda-green text-xs mb-1">Merci pour votre générosité !</h4>
                <p className="text-[10px] text-slate-600 leading-relaxed">Ensemble, aidons chaque enfant à apprendre et à réussir.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
