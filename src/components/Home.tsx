/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, Users, HelpCircle, Shield, Play, Heart, GraduationCap, 
  Laptop, Sparkles, Smile, Gamepad2, Target, TrendingUp 
} from 'lucide-react';
import GlassIcon from './GlassIcon';

interface HomeProps {
  setPage: (page: string) => void;
}

export default function Home({ setPage }: HomeProps) {
  return (
    <div className="animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-amtda-light via-white to-white py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-amtda-green font-semibold text-sm tracking-wider uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
                Dyslexie – Échec Scolaire – Troubles et Difficultés d'Apprentissage
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Trouble d'apprentissage chez les enfants : <br />
                <span className="text-amtda-orange">un calvaire pour les parents</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                L'Association marocaine des troubles et difficultés d'apprentissage plaide pour une loi encadrant la scolarisation des enfants concernés. Des sondages effectués entre 2010-2019 révèlent que 10 à 13% des enfants présentent des troubles d'apprentissage. La majorité des enseignants ignorent l'étendue du mal. Une école spécialisée devrait ouvrir dès la prochaine rentrée.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  id="hero-donate-btn"
                  onClick={() => setPage('donate')}
                  className="bg-amtda-green hover:bg-amtda-dark text-white font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amtda-green"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Soutenez notre mission
                </button>
                <button
                  id="hero-actions-btn"
                  onClick={() => setPage('actions')}
                  className="bg-white hover:bg-slate-50 text-amtda-green border-2 border-amtda-green hover:border-amtda-dark font-bold px-6 py-3.5 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amtda-green"
                >
                  Découvrir nos actions
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Dots indicators */}
              <div className="flex gap-2 pt-6" aria-label="Slide indicators">
                <span className="w-3 h-3 rounded-full bg-amtda-green" aria-current="true"></span>
                <span className="w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer"></span>
                <span className="w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer"></span>
                <span className="w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer"></span>
              </div>
            </div>

            {/* Right graphic column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative blob backgrounds */}
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-75"></div>
                
                {/* Main Child Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-100 transform hover:scale-[1.01] transition-transform duration-300">
                  <img
                    src="./assets/accu.jpg"
                    alt="Enfant stressé ayant des difficultés d'apprentissage scolaire"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                </div>

                {/* Overlaid Info Cards */}
                <div className="space-y-4 mt-6">
                  {/* Card 1 */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-slate-50 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-emerald-100 rounded-full text-amtda-green shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">10 à 13%</h3>
                      <p className="text-xs text-slate-500">des enfants présentent des troubles d'apprentissage</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-slate-50 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-orange-100 rounded-full text-amtda-orange shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">École spécialisée</h3>
                      <p className="text-xs text-slate-500">Ouverture prévue dès la prochaine rentrée</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-slate-50 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-emerald-100 rounded-full text-amtda-green shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Soutien & Accompagnement</h3>
                      <p className="text-xs text-slate-500">Pour un avenir meilleur de nos enfants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS TICKER */}
      <section className="bg-amtda-dark text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-amtda-green text-white font-extrabold px-4 py-2 rounded-lg text-lg sm:text-xl border border-emerald-400 shrink-0">
                1 enfant sur 10
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                est concerné par un trouble spécifique des apprentissages. <br className="hidden md:inline" />
                <span className="text-emerald-300">Ensemble, brisons l'ignorance et agissons !</span>
              </p>
            </div>
            <button
              onClick={() => setPage('learning-disorders')}
              className="bg-white hover:bg-emerald-50 text-amtda-dark hover:text-amtda-green px-5 py-2 rounded-lg font-bold text-sm transition-colors duration-300 shrink-0 border border-transparent shadow"
            >
              En savoir plus →
            </button>
          </div>
        </div>
      </section>

      {/* 3. DOMAIN SERVICE CARDS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-amtda-green flex items-center justify-center mb-5 group-hover:bg-amtda-green group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amtda-green transition-colors">Comprendre</h3>
              <p className="text-sm text-slate-500 mb-4">Informez-vous sur les différents troubles d'apprentissage</p>
              <button onClick={() => setPage('learning-disorders')} className="text-amtda-green group-hover:text-amtda-orange font-semibold text-sm flex items-center gap-1 transition-colors">
                En savoir plus <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-amtda-orange flex items-center justify-center mb-5 group-hover:bg-amtda-orange group-hover:text-white transition-colors duration-300">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amtda-orange transition-colors">Accompagner</h3>
              <p className="text-sm text-slate-500 mb-4">Conseils et solutions pour les parents et enseignants</p>
              <button onClick={() => setPage('about')} className="text-amtda-orange group-hover:text-amtda-green font-semibold text-sm flex items-center gap-1 transition-colors">
                En savoir plus <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-amtda-green flex items-center justify-center mb-5 group-hover:bg-amtda-green group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amtda-green transition-colors">Ressources</h3>
              <p className="text-sm text-slate-500 mb-4">Guides, fiches pratiques et outils pédagogiques</p>
              <button onClick={() => setPage('resources')} className="text-amtda-green group-hover:text-amtda-orange font-semibold text-sm flex items-center gap-1 transition-colors">
                En savoir plus <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-amtda-orange flex items-center justify-center mb-5 group-hover:bg-amtda-orange group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amtda-orange transition-colors">Sensibiliser</h3>
              <p className="text-sm text-slate-500 mb-4">Agir ensemble pour changer le regard sur ces troubles</p>
              <button onClick={() => setPage('actions')} className="text-amtda-orange group-hover:text-amtda-green font-semibold text-sm flex items-center gap-1 transition-colors">
                En savoir plus <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-amtda-green flex items-center justify-center mb-5 group-hover:bg-amtda-green group-hover:text-white transition-colors duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amtda-green transition-colors">Soutenir</h3>
              <p className="text-sm text-slate-500 mb-4">Vos dons font la différence pour nos enfants</p>
              <button onClick={() => setPage('donate')} className="text-amtda-green group-hover:text-amtda-orange font-semibold text-sm flex items-center gap-1 transition-colors">
                En savoir plus <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. JEUX SERIEUX & APPLICATIONS LUDO-EDUCATIVES - COMPACTED & MINIMIZED FOOTPRINT */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/20 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-100/60 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left visual compact tablet representation with smart concentric pulse rings */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative p-2 bg-slate-900 rounded-[28px] shadow-lg border-2 border-slate-800 w-48 shrink-0">
                  <div className="bg-emerald-950 rounded-[20px] overflow-hidden aspect-square flex flex-col items-center justify-center relative text-white p-4">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400')" }}></div>
                    
                    {/* Pulsing smart concentric target waves */}
                    <div className="absolute w-16 h-16 rounded-full bg-amtda-orange/15 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-amtda-orange/40"
                        animate={{ scale: [1, 1.7], opacity: [0.8, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border border-amtda-orange/20"
                        animate={{ scale: [1, 2.3], opacity: [0.5, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                      />
                    </div>

                    <motion.div
                      className="relative z-10 mb-2 p-2 bg-slate-950/70 rounded-xl border border-white/10"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      whileHover={{ 
                        scale: 1.18, 
                        rotate: 15,
                        transition: { duration: 0.2 }
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3.5, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Laptop className="w-8 h-8 text-amtda-orange" />
                    </motion.div>

                    <span className="font-bold text-[11px] text-center relative z-10 leading-snug">Jeux Interactifs</span>
                    <span className="text-[9px] text-emerald-300 mt-1 relative z-10 bg-black/40 px-2 py-0.5 rounded-full">Ludo-Éducatif</span>
                  </div>
                </div>
              </div>

              {/* Right content & compact grid */}
              <div className="lg:col-span-9 space-y-4">
                <div className="space-y-1">
                  <span className="text-amtda-orange text-[10px] font-black tracking-widest uppercase">Technologie inclusive</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Jeux sérieux & Applications ludo-éducatives
                  </h2>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  Découvrez une sélection d'outils numériques amusants et pédagogiques pour apprendre autrement. Ces jeux interactifs stimulent l'attention, la lecture, le calcul et d'autres compétences de manière stimulante et rassurante.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  {/* Badge 1 */}
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5 shadow-sm">
                    <GlassIcon icon={Gamepad2} color="emerald" size="sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Apprendre</h4>
                      <p className="text-[9px] text-slate-400">En s'amusant</p>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5 shadow-sm">
                    <GlassIcon icon={Target} color="rose" size="sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Développer</h4>
                      <p className="text-[9px] text-slate-400">Les acquis</p>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5 shadow-sm">
                    <GlassIcon icon={TrendingUp} color="blue" size="sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Suivre</h4>
                      <p className="text-[9px] text-slate-400">Les progrès</p>
                    </div>
                  </div>

                  {/* Badge 4 */}
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5 shadow-sm">
                    <GlassIcon icon={Shield} color="amber" size="sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[11px] leading-tight">Sécurisé</h4>
                      <p className="text-[9px] text-slate-400">Pour l'enfant</p>
                    </div>
                  </div>

                </div>

                <div className="pt-2 flex">
                  <button
                    onClick={() => setPage('resources')}
                    className="bg-amtda-orange hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center gap-1.5 text-xs transform hover:-translate-y-0.5 focus:outline-none cursor-pointer"
                  >
                    Découvrir les jeux & applications
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. QUI SOMMES-NOUS ? SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Row */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="./assets/qui.jpg"
                  alt="Élèves souriants montrant les pouces vers le haut"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500 rounded-full opacity-10 blur-xl"></div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-amtda-green font-bold text-sm tracking-wider uppercase block">Notre histoire</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Qui sommes-nous ?</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                L'Association Marocaine des Troubles et Difficultés d'Apprentissage (AMTDA) œuvre depuis 2010 pour la reconnaissance des troubles d'apprentissage et l'amélioration de la prise en charge des enfants concernés au Maroc.
              </p>
              
              <ul className="space-y-2.5 text-sm font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-amtda-green flex items-center justify-center text-xs">✓</span>
                  Sensibilisation et formation des enseignants et parents
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-amtda-green flex items-center justify-center text-xs">✓</span>
                  Dépistage et orientation des enfants
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-amtda-green flex items-center justify-center text-xs">✓</span>
                  Plaidoyer pour les droits des enfants
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-amtda-green flex items-center justify-center text-xs">✓</span>
                  Partenariats et actions de terrain
                </li>
              </ul>
              
              <div className="pt-2">
                <button
                  onClick={() => setPage('about')}
                  className="text-amtda-green hover:text-amtda-orange font-bold text-sm flex items-center gap-1.5 group transition-colors focus:outline-none"
                >
                  Lire notre historique complet
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Quote block */}
            <div className="lg:col-span-3">
              <div className="relative bg-white p-8 rounded-2xl border-2 border-dashed border-emerald-200 shadow-md">
                <span className="absolute -top-5 left-6 text-7xl font-serif text-emerald-200 select-none">“</span>
                <div className="relative z-10 space-y-4">
                  {/* Styled AMTDA Logo Label */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amtda-orange"></span>
                    <span className="text-xs font-black text-slate-800 tracking-wider">AMTDA MAROC</span>
                  </div>
                  <p className="text-slate-700 font-medium italic text-sm leading-relaxed">
                    L'éducation et le développement de l'enfant est toujours le centre de nos préoccupations.
                  </p>
                  <span className="block text-right text-7xl font-serif text-emerald-200 select-none -mb-8">”</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
