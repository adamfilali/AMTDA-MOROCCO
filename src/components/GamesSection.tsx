import { useState, useEffect } from 'react';
import { Brain, Sparkles, Award, RotateCcw, HelpCircle, CheckCircle, Volume2, Info } from 'lucide-react';
import { playChime, speakText } from './AudioPlayer';

interface GamesSectionProps {
  onGamePlay: (gameName: string) => void;
  lang: 'fr' | 'en' | 'zh';
}

export default function GamesSection({ onGamePlay, lang }: GamesSectionProps) {
  const [activeGame, setActiveGame] = useState<'memory' | 'unscramble' | 'math' | 'vocalQuiz'>('vocalQuiz');
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // GAME 1: Moroccan Memory Match State
  const moroccanSymbols = [
    { id: 1, icon: '🍵', name: { fr: 'Thé Marocain', ar: 'شاي مغربي', en: 'Moroccan Tea', zh: '摩洛哥茶' } },
    { id: 2, icon: '🍲', name: { fr: 'Tajine', ar: 'طاجين', en: 'Tajine', zh: '塔吉锅' } },
    { id: 3, icon: '🕌', name: { fr: 'Mosquée Koutoubia', ar: 'الكتبية', en: 'Koutoubia', zh: '库图比亚' } },
    { id: 4, icon: '🐪', name: { fr: 'Dromadaire', ar: 'جمل', en: 'Camel', zh: '骆驼' } },
    { id: 5, icon: '🪔', name: { fr: 'Lanterne', ar: 'فانوس', en: 'Lantern', zh: '灯笼' } },
    { id: 6, icon: '🇲🇦', name: { fr: 'Drapeau Marocain', ar: 'علم المغرب', en: 'Morocco Flag', zh: '摩洛哥国旗' } },
  ];

  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryWon, setMemoryWon] = useState(false);

  // GAME 2: Word Unscramble (Dyslexia Friendly)
  const educationalWords = [
    { word: 'ECOLE', scrambled: 'EELOC', hint: { fr: 'Lieu d\'apprentissage', ar: 'مكان التعلم', en: 'Learning place', zh: '学校' } },
    { word: 'LIVRE', scrambled: 'RVILE', hint: { fr: 'Contient des histoires', ar: 'يحتوي على قصص', en: 'Contains stories', zh: '书本' } },
    { word: 'AMTDA', scrambled: 'AADTM', hint: { fr: 'Notre association', ar: 'جمعيتنا', en: 'Our association', zh: '我们的协会' } },
    { word: 'BRAVO', scrambled: 'ORVAB', hint: { fr: 'Félicitations !', ar: 'تهانينا !', en: 'Congratulations!', zh: '太棒了' } },
    { word: 'MAROC', scrambled: 'RCMAO', hint: { fr: 'Notre cher pays', ar: 'بلدنا العزيز', en: 'Our dear country', zh: '我们的国家' } }
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [unscrambleInput, setUnscrambleInput] = useState<string[]>([]);
  const [unscrambleStatus, setUnscrambleStatus] = useState<'playing' | 'success' | 'fail'>('playing');

  // GAME 3: Math Quest (Dyscalculia Friendly - with visual counters/dots!)
  const [mathLevel, setMathLevel] = useState(1);
  const [mathNum1, setMathNum1] = useState(3);
  const [mathNum2, setMathNum2] = useState(2);
  const [mathOperator, setMathOperator] = useState<'+' | '-'>('+');
  const [mathOptions, setMathOptions] = useState<number[]>([]);
  const [mathFeedback, setMathFeedback] = useState<string>('');

  // GAME 4: "Défiez-vous!" Vocal Quiz State
  const [vocalQuizIndex, setVocalQuizIndex] = useState(0);
  const [vocalQuizScore, setVocalQuizScore] = useState(0);
  const [vocalQuizFeedback, setVocalQuizFeedback] = useState('');
  const [vocalQuizSelected, setVocalQuizSelected] = useState<number | null>(null);
  const [vocalQuizWon, setVocalQuizWon] = useState(false);

  const vocalQuizQuestions = [
    {
      id: 1,
      instruction: "Écoute attentivement le mot prononcé et trouve sa carte correspondante !",
      spoken: "Papillon",
      options: [
        { icon: "🍎", text: "Une Pomme" },
        { icon: "🦋", text: "Le Papillon" },
        { icon: "🚗", text: "Une Voiture" },
        { icon: "📖", text: "Le Livre" }
      ],
      correctIndex: 1,
      lang: 'fr' as const
    },
    {
      id: 2,
      instruction: "Écoute cette formule de politesse en Chinois et choisis la bonne traduction !",
      spoken: "谢谢",
      options: [
        { icon: "👋", text: "Bonjour, cher ami" },
        { icon: "🙏", text: "Merci beaucoup" },
        { icon: "🚪", text: "Au revoir, à bientôt" },
        { icon: "🏫", text: "L'école pour tous" }
      ],
      correctIndex: 1,
      lang: 'zh' as const
    },
    {
      id: 3,
      instruction: "Compte à l'écoute et clique sur la carte du bon nombre !",
      spoken: "Neuf",
      options: [
        { icon: "🌟", text: "7" },
        { icon: "🎱", text: "8" },
        { icon: "🍀", text: "9" },
        { icon: "💎", text: "10" }
      ],
      correctIndex: 2,
      lang: 'fr' as const
    },
    {
      id: 4,
      instruction: "Écoute le mot et trouve son orthographe parfaite !",
      spoken: "Éléphant",
      options: [
        { icon: "🐘", text: "ELEPHAN" },
        { icon: "🐘", text: "ELEPHANT" },
        { icon: "🐘", text: "ELEFTAN" },
        { icon: "🐘", text: "EPEHLANT" }
      ],
      correctIndex: 1,
      lang: 'fr' as const
    },
    {
      id: 5,
      instruction: "Écoute le célèbre proverbe de l'association et choisis sa signification !",
      spoken: "Vouloir c'est pouvoir",
      options: [
        { icon: "💪", text: "Le travail guérit tout" },
        { icon: "🤝", text: "L'union fait la force" },
        { icon: "✍️", text: "La volonté permet de surmonter tous les obstacles" },
        { icon: "🌳", text: "La patience mène au succès" }
      ],
      correctIndex: 2,
      lang: 'fr' as const
    }
  ];

  const gameGuides = {
    memory: {
      title: "🧩 Guide : Mémoire Maroc",
      text: "Stimule la mémoire de travail visuo-spatiale et l'attention sélective. Idéal pour canaliser l'impulsivité cognitive des enfants atteints de TDAH ou aider au repérage géométrique pour les dyspraxiques.",
      instructions: "Associez les paires d'icônes du patrimoine marocain. Essayez de mémoriser leurs positions !"
    },
    unscramble: {
      title: "✏️ Guide : Dys-Mots",
      text: "Aide à surmonter les inversions de syllabes fréquentes chez les dyslexiques. Manipuler virtuellement des lettres claires et bien espacées renforce la correspondance graphème-phonème.",
      instructions: "Écoutez le mot, lisez l'indice, puis tapez les lettres dans les cases pour reconstituer l'orthographe correcte."
    },
    math: {
      title: "🧮 Guide : Math-Vision",
      text: "Contre la dyscalculie. Les nombres abstraits sont remplacés par des jetons visuels colorés (subitizing), aidant l'enfant à ancrer le concept de quantité et de calcul (additions/soustractions).",
      instructions: "Comptez visuellement les groupes de fruits à gauche et à droite pour calculer le total demandé."
    },
    vocalQuiz: {
      title: "🎙️ Guide : Défiez-vous ! (Quiz Vocal)",
      text: "Renforce la discrimination phonologique et l'écoute active indispensable pour lutter contre les troubles de la parole (dysphasie) et de l'attention sélective.",
      instructions: "Cliquez sur le gros haut-parleur pour écouter le son ou le mot, puis choisissez l'image ou la carte correspondante."
    }
  };

  // INIT MEMORY GAME
  const initMemory = () => {
    const deck = [...moroccanSymbols, ...moroccanSymbols]
      .map((item, index) => ({ ...item, uniqueId: index }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMemoryMoves(0);
    setMemoryWon(false);
    onGamePlay('Memory Match');
  };

  useEffect(() => {
    if (activeGame === 'memory') {
      initMemory();
    } else if (activeGame === 'unscramble') {
      initUnscramble();
    } else if (activeGame === 'math') {
      initMath();
    } else if (activeGame === 'vocalQuiz') {
      initVocalQuiz();
    }
  }, [activeGame, wordIndex, mathLevel]);

  // CARD CLICK
  const handleCardClick = (uniqueId: number) => {
    if (flipped.length === 2 || matched.includes(uniqueId) || flipped.includes(uniqueId)) return;
    playChime('hover');

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(m => m + 1);
      const firstCard = cards.find(c => c.uniqueId === newFlipped[0]);
      const secondCard = cards.find(c => c.uniqueId === newFlipped[1]);

      if (firstCard.id === secondCard.id) {
        setMatched(prev => [...prev, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
        playChime('success');

        // Check overall win
        if (matched.length + 2 === cards.length) {
          setMemoryWon(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1200);
      }
    }
  };

  // INIT UNSCRAMBLE
  const initUnscramble = () => {
    const wordData = educationalWords[wordIndex];
    setUnscrambleInput(Array(wordData.word.length).fill(''));
    setUnscrambleStatus('playing');
    onGamePlay('Word Unscramble');
  };

  const checkUnscramble = () => {
    const answer = unscrambleInput.join('').toUpperCase();
    const target = educationalWords[wordIndex].word;
    if (answer === target) {
      setUnscrambleStatus('success');
      playChime('success');
    } else {
      setUnscrambleStatus('fail');
      playChime('fail');
    }
  };

  // INIT MATH QUEST (With additions/subtractions depending on levels for reflection/concentration)
  const initMath = () => {
    const op = mathLevel > 3 && Math.random() > 0.4 ? '-' : '+';
    setMathOperator(op);

    let n1 = 3;
    let n2 = 2;

    if (op === '+') {
      n1 = Math.floor(Math.random() * (mathLevel > 5 ? 10 : 5)) + 2;
      n2 = Math.floor(Math.random() * (mathLevel > 5 ? 8 : 4)) + 1;
    } else {
      n1 = Math.floor(Math.random() * (mathLevel > 5 ? 12 : 6)) + 5;
      n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
    }

    setMathNum1(n1);
    setMathNum2(n2);
    setMathFeedback('');

    const correctAnswer = op === '+' ? n1 + n2 : n1 - n2;
    const optionsSet = new Set<number>();
    optionsSet.add(correctAnswer);
    while (optionsSet.size < 4) {
      optionsSet.add(Math.max(1, correctAnswer + (Math.floor(Math.random() * 6) - 3)));
    }
    setMathOptions(Array.from(optionsSet).sort((a, b) => a - b));
    onGamePlay('Math Quest');
  };

  const handleMathAnswer = (ans: number) => {
    const correct = mathOperator === '+' ? mathNum1 + mathNum2 : mathNum1 - mathNum2;
    if (ans === correct) {
      setMathFeedback('Bravo ! Correct 🎉');
      playChime('success');
      setTimeout(() => {
        setMathLevel(prev => prev + 1);
      }, 1500);
    } else {
      setMathFeedback('Essaie encore ! Tu peux y arriver.');
      playChime('fail');
    }
  };

  // INIT VOCAL QUIZ
  const initVocalQuiz = () => {
    setVocalQuizIndex(0);
    setVocalQuizScore(0);
    setVocalQuizFeedback('');
    setVocalQuizSelected(null);
    setVocalQuizWon(false);
    onGamePlay('Défiez-vous ! Quiz Vocal');
  };

  const playVocalQuizPrompt = () => {
    const q = vocalQuizQuestions[vocalQuizIndex];
    speakText(q.spoken, q.lang);
  };

  const handleVocalQuizAnswer = (idx: number) => {
    if (vocalQuizSelected !== null) return;
    setVocalQuizSelected(idx);
    const q = vocalQuizQuestions[vocalQuizIndex];

    if (idx === q.correctIndex) {
      setVocalQuizScore(s => s + 1);
      setVocalQuizFeedback("Bravo ! C'est la bonne réponse ! 🎉");
      playChime('success');
    } else {
      setVocalQuizFeedback(`Oups ! La bonne réponse était "${q.options[q.correctIndex].text}".`);
      playChime('fail');
    }
  };

  const handleNextVocalQuiz = () => {
    if (vocalQuizIndex < vocalQuizQuestions.length - 1) {
      setVocalQuizIndex(i => i + 1);
      setVocalQuizSelected(null);
      setVocalQuizFeedback('');
    } else {
      setVocalQuizWon(true);
    }
  };

  // VOCAL HELPER
  const vocalizeWord = (word: string) => {
    speakText(word, lang);
  };

  return (
    <div className="bg-emerald-50/50 rounded-3xl border border-emerald-100/60 p-6 shadow-xl" id="jeux-educatifs">
      {/* Selection Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-emerald-800 font-sans tracking-tight flex items-center gap-2">
              <Brain className="w-7 h-7 text-emerald-600 animate-bounce" />
              Espace Jeux Sérieux Éducatifs 🎮
            </h3>
            <button
              onClick={() => { playChime('click'); setShowHelp(!showHelp); }}
              className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-full transition-all"
              title="Aide & Guide Pédagogique"
            >
              <HelpCircle className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
          <p className="text-sm text-emerald-700/80 mt-1">
            Jeux cognitifs interactifs sans publicité ni API, créés spécialement pour stimuler l'apprentissage.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-emerald-100/50 p-1.5 rounded-2xl border border-emerald-200">
          <button
            onClick={() => { playChime('click'); setActiveGame('vocalQuiz'); }}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'vocalQuiz' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-200/50'
            }`}
          >
            🎙️ Défiez-vous !
          </button>
          <button
            onClick={() => { playChime('click'); setActiveGame('memory'); }}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'memory' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-200/50'
            }`}
          >
            🧩 Mémoire Maroc
          </button>
          <button
            onClick={() => { playChime('click'); setActiveGame('unscramble'); }}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'unscramble' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-200/50'
            }`}
          >
            ✏️ Dys-Mots
          </button>
          <button
            onClick={() => { playChime('click'); setActiveGame('math'); }}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'math' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-200/50'
            }`}
          >
            🧮 Math-Vision
          </button>
        </div>
      </div>

      {/* RENDER DYS-GUIDE FOR ACTIVE GAME */}
      {showHelp && (
        <div className="mb-6 bg-emerald-100/60 border border-emerald-200 p-4 rounded-2xl animate-slide-up flex gap-3 text-left">
          <div className="p-2 bg-emerald-200/70 text-emerald-800 rounded-xl h-fit shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider text-emerald-900">{gameGuides[activeGame].title}</h4>
            <p className="text-xs text-emerald-950 mt-1 leading-relaxed">
              <b>Objectif Thérapeutique :</b> {gameGuides[activeGame].text}
            </p>
            <p className="text-xs text-emerald-800 font-bold mt-2">
              👉 Comment jouer : {gameGuides[activeGame].instructions}
            </p>
          </div>
        </div>
      )}

      {/* GAME 1: MEMORY MATCH */}
      {activeGame === 'memory' && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner text-center">
          <div className="mb-4 flex justify-between items-center px-4 max-w-lg mx-auto">
            <span className="text-slate-600 text-sm font-semibold">Moves: <b className="font-mono text-emerald-600">{memoryMoves}</b></span>
            <span className="text-slate-600 text-sm font-semibold">Matched: <b className="font-mono text-emerald-600">{matched.length / 2} / 6</b></span>
            <button onClick={initMemory} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all flex items-center gap-1 text-xs font-bold">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {memoryWon ? (
            <div className="py-12 max-w-sm mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Award className="w-12 h-12 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-black text-slate-800">Magnifique ! 🎉</h4>
              <p className="text-slate-500 text-sm mt-1">Vous avez terminé le jeu en seulement {memoryMoves} coups ! Votre mémoire est au top.</p>
              <button onClick={initMemory} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
                Rejouer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {cards.map((card) => {
                const isFlipped = flipped.includes(card.uniqueId) || matched.includes(card.uniqueId);
                return (
                  <div
                    key={card.uniqueId}
                    onClick={() => handleCardClick(card.uniqueId)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-4xl cursor-pointer select-none transition-all duration-300 border shadow-xs transform active:scale-95 ${
                      isFlipped 
                        ? 'bg-emerald-50 border-emerald-300 rotate-y-180 scale-100' 
                        : 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-700 hover:brightness-105 hover:-translate-y-1'
                    }`}
                  >
                    {isFlipped ? (
                      <div className="flex flex-col items-center">
                        <span>{card.icon}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase mt-1 leading-none">{card.name[lang] || card.name.fr}</span>
                      </div>
                    ) : (
                      <span className="text-3xl font-black text-emerald-100/40">🇲🇦</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 max-w-lg mx-auto flex items-start gap-2.5 text-left">
            <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <b>Guide Parent/Enseignant:</b> Ce jeu de mémoire stimule la mémoire de travail et l'attention visuelle sélective, particulièrement recommandé pour les enfants atteints de TDAH ou de Dyspraxie.
            </p>
          </div>
        </div>
      )}

      {/* GAME 2: WORD UNSCRAMBLE */}
      {activeGame === 'unscramble' && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner text-center max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400">Mot {wordIndex + 1} / 5</span>
            <button
              onClick={() => vocalizeWord(educationalWords[wordIndex].word)}
              className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
            >
              <Volume2 className="w-4 h-4 text-sky-600" /> Écouter le mot
            </button>
          </div>

          <div className="mb-4">
            <span className="text-xs text-slate-400 uppercase font-black tracking-wider block mb-1">Indice / Hint</span>
            <p className="text-slate-700 font-bold text-base bg-slate-50 py-2.5 px-4 rounded-xl inline-block border border-slate-100">
              {educationalWords[wordIndex].hint[lang] || educationalWords[wordIndex].hint.fr}
            </p>
          </div>

          {/* Dyslexia-friendly: giant boxes of scrambled letters */}
          <div className="flex justify-center gap-3 my-6">
            {educationalWords[wordIndex].scrambled.split('').map((letter, idx) => (
              <div key={idx} className="w-12 h-12 bg-indigo-50 border border-indigo-200/60 rounded-xl flex items-center justify-center font-bold text-2xl text-indigo-800 shadow-xs pointer-events-none">
                {letter}
              </div>
            ))}
          </div>

          {/* User Entry boxes */}
          <div className="flex justify-center gap-3 my-4">
            {unscrambleInput.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  const copy = [...unscrambleInput];
                  copy[idx] = val;
                  setUnscrambleInput(copy);
                  playChime('hover');

                  // Auto focus next
                  if (val && idx < unscrambleInput.length - 1) {
                    const next = document.getElementById(`letter-${idx + 1}`);
                    next?.focus();
                  }
                }}
                id={`letter-${idx}`}
                className="w-12 h-12 bg-white border-2 border-slate-300 rounded-xl text-center text-2xl font-black focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans outline-hidden uppercase transition-all shadow-xs"
              />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={checkUnscramble}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md"
            >
              Vérifier l'orthographe
            </button>
            {unscrambleStatus === 'success' && wordIndex < 4 && (
              <button
                onClick={() => {
                  playChime('click');
                  setWordIndex(w => w + 1);
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md"
              >
                Mot Suivant ➔
              </button>
            )}
            {unscrambleStatus === 'success' && wordIndex === 4 && (
              <div className="bg-emerald-100 border border-emerald-300 p-2 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Award className="w-4 h-4" /> Tout Réussi !
              </div>
            )}
          </div>

          {unscrambleStatus === 'success' && (
            <p className="mt-4 text-emerald-600 font-bold text-sm flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" /> Félicitations ! C'est le bon orthographe.
            </p>
          )}

          {unscrambleStatus === 'fail' && (
            <p className="mt-4 text-rose-500 font-bold text-sm">
              Oups ! Essaie encore de déplacer les lettres pour trouver le bon ordre.
            </p>
          )}

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-2.5 text-left text-xs text-slate-500">
            <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <b>Conception Dyslexique:</b> Utilise des lettres majuscules claires à fort contraste. La manipulation de lettres physiques aide à re-visualiser les séquences syllabiques pour lutter contre les inversions fréquentes.
            </p>
          </div>
        </div>
      )}

      {/* GAME 3: MATH QUEST */}
      {activeGame === 'math' && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner text-center max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400">Niveau {mathLevel}</span>
            <span className="text-xs font-bold text-emerald-600">Apprentissage Dyscalculie</span>
          </div>

          <h4 className="text-xl font-bold text-slate-700 font-sans mb-4">Combien d'objets au total ?</h4>

          {/* Visual Dyscalculia support: showing actual circles/dots to count! */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {/* Box 1 */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="block text-sm font-semibold text-emerald-800 mb-2">Groupe A ({mathNum1})</span>
              <div className="flex flex-wrap justify-center gap-2">
                {Array(mathNum1).fill(0).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-black animate-pulse shadow-xs">
                    🍎
                  </div>
                ))}
              </div>
            </div>

            {/* Operator */}
            <div className="col-span-2 flex items-center justify-center">
              <span className="text-3xl font-black text-slate-400">{mathOperator}</span>
            </div>

            {/* Box 2 */}
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
              <span className="block text-sm font-semibold text-sky-800 mb-2">Groupe B ({mathNum2})</span>
              <div className="flex flex-wrap justify-center gap-2">
                {Array(mathNum2).fill(0).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-[10px] font-black animate-pulse shadow-xs">
                    🍊
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question display */}
          <div className="text-3xl font-black text-slate-800 mb-6 font-mono">
            {mathNum1} {mathOperator} {mathNum2} = ?
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
            {mathOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleMathAnswer(opt)}
                className="py-3 px-4 bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-500 rounded-xl font-bold text-xl text-slate-700 transition-all transform active:scale-95 shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>

          {mathFeedback && (
            <p className={`mt-6 font-bold text-sm ${mathFeedback.includes('Bravo') ? 'text-emerald-600' : 'text-slate-500'}`}>
              {mathFeedback}
            </p>
          )}

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs text-slate-500 flex items-start gap-2.5">
            <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <b>Méthode Pédagogique:</b> Les enfants souffrant de dyscalculie ont du mal à abstraire les nombres. Fournir des contreparties visuelles concrètes (pommes, oranges) pour le comptage direct comble l'écart symbolique et encourage la réflexion.
            </p>
          </div>
        </div>
      )}

      {/* GAME 4: VOCAL QUIZ ("Défiez-vous !") */}
      {activeGame === 'vocalQuiz' && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner text-center max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400">Niveau {vocalQuizIndex + 1} / {vocalQuizQuestions.length}</span>
            <span className="text-xs font-bold text-emerald-600">Compréhension Auditive & Attention</span>
          </div>

          {vocalQuizWon ? (
            <div className="py-12 max-w-sm mx-auto flex flex-col items-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Award className="w-12 h-12 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-black text-slate-800">Félicitations ! 🏆</h4>
              <p className="text-slate-500 text-sm mt-1">Tu as terminé le quiz vocal "Défiez-vous !" avec un score de {vocalQuizScore} / {vocalQuizQuestions.length} !</p>
              <button onClick={initVocalQuiz} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md">
                Recommencer
              </button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <p className="text-slate-600 font-bold text-sm mb-4">
                {vocalQuizQuestions[vocalQuizIndex].instruction}
              </p>

              {/* Giant sound player icon */}
              <div className="flex flex-col items-center justify-center my-6">
                <button
                  onClick={playVocalQuizPrompt}
                  className="w-20 h-20 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-200 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Volume2 className="w-10 h-10 text-white" />
                </button>
                <span className="text-xs font-bold text-emerald-700 mt-3 animate-pulse">Clique pour Écouter ! 🗣️</span>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                {vocalQuizQuestions[vocalQuizIndex].options.map((opt, idx) => {
                  const isSelected = vocalQuizSelected === idx;
                  const isCorrect = idx === vocalQuizQuestions[vocalQuizIndex].correctIndex;
                  let cardStyle = "bg-white border-slate-200 text-slate-700 hover:border-emerald-300";
                  
                  if (vocalQuizSelected !== null) {
                    if (isSelected) {
                      cardStyle = isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm" : "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
                    } else if (isCorrect) {
                      cardStyle = "bg-emerald-50/70 border-emerald-300 text-emerald-800";
                    } else {
                      cardStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={vocalQuizSelected !== null}
                      onClick={() => handleVocalQuizAnswer(idx)}
                      className={`p-4 border-2 rounded-xl font-bold flex items-center gap-3 text-left transition-all shadow-xs ${cardStyle}`}
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="text-sm font-sans tracking-tight">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {vocalQuizFeedback && (
                <div className="mt-6 animate-slide-up">
                  <p className={`font-black text-sm ${vocalQuizFeedback.includes('Bravo') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {vocalQuizFeedback}
                  </p>
                  <button
                    onClick={handleNextVocalQuiz}
                    className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md inline-flex items-center gap-1.5 text-xs"
                  >
                    Suivant ➔
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs text-slate-500 flex items-start gap-2.5 font-sans">
            <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <b>Méthode Pédagogique:</b> Ce quiz vocal "Défiez-vous !" utilise des invites audio claires et à fort contraste phonétique pour forcer l'enfant à ralentir son impulsivité, écouter activement, et relier l'audio au graphisme/sens correct.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
