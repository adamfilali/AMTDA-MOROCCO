import { useState } from 'react';
import { HelpCircle, RefreshCw, Printer, AlertCircle, FileText, CheckCircle, Info, Star, ShieldAlert } from 'lucide-react';
import { playChime } from './AudioPlayer';
import { Language } from '../types';

interface EvaluationSectionProps {
  onPrintReport: () => void;
  lang: Language;
}

export default function EvaluationSection({ onPrintReport, lang }: EvaluationSectionProps) {
  const [step, setStep] = useState<number>(0); // 0: intro, 1..7: tests, 8: results
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Test answers and scores
  const [scoreLetters, setScoreLetters] = useState<number>(0);
  const [scoreFocus, setScoreFocus] = useState<number>(0);
  const [scoreMath, setScoreMath] = useState<number>(0);
  const [scorePhonetics, setScorePhonetics] = useState<number>(0);
  const [scoreSequence, setScoreSequence] = useState<number>(0);
  const [scoreMemory, setScoreMemory] = useState<number>(0);
  const [scoreSpatial, setScoreSpatial] = useState<number>(0);

  // Help guides for sub-tests
  const helpGuides = {
    letters: {
      title: { fr: "Test d'Inversion Visuelle (b/d et p/q)", en: "Visual Inversion Test (b/d and p/q)", zh: "视觉反转测试 (b/d 和 p/q)" },
      text: { 
        fr: "Ce test évalue la tendance à confondre des lettres symétriques en miroir. C'est une difficulté classique liée aux troubles dyslexiques.",
        en: "This test evaluates the tendency to confuse mirrored letters. This is a classic sign associated with dyslexic disorders.",
        zh: "此测试评估混淆镜像对称字母的倾向。这是与阅读障碍相关的经典体征。"
      }
    },
    phonetics: {
      title: { fr: "Discrimination Phonologique", en: "Phonological Discrimination", zh: "语音辨别能力" },
      text: {
        fr: "Mesure la conscience phonologique et la capacité à identifier des structures de rimes orales, essentielle pour l'acquisition de la lecture.",
        en: "Measures phonological awareness and the ability to identify oral rhyme structures, essential for reading acquisition.",
        zh: "测量语音意识和识别口头韵律结构的能力，这对于阅读习得至关重要。"
      }
    },
    sequence: {
      title: { fr: "Logique Séquentielle", en: "Sequential Logic", zh: "顺序逻辑思维" },
      text: {
        fr: "Évalue l'organisation cognitive spatio-temporelle et le repérage de rythmes répétitifs.",
        en: "Evaluates spatio-temporal cognitive organization and the identification of repetitive rhythms.",
        zh: "评估时空认知组织和重复节奏的识别。"
      }
    }
  };

  // Test 1: Letter confusions (p/q and b/d)
  const [lettersSelections, setLettersSelections] = useState<number[]>([]);
  const letterQuestions = [
    { text: "Sélectionnez toutes les lettres 'd' (évitez les 'b')", options: ['b', 'd', 'b', 'd', 'b', 'd', 'b', 'b', 'd'], correct: [1, 3, 5, 8] },
    { text: "Sélectionnez toutes les lettres 'q' (évitez les 'p')", options: ['p', 'q', 'p', 'p', 'q', 'p', 'q', 'p', 'q'], correct: [1, 4, 6, 8] }
  ];

  // Test 2: Concentration & Intruder find
  const focusSymbols = ['★', '★', '★', '☆', '★', '★', '★', '★', '★', '★', '★', '★'];
  const focusCorrectIdx = 3;

  // Test 3: Math counting (Subitizing)
  const [mathInput, setMathInput] = useState<number | null>(null);
  const mathCorrectAns = 7;

  // Test 4: Phonological Rhyme Test
  const [phoneticInput, setPhoneticInput] = useState<string | null>(null);
  const phoneticCorrect = "Bateau";
  const phoneticOptions = ["Soleil", "Fleur", "Bateau", "Maison"];

  // Test 5: Sequential Pattern Test
  const [sequenceInput, setSequenceInput] = useState<string | null>(null);
  const sequenceCorrect = "🟥";
  const sequenceOptions = ["🟥", "🟡", "🔺", "🟩"];

  // Test 6: Working Memory Number Recall
  const [memoryInput, setMemoryInput] = useState<number | null>(null);
  const memoryCorrect = 4;
  const memoryOptions = [3, 4, 7, 8];

  // Test 7: Spatial Orientation Arrows
  const [spatialInput, setSpatialInput] = useState<string | null>(null);
  const spatialCorrect = "↑";
  const spatialOptions = ["➔", "↑", "➘", "⬅"];

  const startEvaluation = () => {
    playChime('click');
    setStep(1);
    setLettersSelections([]);
    setMathInput(null);
    setPhoneticInput(null);
    setSequenceInput(null);
    setMemoryInput(null);
    setSpatialInput(null);
  };

  const handleLetterClick = (idx: number) => {
    playChime('hover');
    if (lettersSelections.includes(idx)) {
      setLettersSelections(lettersSelections.filter(i => i !== idx));
    } else {
      setLettersSelections([...lettersSelections, idx]);
    }
  };

  const submitStep1 = () => {
    const correctAnswers = [1, 3, 5, 8, 10, 13, 15, 17]; // offset second question by 9
    const correctCount = lettersSelections.filter(sel => correctAnswers.includes(sel)).length;
    const incorrectCount = lettersSelections.filter(sel => !correctAnswers.includes(sel)).length;
    const finalLettersScore = Math.max(0, Math.min(10, Math.round((correctCount - incorrectCount) * 1.25)));
    setScoreLetters(finalLettersScore);
    playChime('success');
    setStep(2);
  };

  const selectIntruder = (idx: number) => {
    if (idx === focusCorrectIdx) {
      setScoreFocus(10);
      playChime('success');
    } else {
      setScoreFocus(3);
      playChime('fail');
    }
    setStep(3);
  };

  const submitMathTest = () => {
    if (mathInput === mathCorrectAns) {
      setScoreMath(10);
      playChime('success');
    } else {
      setScoreMath(4);
      playChime('fail');
    }
    setStep(4);
  };

  const submitPhoneticTest = () => {
    if (phoneticInput === phoneticCorrect) {
      setScorePhonetics(10);
      playChime('success');
    } else {
      setScorePhonetics(3);
      playChime('fail');
    }
    setStep(5);
  };

  const submitSequenceTest = () => {
    if (sequenceInput === sequenceCorrect) {
      setScoreSequence(10);
      playChime('success');
    } else {
      setScoreSequence(3);
      playChime('fail');
    }
    setStep(6);
  };

  const submitMemoryTest = () => {
    if (memoryInput === memoryCorrect) {
      setScoreMemory(10);
      playChime('success');
    } else {
      setScoreMemory(4);
      playChime('fail');
    }
    setStep(7);
  };

  const submitSpatialTest = () => {
    if (spatialInput === spatialCorrect) {
      setScoreSpatial(10);
      playChime('success');
    } else {
      setScoreSpatial(3);
      playChime('fail');
    }
    setStep(8);
  };

  const printReport = () => {
    onPrintReport();
    window.print();
  };

  const getGlobalDiagnostic = () => {
    const sum = scoreLetters + scoreFocus + scoreMath + scorePhonetics + scoreSequence + scoreMemory + scoreSpatial;
    const avg = sum / 7;
    if (avg >= 8) {
      return {
        tag: 'Excellente Maîtrise',
        desc: "Aucune difficulté cognitive ou d'apprentissage majeure n'a été détectée dans les tâches de base. Les compétences cognitives, spatiales, visuelles et numériques sont tout à fait équilibrées et solides.",
        color: 'text-emerald-600'
      };
    } else if (avg >= 5.5) {
      return {
        tag: 'Difficultés Légères',
        desc: "Quelques ralentissements, inversions ou légers manques d'attention observés. Un suivi d'entraînement cognitif par le jeu sérieux ou un accompagnement scolaire renforcé à l'école est recommandé.",
        color: 'text-sky-600'
      };
    } else {
      return {
        tag: 'Bilan Recommandé',
        desc: "Des indices notables d'inversion, de phonologie perturbée ou d'inattention ont été relevés durant les différents modules de dépistage. Nous vous recommandons vivement de réaliser un bilan d'orthophonie ou de psychomotricité approfondi auprès de nos spécialistes de l'AMTDA.",
        color: 'text-orange-600'
      };
    }
  };

  const diagnostic = getGlobalDiagnostic();

  return (
    <div className="bg-sky-50/50 rounded-3xl border border-sky-100/60 p-6 shadow-xl relative" id="evaluation-pole">
      {/* Help Guide Overlay */}
      {showHelp && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl p-8 z-20 flex flex-col justify-between border border-sky-200">
          <div>
            <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Info className="w-6 h-6 text-sky-500" />
              Informations & Pédagogie de l'évaluation
            </h4>
            <div className="space-y-4 mt-4 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Qu'est-ce que ce pôle d'évaluation ?</strong>
                <br />
                Il s'agit d'un simulateur de dépistage précoce d'indices de troubles d'apprentissage (Dyslexie, TDAH, Dyscalculie, Dyspraxie) conçu de manière rigoureuse pour les parents et enseignants.
              </p>
              <p>
                <strong>Méthodologie de notation :</strong>
                <br />
                Le système évalue la précision, la résistance aux distracteurs visuels, la structuration logique et séquentielle, ainsi que l'attention spatiale, puis génère des recommandations claires.
              </p>
            </div>
          </div>
          <button
            onClick={() => { playChime('click'); setShowHelp(false); }}
            className="self-end bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-xl text-xs transition-all cursor-pointer"
          >
            Fermer le guide
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-sky-800 font-sans tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-600" />
            Pôle d'Évaluation Automatique 📊
          </h3>
          <p className="text-xs text-sky-700/80 mt-1">
            Testez vos compétences et capacités d'apprentissage à travers 7 modules cognitifs en temps réel.
          </p>
        </div>
        <button
          onClick={() => { playChime('click'); setShowHelp(true); }}
          className="p-2 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" /> Guide d'évaluation
        </button>
      </div>

      {/* STEP 0: INTRO */}
      {step === 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-8 text-center max-w-xl mx-auto shadow-inner">
          <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Star className="w-7 h-7 text-sky-600 animate-pulse" />
          </div>
          <h4 className="text-base font-bold text-slate-800">Démarrer le bilan interactif ?</h4>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Ce test comporte désormais 7 modules complémentaires évaluant la distinguabilité visuelle, l'attention, la logique, la phonologie, la logique séquentielle, la mémoire immédiate et l'orientation spatiale.
          </p>
          <button
            onClick={startEvaluation}
            className="mt-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-8 rounded-xl text-xs transition-all shadow-md transform active:scale-95 cursor-pointer"
          >
            Lancer le test (7 modules) ➔
          </button>
        </div>
      )}

      {/* STEP 1: LETTERS TEST */}
      {step === 1 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-3 text-xs font-semibold text-slate-400">
            <span>Module 1/7: Distinguabilité Visuelle</span>
            <span className="text-sky-600 font-bold">⏱️ Temps de passage : 1m 30s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">{letterQuestions[0].text}</p>
          <div className="grid grid-cols-9 gap-1.5 mb-6 justify-center">
            {letterQuestions[0].options.map((char, idx) => {
              const isSelected = lettersSelections.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLetterClick(idx)}
                  className={`py-2 rounded-lg font-bold text-base transition-all cursor-pointer ${
                    isSelected ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">{letterQuestions[1].text}</p>
          <div className="grid grid-cols-9 gap-1.5 mb-6 justify-center">
            {letterQuestions[1].options.map((char, idx) => {
              const globalIdx = idx + 9;
              const isSelected = lettersSelections.includes(globalIdx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLetterClick(globalIdx)}
                  className={`py-2 rounded-lg font-bold text-base transition-all cursor-pointer ${
                    isSelected ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          <button
            onClick={submitStep1}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            Valider et Continuer ➔
          </button>
        </div>
      )}

      {/* STEP 2: CONCENTRATION INTRUDER TEST */}
      {step === 2 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 2/7: Attention Spatiale</span>
            <span className="text-sky-600 font-bold">⏱️ Temps de passage : 30s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-6">Trouvez et cliquez sur le symbole intrus caché le plus rapidement possible !</p>

          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto mb-6">
            {focusSymbols.map((sym, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectIntruder(idx)}
                className="py-3 bg-slate-50 border border-slate-200 hover:border-sky-500 rounded-xl text-xl text-slate-600 hover:text-sky-600 transition-all transform active:scale-95 cursor-pointer"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: MATH COUNTING TEST */}
      {step === 3 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 3/7: Logique & Quantité</span>
            <span className="text-sky-600 font-bold">⏱️ Temps de passage : 45s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">Combien d'étoiles vertes voyez-vous ci-dessous ? Répondez d'un coup d'œil !</p>

          <div className="flex flex-wrap justify-center gap-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 max-w-sm mx-auto mb-6 animate-pulse">
            {Array(mathCorrectAns).fill(0).map((_, i) => (
              <div key={i} className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                ★
              </div>
            ))}
          </div>

          <div className="flex gap-2 max-w-xs mx-auto mb-6">
            {[5, 6, 7, 8].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { playChime('click'); setMathInput(opt); }}
                className={`flex-1 py-2 border rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  mathInput === opt ? 'border-sky-600 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={submitMathTest}
            disabled={mathInput === null}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md disabled:bg-slate-300 cursor-pointer"
          >
            Continuer ➔
          </button>
        </div>
      )}

      {/* STEP 4: PHONETIC TEST (NEW) */}
      {step === 4 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 4/7: Discrimination Phonétique</span>
            <span className="text-sky-600 font-bold">⏱️ Temps de passage : 45s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">Quel mot rime parfaitement avec le mot "Château" ?</p>

          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mb-6">
            {phoneticOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { playChime('click'); setPhoneticInput(opt); }}
                className={`py-3 border rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  phoneticInput === opt ? 'border-sky-600 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={submitPhoneticTest}
            disabled={phoneticInput === null}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md disabled:bg-slate-300 cursor-pointer"
          >
            Continuer ➔
          </button>
        </div>
      )}

      {/* STEP 5: SEQUENTIAL LOGIC TEST (NEW) */}
      {step === 5 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 5/7: Logique Séquentielle</span>
            <span className="text-sky-600 font-bold">⏱️ Temps de passage : 1m 00s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">Quel symbole complète logiquement cette suite : 🟥 🟡 🟥 🟡 _ ?</p>

          <div className="flex justify-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/50 max-w-xs mx-auto mb-6">
            <span className="text-xl">🟥</span>
            <span className="text-xl">🟡</span>
            <span className="text-xl font-bold">🟥</span>
            <span className="text-xl">🟡</span>
            <span className="text-xl font-bold border-2 border-dashed border-sky-400 px-3 bg-white rounded-lg animate-pulse">?</span>
          </div>

          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
            {sequenceOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { playChime('click'); setSequenceInput(opt); }}
                className={`py-2 border rounded-xl text-lg transition-all cursor-pointer ${
                  sequenceInput === opt ? 'border-sky-600 bg-sky-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={submitSequenceTest}
            disabled={sequenceInput === null}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md disabled:bg-slate-300 cursor-pointer"
          >
            Continuer ➔
          </button>
        </div>
      )}

      {/* STEP 6: WORKING MEMORY RECALL TEST (NEW) */}
      {step === 6 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 6/7: Mémoire de Travail</span>
            <span className="text-[#0B722C] font-bold">⏱️ Temps de passage : 45s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">Quel chiffre est manquant dans cette suite ordonnée : 1, 2, 3, ?, 5, 6</p>

          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
            {memoryOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { playChime('click'); setMemoryInput(opt); }}
                className={`py-3 border rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  memoryInput === opt ? 'border-sky-600 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={submitMemoryTest}
            disabled={memoryInput === null}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md disabled:bg-slate-300 cursor-pointer"
          >
            Continuer ➔
          </button>
        </div>
      )}

      {/* STEP 7: SPATIAL ORIENTATION TEST (NEW) */}
      {step === 7 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-inner max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
            <span>Module 7/7: Orientation Spatiale</span>
            <span className="text-[#0B722C] font-bold">⏱️ Temps de passage : 30s</span>
          </div>

          <p className="text-xs text-slate-700 font-semibold mb-4">Laquelle de ces flèches pointe directement vers le HAUT ?</p>

          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
            {spatialOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { playChime('click'); setSpatialInput(opt); }}
                className={`py-3 border text-xl rounded-xl transition-all cursor-pointer ${
                  spatialInput === opt ? 'border-sky-600 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={submitSpatialTest}
            disabled={spatialInput === null}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md disabled:bg-slate-300 cursor-pointer"
          >
            Terminer le bilan et voir le bilan ➔
          </button>
        </div>
      )}

      {/* STEP 8: RESULT / CERTIFICATE */}
      {step === 8 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden" id="print-area">
          
          {/* Watermark Logo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-20 h-20 fill-emerald-600">
              <circle cx="50" cy="50" r="30" />
            </svg>
            <span className="font-sans font-semibold text-[9px] uppercase text-slate-800 tracking-wider">AMTDA MAROC</span>
          </div>

          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <div className="text-left">
              <span className="text-[9px] font-semibold uppercase text-sky-600 tracking-wider">Bilan d'Évaluation AMTDA</span>
              <h5 className="font-sans font-bold text-slate-800 text-base">Compte-rendu de Performance Cognitive</h5>
            </div>
            <button
              onClick={printReport}
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Imprimer / Partager
            </button>
          </div>

          {/* Diagnostic Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/80 mb-6 text-left">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Résultat global</span>
            <div className={`text-base font-bold mt-1 ${diagnostic.color}`}>{diagnostic.tag}</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{diagnostic.desc}</p>
          </div>

          {/* Scores Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-8">
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Inversion</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreLetters}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Attention</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreFocus}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Calcul</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreMath}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Phonologie</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scorePhonetics}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Séquences</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreSequence}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Mémoire</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreMemory}/10</span>
            </div>
            <div className="p-2 bg-sky-50/50 rounded-xl border border-sky-100/50 text-center">
              <span className="block text-[9px] text-slate-400 font-semibold uppercase leading-none mb-1">Spatial</span>
              <span className="text-base font-bold text-sky-700 font-mono">{scoreSpatial}/10</span>
            </div>
          </div>

          {/* Footer for print */}
          <div className="pt-4 border-t border-slate-100 text-slate-400 text-[9px] space-y-1">
            <p className="font-semibold text-slate-500">Document officiel généré par la Plateforme d'évaluation AMTDA</p>
            <p className="font-mono">Casablanca, Maroc - Tél: +212 (0) 5.22.01.34.44 / Email: contact@amtda.ma</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => { playChime('click'); setStep(0); }}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Recommencer un test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
