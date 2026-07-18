/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Volume2, Award, Play, BookOpen, Star, RefreshCw, Languages, ChevronRight, CheckCircle, HelpCircle } from "lucide-react";
import { audioEffects } from "./AudioEffects";
import { Language } from "../types";

interface AudioLanguagesProps {
  currentLang: Language;
}

interface LanguageLesson {
  id: string;
  title: Record<Language, string>;
  icon: string;
  phrases: {
    native: string;
    romanized?: string;
    translation: Record<Language, string>;
  }[];
}

export default function AudioLanguages({ currentLang }: AudioLanguagesProps) {
  const [selectedTargetLang, setSelectedTargetLang] = useState<"ZH" | "FR" | "AR">("ZH");
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStep, setQuizStep] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Core Lesson Datasets
  const lessons: Record<"ZH" | "FR" | "AR", LanguageLesson[]> = {
    ZH: [
      {
        id: "zh_greetings",
        title: {
          FR: "Salutations en Chinois",
          AR: "التحيات باللغة الصينية",
          EN: "Greetings in Chinese",
          ZH: "中文问候语",
        },
        icon: "👋",
        phrases: [
          { native: "你好", romanized: "Nǐ hǎo", translation: { FR: "Bonjour", AR: "مرحباً", EN: "Hello", ZH: "你好" } },
          { native: "谢谢", romanized: "Xièxie", translation: { FR: "Merci", AR: "شكراً", EN: "Thank you", ZH: "谢谢" } },
          { native: "再见", romanized: "Zàijiàn", translation: { FR: "Au revoir", AR: "إلى اللقاء", EN: "Goodbye", ZH: "再见" } },
          { native: "早上好", romanized: "Zǎoshang hǎo", translation: { FR: "Bon matin / Bonjour", AR: "صباح الخير", EN: "Good morning", ZH: "早上好" } },
          { native: "你叫什么名字？", romanized: "Nǐ jiào shénme míngzi?", translation: { FR: "Comment t'appelles-tu ?", AR: "ما اسمك؟", EN: "What is your name?", ZH: "你叫什么名字？" } },
        ],
      },
      {
        id: "zh_numbers",
        title: {
          FR: "Les Chiffres en Chinois (1-5)",
          AR: "الأرقام باللغة الصينية (1-5)",
          EN: "Numbers in Chinese (1-5)",
          ZH: "中文数字 (1-5)",
        },
        icon: "🔢",
        phrases: [
          { native: "一", romanized: "Yī", translation: { FR: "Un (1)", AR: "واحد (1)", EN: "One (1)", ZH: "一 (1)" } },
          { native: "二", romanized: "Èr", translation: { FR: "Deux (2)", AR: "اثنان (2)", EN: "Two (2)", ZH: "二 (2)" } },
          { native: "三", romanized: "Sān", translation: { FR: "Trois (3)", AR: "ثلاثة (3)", EN: "Three (3)", ZH: "三 (3)" } },
          { native: "四", romanized: "Sì", translation: { FR: "Quatre (4)", AR: "أربعة (4)", EN: "Four (4)", ZH: "四 (4)" } },
          { native: "五", romanized: "Wǔ", translation: { FR: "Cinq (5)", AR: "خمسة (5)", EN: "Five (5)", ZH: "五 (5)" } },
        ],
      },
      {
        id: "zh_school",
        title: {
          FR: "L'École et la Classe",
          AR: "المدرسة والصف",
          EN: "School & Classroom",
          ZH: "学校和教室",
        },
        icon: "🎒",
        phrases: [
          { native: "老师", romanized: "Lǎoshī", translation: { FR: "Maître / Enseignant", AR: "معلم / أستاذ", EN: "Teacher", ZH: "老师" } },
          { native: "学生", romanized: "Xuéshēng", translation: { FR: "Élève / Étudiant", AR: "تلميذ / طالب", EN: "Student", ZH: "学生" } },
          { native: "书包", romanized: "Shūbāo", translation: { FR: "Sac à dos", AR: "محفظة مدرسية", EN: "Schoolbag", ZH: "书包" } },
        ],
      },
    ],
    FR: [
      {
        id: "fr_greetings",
        title: {
          FR: "Formules de Politesse en Français",
          AR: "عبارات اللياقة بالفرنسية",
          EN: "French Politeness",
          ZH: "法语礼貌用语",
        },
        icon: "🤝",
        phrases: [
          { native: "S'il vous plaît", translation: { FR: "S'il vous plaît", AR: "من فضلك", EN: "Please", ZH: "请" } },
          { native: "Merci beaucoup", translation: { FR: "Merci beaucoup", AR: "شكراً جزيلاً", EN: "Thank you very much", ZH: "非常感谢" } },
          { native: "Enchanté", translation: { FR: "Enchanté de vous rencontrer", AR: "تشرفت بمعرفتك", EN: "Nice to meet you", ZH: "幸会" } },
          { native: "Bonne journée", translation: { FR: "Bonne journée", AR: "طاب يومك", EN: "Have a nice day", ZH: "祝你快乐" } },
          { native: "Excusez-moi", translation: { FR: "Excusez-moi", AR: "معذرة / اعذرني", EN: "Excuse me", ZH: "打扰一下" } },
        ],
      },
      {
        id: "fr_politeness_advanced",
        title: {
          FR: "Expressions Clés de Bienveillance",
          AR: "تعبيرات المودة واللطف",
          EN: "Kindness & Empathy Keys",
          ZH: "善意与同理心表达",
        },
        icon: "🌸",
        phrases: [
          { native: "Je vous en prie", translation: { FR: "Je vous en prie / De rien", AR: "على الرحب والسعة", EN: "You are welcome", ZH: "不客气" } },
          { native: "Prenez soin de vous", translation: { FR: "Prenez grand soin de vous", AR: "اعتني بنفسك جيداً", EN: "Take care of yourself", ZH: "照顾好自己" } },
          { native: "Avec grand plaisir", translation: { FR: "Avec grand plaisir", AR: "بكل سرور", EN: "With great pleasure", ZH: "十分乐意" } },
          { native: "Félicitations pour votre réussite", translation: { FR: "Félicitations pour votre réussite !", AR: "تهانينا على نجاحك المتميز !", EN: "Congratulations on your success!", ZH: "祝贺你取得成功！" } },
        ],
      },
      {
        id: "fr_colors",
        title: {
          FR: "Les Couleurs Essentielles",
          AR: "الألوان الأساسية",
          EN: "Essential Colors",
          ZH: "基础颜色",
        },
        icon: "🎨",
        phrases: [
          { native: "Rouge", translation: { FR: "Rouge", AR: "أحمر", EN: "Red", ZH: "红色" } },
          { native: "Vert", translation: { FR: "Vert", AR: "أخضر", EN: "Green", ZH: "绿色" } },
          { native: "Bleu", translation: { FR: "Bleu", AR: "أزرق", EN: "Blue", ZH: "蓝色" } },
          { native: "Jaune", translation: { FR: "Jaune", AR: "أصفر", EN: "Yellow", ZH: "黄色" } },
          { native: "Orange", translation: { FR: "Orange", AR: "برتقali", EN: "Orange", ZH: "橙色" } },
        ],
      },
    ],
    AR: [
      {
        id: "ar_greetings",
        title: {
          FR: "Bienvenue en Arabe",
          AR: "الترحيب والتحية بالعربية",
          EN: "Arabic Greetings",
          ZH: "阿拉伯语问候",
        },
        icon: "🕌",
        phrases: [
          { native: "السلام عليكم", romanized: "Assalamu Alaykum", translation: { FR: "Que la paix soit sur vous", AR: "السلام عليكم", EN: "Peace be upon you", ZH: "愿平安与你同在" } },
          { native: "أهلاً وسهلاً", romanized: "Ahlan wa sahlan", translation: { FR: "Bienvenue", AR: "أهلاً وسهلاً", EN: "Welcome", ZH: "欢迎" } },
          { native: "كيف حالك؟", romanized: "Kayfa haluk?", translation: { FR: "Comment vas-tu ?", AR: "كيف حالك؟", EN: "How are you?", ZH: "你好吗？" } },
          { native: "الحمد لله", romanized: "Alhamdulillah", translation: { FR: "Louange à Dieu", AR: "الحمد لله", EN: "Praise be to God", ZH: "感谢真主" } },
          { native: "مع السلامة", romanized: "Ma'a salama", translation: { FR: "Au revoir", AR: "مع السلامة", EN: "Goodbye", ZH: "再见" } },
        ],
      },
      {
        id: "ar_politeness",
        title: {
          FR: "Formules de Politesse en Arabe",
          AR: "عبارات اللياقة والأدب",
          EN: "Polite Expressions",
          ZH: "常用礼貌表达",
        },
        icon: "💝",
        phrases: [
          { native: "من فضلك", romanized: "Min fadlik", translation: { FR: "S'il vous plaît", AR: "من فضلك", EN: "Please", ZH: "请" } },
          { native: "شكرا جزيلا", romanized: "Shukran jazeelan", translation: { FR: "Merci beaucoup", AR: "شكراً جزيلاً", EN: "Thank you very much", ZH: "非常感谢" } },
          { native: "تفضل", romanized: "Tafaddal", translation: { FR: "Je vous en prie / Entrez", AR: "تفضل", EN: "Please come in / Go ahead", ZH: "请进" } },
          { native: "تشرفنا", romanized: "Tasharrafna", translation: { FR: "Enchanté de vous rencontrer", AR: "تشرفنا بمعرفتك", EN: "Nice to meet you", ZH: "幸会" } },
          { native: "على الرحب والسعة", romanized: "Alar-ruhb wa as-si'a", translation: { FR: "De rien", AR: "على الرحب والسعة", EN: "You are welcome", ZH: "不客气" } },
        ],
      },
      {
        id: "ar_feelings",
        title: {
          FR: "Les Émotions en Arabe",
          AR: "المشاعر والأحاسيس",
          EN: "Emotions in Arabic",
          ZH: "阿拉伯语情绪表达",
        },
        icon: "😊",
        phrases: [
          { native: "سعيد", romanized: "Sa'eed", translation: { FR: "Heureux / Joyeux", AR: "سعيد", EN: "Happy", ZH: "快乐" } },
          { native: "حزين", romanized: "Hazeen", translation: { FR: "Triste", AR: "حزين", EN: "Sad", ZH: "悲伤" } },
          { native: "قوي", romanized: "Qawiy", translation: { FR: "Fort", AR: "قوي", EN: "Strong", ZH: "强大" } },
          { native: "شجاع", romanized: "Shuja'a", translation: { FR: "Courageux", AR: "شجاع", EN: "Brave", ZH: "勇敢" } },
          { native: "مبدع", romanized: "Mubdi'a", translation: { FR: "Créatif", AR: "مبدع", EN: "Creative", ZH: "有创造力" } },
        ],
      },
    ],
  };

  const [showHelp, setShowHelp] = useState<boolean>(false);

  const handleSpeak = (text: string) => {
    audioEffects.playPop();
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    (window as any).__amtda_playing_deliberate_speech = true;

    const voices = window.speechSynthesis.getVoices();
    // Set voice locale based on chosen target language
    if (selectedTargetLang === "ZH") {
      utterance.lang = "zh-CN";
      const zhVoice = voices.find(v => v.lang.startsWith("zh") || v.name.includes("Chinese") || v.name.includes("Tingting"));
      if (zhVoice) utterance.voice = zhVoice;
    } else if (selectedTargetLang === "FR") {
      utterance.lang = "fr-FR";
      const frVoice = voices.find(v => v.lang.startsWith("fr") || v.name.includes("French") || v.name.includes("Thomas"));
      if (frVoice) utterance.voice = frVoice;
    } else if (selectedTargetLang === "AR") {
      utterance.lang = "ar-SA";
      const arVoice = voices.find(v => v.lang.startsWith("ar") || v.name.includes("Arabic") || v.name.includes("Maged") || v.name.includes("Laila"));
      if (arVoice) utterance.voice = arVoice;
    }

    utterance.rate = 0.75; // Slower, clear pronunciation pacing

    utterance.onend = () => {
      (window as any).__amtda_playing_deliberate_speech = false;
    };
    utterance.onerror = () => {
      (window as any).__amtda_playing_deliberate_speech = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Generate dynamic options for the current quiz question
  const currentLessonList = lessons[selectedTargetLang];
  const activeLesson = currentLessonList[activeLessonIdx] || currentLessonList[0];
  const currentQuizPhrase = activeLesson.phrases[quizStep];

  const triggerNextQuizStep = (isCorrect: boolean) => {
    if (isCorrect) {
      audioEffects.playSuccess();
      setQuizScore((prev) => prev + 10);
    } else {
      audioEffects.playClick();
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (quizStep < activeLesson.phrases.length - 1) {
        setQuizStep((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1200);
  };

  const startQuiz = () => {
    audioEffects.playClick();
    setQuizActive(true);
    setQuizScore(0);
    setQuizStep(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const currentPhraseTranslation = currentQuizPhrase?.translation[currentLang] || "";

  // Get random distractor options
  const getQuizOptions = () => {
    if (!currentQuizPhrase) return [];
    const correctAnswer = currentQuizPhrase.native;
    const allPhrasesInLesson = activeLesson.phrases.map((p) => p.native);
    const distractors = allPhrasesInLesson.filter((text) => text !== correctAnswer);

    // Shuffle and pick 2 distractors, combine with correct
    const options = [correctAnswer, ...distractors.slice(0, 2)].sort(() => Math.random() - 0.5);
    return options;
  };

  const quizOptions = getQuizOptions();

  return (
    <div className="bg-gradient-to-br from-emerald-50/10 via-white to-blue-50/10 rounded-3xl p-6 md:p-8 border border-emerald-800/10 shadow-lg mt-8" id="audio-learning-section">
      
      {/* COLLAPSIBLE HELP PANEL FOR AUDIO COURSES */}
      {showHelp && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 animate-fade-in flex gap-4 items-start text-xs text-emerald-950">
          <HelpCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold uppercase font-sans">Guide d'Apprentissage Linguistique Vocal</h4>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Cette application interactive est conçue spécifiquement pour stimuler la <strong>mémoire sensorielle auditive</strong> des enfants DYS. 
              Vous pouvez choisir une langue cible (Chinois, Français, Arabe marocain), sélectionner une leçon thématique sur la gauche, puis cliquer sur <strong>Écouter</strong>. 
              Une fois que vous maîtrisez le vocabulaire, relevez le défi du <strong>Quiz Vocal</strong> en cliquant sur le trophée !
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-150 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
              Apprentissage Linguistique Vocal
            </span>
            <button
              onClick={() => {
                audioEffects.playClick();
                setShowHelp(!showHelp);
              }}
              className="text-gray-400 hover:text-emerald-700 transition"
              title="Aide d'utilisation"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 font-sans tracking-tight">
            Cours de Langues Audio Inclusifs
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Découvrez le chinois, le français et l'arabe avec des voix authentiques pour enrichir votre vocabulaire de manière sensorielle.
          </p>
        </div>

        {/* Target language tabs */}
        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-200">
          <button
            onClick={() => {
              setSelectedTargetLang("ZH");
              setActiveLessonIdx(0);
              setQuizActive(false);
              audioEffects.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedTargetLang === "ZH" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🇨🇳 Chinois (中文)
          </button>
          <button
            onClick={() => {
              setSelectedTargetLang("FR");
              setActiveLessonIdx(0);
              setQuizActive(false);
              audioEffects.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedTargetLang === "FR" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🇫🇷 Français
          </button>
          <button
            onClick={() => {
              setSelectedTargetLang("AR");
              setActiveLessonIdx(0);
              setQuizActive(false);
              audioEffects.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedTargetLang === "AR" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🇲🇦 Arabe (العربية)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Lessons Selector */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
            Leçons Disponibles :
          </span>
          {lessons[selectedTargetLang].map((lesson, i) => (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLessonIdx(i);
                setQuizActive(false);
                audioEffects.playClick();
              }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                activeLessonIdx === i && !quizActive
                  ? "bg-emerald-50/50 border-emerald-500 shadow-sm"
                  : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl p-2 bg-gray-50 rounded-xl">{lesson.icon}</span>
              <div>
                <h5 className="font-bold text-gray-900 text-xs tracking-tight">
                  {lesson.title[currentLang]}
                </h5>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">
                  {lesson.phrases.length} phrases audio
                </p>
              </div>
            </button>
          ))}

          {/* Quiz Button */}
          <button
            onClick={startQuiz}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
              quizActive
                ? "bg-amber-50/50 border-amber-500 shadow-sm"
                : "bg-white border-gray-100 hover:bg-gray-50"
            }`}
          >
            <span className="text-2xl p-2 bg-amber-100 text-amber-600 rounded-xl">🏆</span>
            <div className="text-left">
              <h5 className="font-bold text-gray-900 text-xs tracking-tight">
                Défiez-vous ! (Quiz Vocal)
              </h5>
              <p className="text-[10px] text-amber-600 mt-0.5 font-bold">
                Évaluez vos acquis audio en direct
              </p>
            </div>
          </button>
        </div>

        {/* Right Column: Audio Stage Card */}
        <div className="lg:col-span-8">
          {!quizActive ? (
            <div className="bg-white border-2 border-emerald-800/10 rounded-3xl p-6 shadow-md">
              <div className="flex justify-between items-center border-b border-gray-150 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activeLesson.icon}</span>
                  <h4 className="font-bold text-sm text-gray-900 font-sans">
                    {activeLesson.title[currentLang]}
                  </h4>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Mode Apprentissage
                </span>
              </div>

              {/* Phrase Cards List */}
              <div className="space-y-4">
                {activeLesson.phrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 rounded-2xl p-4 border border-gray-200/60 hover:bg-emerald-50/10 transition-all gap-4"
                  >
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-lg font-extrabold text-emerald-950 font-sans select-all">
                          {phrase.native}
                        </span>
                        {phrase.romanized && (
                          <span className="text-xs font-semibold text-gray-400 font-mono">
                            [{phrase.romanized}]
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        Signification : <strong>{phrase.translation[currentLang]}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleSpeak(phrase.native)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2 px-4 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Écouter</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 border-2 border-amber-500/20 rounded-3xl p-6 shadow-md text-white min-h-[350px] flex flex-col justify-between">
              {quizCompleted ? (
                <div className="text-center py-8 flex flex-col items-center justify-center my-auto animate-fade-in">
                  <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-4">
                    <Award className="w-9 h-9" />
                  </div>
                  <h4 className="text-lg font-bold">Quiz Terminé !</h4>
                  <p className="text-xs text-gray-300 mt-2">
                    Excellent ! Vous avez validé les acquis de la leçon de{" "}
                    <strong>{selectedTargetLang === "ZH" ? "Chinois" : selectedTargetLang === "FR" ? "Français" : "Arabe"}</strong>.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mt-6 w-48 text-center font-mono text-xs">
                    Score Final: <strong className="text-amber-400 text-lg">{quizScore} pts</strong>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="mt-6 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-xl transition"
                  >
                    Recommencer le Quiz
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      Quiz d'Évaluation Vocale
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      Score: <strong className="text-amber-400">{quizScore} pts</strong>
                    </span>
                  </div>

                  {/* Question Area */}
                  <div className="text-center my-6">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">
                      CLIQUEZ SUR L'ICÔNE POUR ÉCOUTER LA PRONONCIATION :
                    </span>
                    <button
                      onClick={() => handleSpeak(currentQuizPhrase.native)}
                      className="w-16 h-16 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 active:scale-95 transition cursor-pointer group"
                    >
                      <Volume2 className="w-8 h-8 group-hover:scale-110 transition-all" />
                    </button>

                    <h5 className="text-sm text-gray-300 font-bold">
                      Quel mot ou phrase en {selectedTargetLang === "ZH" ? "Chinois" : selectedTargetLang === "FR" ? "Français" : "Arabe"} correspond à :
                    </h5>
                    <p className="text-xl font-extrabold text-amber-400 mt-2">
                      « {currentPhraseTranslation} »
                    </p>
                  </div>

                  {/* Answers Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {quizOptions.map((opt, oIdx) => {
                      const isCorrectAnswer = opt === currentQuizPhrase.native;
                      const isSelected = selectedAnswer === oIdx;

                      let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10";
                      if (selectedAnswer !== null) {
                        if (isCorrectAnswer) btnStyle = "bg-emerald-600 border-emerald-500 text-white";
                        else if (isSelected) btnStyle = "bg-red-600 border-red-500 text-white";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={selectedAnswer !== null}
                          onClick={() => {
                            setSelectedAnswer(oIdx);
                            triggerNextQuizStep(isCorrectAnswer);
                          }}
                          className={`p-4 rounded-xl border transition-all text-xs font-bold text-center cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quiz step indicators */}
                  <div className="mt-6 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>Progrès : {quizStep + 1} / {activeLesson.phrases.length}</span>
                    <span>Provinces du Sud • AMTDA Inclusif</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
