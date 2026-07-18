/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Globe, Send, Check, AlertCircle, Facebook, Youtube, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { playPhoneRing } from '../utils/sound';

interface ContactProps {
  setPage: (page: string) => void;
}

export default function Contact({ setPage }: ContactProps) {
  // Form State
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Status Alerts State
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    // Simple robust JS validation
    if (!fullname.trim()) {
      setErrorMsg('Veuillez renseigner votre Nom et Prénom.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Veuillez entrer un e-mail valide.');
      return;
    }
    if (!subject) {
      setErrorMsg('Veuillez sélectionner le sujet de votre message.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Veuillez rédiger votre message.');
      return;
    }
    if (!consent) {
      setErrorMsg('Vous devez accepter que vos données soient utilisées pour que nous puissions vous répondre.');
      return;
    }

    // Success response simulation
    setSuccess(true);
    setFullname('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setConsent(false);
  };

  return (
    <div className="animate-fade-in bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-br from-amtda-light via-white to-white py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Contactez-nous</h1>
              <div className="w-12 h-1.5 bg-amtda-green rounded-full"></div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Vous avez une question, souhaitez en savoir plus sur nos actions ou proposer un partenariat ? N'hésitez pas à nous contacter, nous serons ravis de vous répondre.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-32 h-32 bg-orange-100 rounded-full absolute -top-4 -left-4 opacity-55 blur-xl"></div>
                <img
                  src="/assets/famille.jpg"
                  alt="Une conseillère AMTDA à l'écoute par téléphone"
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 object-cover rounded-full shadow-lg border-2 border-white relative z-10"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Coordonnées & Message Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Coordonnées */}
            <div className="lg:col-span-4 space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight pb-2 border-b border-slate-200">
                Nos coordonnées
              </h2>

              <div className="space-y-5">
                
                {/* Adresse */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Adresse</h4>
                    <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                      Ecole Al Akhtal Banate - Bd Afghanistan <br />
                      Hay Hassani, Casablanca, Morocco
                    </p>
                  </div>
                </div>

                {/* Téléphone with elegant hover wiggle and glowing pulse indicator */}
                <motion.div 
                  className="flex items-start gap-3.5 group p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100/60 transition-all duration-300"
                  whileHover="hover"
                >
                  <div className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm shrink-0 relative overflow-hidden">
                    <motion.div 
                      variants={{
                        hover: {
                          rotate: [0, -15, 15, -15, 15, -10, 10, 0],
                          scale: 1.1,
                          transition: { duration: 0.5, ease: "easeInOut" }
                        }
                      }}
                    >
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      Téléphone
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-50 text-amtda-green border border-emerald-100">
                        En direct
                      </span>
                    </h4>
                    <motion.a 
                      href="tel:0661-518927" 
                      onMouseEnter={playPhoneRing} 
                      className="text-sm text-slate-800 hover:text-amtda-green font-extrabold mt-1 block transition-colors"
                      variants={{
                        hover: { scale: 1.02 }
                      }}
                    >
                      0661-518927
                    </motion.a>
                  </div>
                </motion.div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Email</h4>
                    <a href="mailto:contact@amtda.ma" className="text-xs text-slate-700 hover:text-amtda-green font-semibold mt-0.5 block">
                      contact@amtda.ma
                    </a>
                  </div>
                </div>

                {/* Site web */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Site web</h4>
                    <span className="text-xs text-slate-700 font-semibold mt-0.5 block">
                      amtda.ma
                    </span>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white text-amtda-green rounded-xl shadow-sm shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Horaires d'ouverture</h4>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                      Lundi - Vendredi : 9h00 - 17h00 <br />
                      Samedi : 9h00 - 13h00
                    </p>
                  </div>
                </div>

              </div>

              {/* Social networks links */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">Suivez-nous :</h4>
                <div className="flex gap-2">
                  <a href="#fb" className="p-2.5 bg-emerald-800 text-white hover:bg-emerald-700 rounded-lg shadow-sm transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#yt" className="p-2.5 bg-emerald-800 text-white hover:bg-emerald-700 rounded-lg shadow-sm transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="#ig" className="p-2.5 bg-emerald-800 text-white hover:bg-emerald-700 rounded-lg shadow-sm transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Message Form */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight pb-2 border-b border-slate-100">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full name */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-xs font-bold text-slate-700">Nom et prénom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-xs font-bold text-slate-700">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green focus:bg-white transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-xs font-bold text-slate-700">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Votre numéro de téléphone"
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green focus:bg-white transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-xs font-bold text-slate-700">Sujet <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green focus:bg-white transition-all"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="demande-information">Demande d'informations</option>
                    <option value="depistage">Dépistage et orientation d'un enfant</option>
                    <option value="benevolat">Devenir bénévole / Partenariat</option>
                    <option value="don">Question sur les dons</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5 col-span-2">
                  <label className="block text-xs font-bold text-slate-700">Votre message <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Rédigez votre message ici..."
                    className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-amtda-green focus:bg-white transition-all"
                  ></textarea>
                </div>

                {/* Consent Checkbox */}
                <div className="col-span-2 flex items-start gap-2 pt-2">
                  <input
                    id="consent-chk"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 text-amtda-green focus:ring-amtda-green border-slate-300 rounded"
                  />
                  <label htmlFor="consent-chk" className="text-[11px] text-slate-500 select-none leading-relaxed">
                    J'accepte que mes données soient utilisées pour répondre à ma demande. Les données transmises restent strictement confidentielles et réservées à l'AMTDA.
                  </label>
                </div>

                {/* Submission status alerts */}
                {success && (
                  <div className="col-span-2 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs font-semibold">
                    <Check className="w-4 h-4 shrink-0" />
                    Votre message a été envoyé avec succès ! Nous vous recontacterons très bientôt.
                  </div>
                )}
                {errorMsg && (
                  <div className="col-span-2 flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {/* Button Submit */}
                <div className="col-span-2 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-amtda-green hover:bg-amtda-dark text-white font-bold px-6 py-3 rounded-lg text-xs transition-colors shadow flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Notre Localisation (Map Section) */}
      <section className="py-8 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Notre localisation</h2>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Où nous trouver ?</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* Interactive simulated Map Container */}
            <div className="w-full h-80 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center">
              {/* Fake grid lines represent map */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Route line simulations */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-amber-100/60 rotate-2 border-t border-b border-amber-200/50"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-emerald-100/60 -rotate-12 border-l border-r border-emerald-200/50"></div>

              {/* Map Address Label Overlay */}
              <div className="bg-white/95 p-4 rounded-xl shadow-lg border border-slate-200 max-w-xs relative z-10 text-center space-y-2">
                <span className="inline-flex p-2 bg-emerald-50 rounded-full text-amtda-green">
                  <MapPin className="w-5 h-5 fill-current" />
                </span>
                <h4 className="font-extrabold text-xs text-slate-900">Ecole Al Akhtal Banate - AMTDA</h4>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Bd Afghanistan, Hay Hassani, Casablanca, Morocco
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-amtda-green hover:underline font-bold text-[10px]"
                >
                  Afficher dans Google Maps
                </a>
              </div>

              {/* Map controls representation */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white p-1 rounded-md shadow border border-slate-200">
                <button className="w-6 h-6 flex items-center justify-center text-xs font-black text-slate-600 hover:bg-slate-100 rounded">+</button>
                <button className="w-6 h-6 flex items-center justify-center text-xs font-black text-slate-600 hover:bg-slate-100 rounded">-</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom 4 helper service cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Helper 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-xl mb-3 block">📞</span>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Besoin d'écoute ?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Notre équipe est à votre écoute pour vous informer, vous conseiller et vous orienter.
                </p>
              </div>
              <button onClick={() => window.scrollTo(0, 0)} className="text-amtda-green hover:text-amtda-orange font-bold text-xs self-start mt-2">
                Nous contacter →
              </button>
            </div>

            {/* Helper 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-xl mb-3 block">👨‍👩‍👧</span>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Vous êtes parent ?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Découvrez nos conseils et fiches pratiques pédagogiques pour accompagner votre enfant.
                </p>
              </div>
              <button onClick={() => setPage('resources')} className="text-amtda-green hover:text-amtda-orange font-bold text-xs self-start mt-2">
                En savoir plus →
              </button>
            </div>

            {/* Helper 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-xl mb-3 block">💼</span>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Vous êtes professionnel ?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Collaborons ensemble pour une meilleure prise en charge des troubles d'apprentissage au Maroc.
                </p>
              </div>
              <button onClick={() => setPage('actions')} className="text-amtda-green hover:text-amtda-orange font-bold text-xs self-start mt-2">
                Partenariats →
              </button>
            </div>

            {/* Helper 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-xl mb-3 block">❤️</span>
                <h4 className="font-extrabold text-slate-900 text-xs mb-1">Soutenez notre mission</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Votre don nous aide à agir pour un avenir meilleur et une scolarisation inclusive de nos enfants.
                </p>
              </div>
              <button onClick={() => setPage('donate')} className="text-amtda-green hover:text-amtda-orange font-bold text-xs self-start mt-2">
                Faire un don →
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
