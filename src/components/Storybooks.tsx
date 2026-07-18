/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BookOpen, Play, ChevronLeft, ChevronRight, FileText, Download, Printer, Share2, Sparkles, Film, HelpCircle } from "lucide-react";
import { audioEffects } from "./AudioEffects";
import { Language } from "../types";

interface StorybookProps {
  currentLang: Language;
  appLogo?: string;
}

interface StoryPage {
  text: Record<Language, string>;
  illustration: string; // Base64 or Unsplash
}

export default function Storybooks({ currentLang, appLogo }: StorybookProps) {
  const [activeTab, setActiveTab] = useState<"stories" | "cartoons" | "magazines">("stories");
  const [selectedStory, setSelectedStory] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const storiesData = [
    {
      title: {
        FR: "Le Voyage Extraordinaire de Reda",
        AR: "رحلة رضا الرائعة والمميزة",
        EN: "Reda's Extraordinary Journey",
        ZH: "雷达的不凡之旅",
      },
      desc: {
        FR: "Un petit garçon de Casablanca qui transforme ses difficultés de lecture en super-pouvoirs.",
        AR: "طفل صغير من الدار البيضاء يحول صعوباته في القراءة إلى قوى خارقة مبهرة.",
        EN: "A young boy from Casablanca who transforms his reading struggles into superpowers.",
        ZH: "一个来自卡萨布兰卡的小男孩，将阅读困难转化为超凡能力的成长历程。",
      },
      coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
      pages: [
        {
          text: {
            FR: "Reda habite à Casablanca, près du Boulevard Afghanistan. C'est un garçon très créatif qui adore dessiner de magnifiques mosquées et des jardins fleuris. Mais à l'école, les lettres s'emmêlent dans sa tête comme des poissons dans un filet.",
            AR: "يعيش رضا في الدار البيضاء بالقرب من شارع أفغانستان. إنه طفل مبدع للغاية يعشق رسم المساجد الجميلة والحدائق الملونة. لكن في المدرسة، كانت الحروف تتشابك في ذهنه مثل الأسماك في الشبكة.",
            EN: "Reda lives in Casablanca, near Afghanistan Boulevard. He is a very creative boy who loves to draw beautiful mosques and gardens. But at school, letters get tangled in his head like fish in a net.",
            ZH: "雷达住在卡萨布兰卡阿富汗大道附近。他是个很有创造力的孩子，喜欢画漂亮的清真寺和盛开的花园。但在学校里，字母就像网里的鱼一样，在他的脑海中乱作一团。",
          },
          illustration: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop",
        },
        {
          text: {
            FR: "Un jour, son institutrice l'oriente vers l'AMTDA. Là-bas, une orthophoniste bienveillante nommée Leila l'accueille avec un grand sourire marocain. Elle lui montre que son cerveau fonctionne simplement différemment, comme un oiseau voyageur !",
            AR: "ذات يوم، وجهته معلمته إلى جمعية AMTDA. هناك، استقبلته أخصائية تقويم نطق لطيفة تدعى ليلى بابتسامة مغربية دافئة. وأوضحت له أن دماغه يعمل بطريقة مختلفة ومميزة فحسب، تماماً كالطائر المهاجر !",
            EN: "One day, his teacher refers him to AMTDA. There, a kind speech therapist named Leila welcomes him with a warm Moroccan smile. She explains that his brain simply works differently, like a beautiful migratory bird!",
            ZH: "一天，他的老师建议他去 AMTDA。在那里，一位名叫莱拉（Leila）的言语治疗师用热情的摩洛哥式微笑迎接了他。她向他解释，他的大脑只是工作方式与众不同，就像一只美丽的候鸟！",
          },
          illustration: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
        },
        {
          text: {
            FR: "Ensemble, grâce à des jeux amusants et des mosaïques multicolores, Reda apprend à apprivoiser les mots. Aujourd'hui, Reda lit de belles histoires à sa petite sœur sous la douce lumière du soleil de Casablanca. Chaque enfant mérite de réussir !",
            AR: "معاً، وبفضل ألعاب ممتعة وفسيفساء ملونة، تعلم رضا كيف يروض الكلمات ويصادقها. اليوم، يقرأ رضا قصصاً رائعة لأخته الصغيرة تحت أشعة شمس الدار البيضاء الدافئة. كل طفل يستحق النجاح !",
            EN: "Together, using fun games and multicolor mosaics, Reda learns to master words. Today, Reda reads beautiful stories to his little sister under the warm sun of Casablanca. Every child deserves to succeed!",
            ZH: "在一起，通过有趣的游戏和五彩缤纷的马赛克，雷达学会了驾驭词汇。今天，雷达在卡萨布兰卡温暖的阳光下给他的妹妹读着美丽的童话。每个孩子都值得拥有成功！",
          },
          illustration: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
        },
      ],
    },
    {
      title: {
        FR: "Amine et la Clé des Nombres",
        AR: "أمين ومفتاح الأرقام السحري",
        EN: "Amine and the Key of Numbers",
        ZH: "阿敏与数字之匙",
      },
      desc: {
        FR: "Une quête mathématique pour surmonter la dyscalculie avec l'aide des marchands du Souk.",
        AR: "مغامرة حسابية لتخطي صعوبات الرياضيات بمساعدة تجار السوق الطيبين.",
        EN: "A mathematical quest to overcome dyscalculia with the help of kind merchants in the Souk.",
        ZH: "在市集商人们的帮助下，克服计算障碍的数学探索之旅。",
      },
      coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
      pages: [
        {
          text: {
            FR: "Amine adore accompagner son père au marché aux fruits d'Agadir. Les étals débordent de délicieuses oranges parfumées. Pourtant, dès qu'il faut compter le prix ou rendre la monnaie, les chiffres dansent devant ses yeux comme des lucioles agitées.",
            AR: "يعشق أمين مرافق والده إلى سوق الفواكه في أكادير. الرفوف مليئة بالبرتقال اللذيذ الفواح. ومع ذلك، بمجرد أن يحاول حساب السعر أو إرجاع الصرف، ترقص الأرقام أمام عينيه مثل الفراشات المتحركة.",
            EN: "Amine loves joining his father at the Agadir fruit market. The stalls are packed with delicious oranges. But whenever he tries to count or manage coins, the numbers dance before his eyes like restless fireflies.",
            ZH: "阿敏喜欢和爸爸一起去阿加迪尔的水果市场。货摊上摆满了美味、香气扑鼻的橙子。然而，一到算价格或找零的时候，数字就在他的眼前乱晃，就像焦躁不安的萤火虫。",
          },
          illustration: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=600&auto=format&fit=crop",
        },
        {
          text: {
            FR: "Les spécialistes de l'AMTDA conçoivent pour Amine une méthode visuelle unique : au lieu d'écrire des équations froides, il regroupe des caisses d'oranges physiques. Il comprend ainsi la valeur des nombres d'une manière sensorielle et amusante.",
            AR: "صمم خبراء AMTDA لأمين طريقة بصرية فريدة ومبتكرة: بدلاً من المعادلات الجافة، يقوم بتجميع صناديق البرتقال الملموسة. هكذا، استوعب قيمة الأرقام بطريقة حسية مرحة وممتعة للغاية.",
            EN: "The specialists at AMTDA design a unique visual method for Amine: instead of cold equations, he groups boxes of physical oranges. Thus, he understands the value of numbers in a tactile and playful way.",
            ZH: "AMTDA 的专家们为阿敏设计了一种独特的视觉教学法：不写枯燥的算式，而是把一箱箱实物橙子进行分组。通过这种感官上的趣味互动，他终于理解了数字的真正含义。",
          },
          illustration: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
        },
      ],
    },
  ];

  const worksheets = [
    {
      id: "dys_ex1",
      title: {
        FR: "Fiche Exercice: Différencier b et d",
        AR: "ورقة عمل: التمييز بين الحروف المتشابهة",
        EN: "Worksheet: Differentiating b and d",
        ZH: "练习纸：区分字母 b 和 d",
      },
      category: "DYSLEXIA",
      description: {
        FR: "Une feuille d'entraînement pour aider le cerveau à orienter correctement les lettres.",
        AR: "تمارين وتدريبات مبسطة لمساعدة الدماغ على توجيه الحروف بشكل صحيح ومثالي.",
        EN: "A structured practice sheet to help the brain correctly orient mirroring letters.",
        ZH: "旨在帮助大脑正确辨识和定位镜像字母的练习。",
      },
      fileSize: "1.2 MB",
    },
    {
      id: "adhd_ex1",
      title: {
        FR: "Exercice: Labyrinthe de la Concentration",
        AR: "تدريب: متاهة التركيز والانتباه",
        EN: "Exercise: Concentration Labyrinth",
        ZH: "练习：专注力迷宫",
      },
      category: "ADHD",
      description: {
        FR: "Labyrinthes thématiques favorisant l'attention soutenue et la planification.",
        AR: "متاهات مدروسة بدقة لتعزيز التركيز والانتباه المستمر والتخطيط البصري.",
        EN: "Thematic labyrinths encouraging sustained attention and visual planning skills.",
        ZH: "有助于促进持续注意力和视觉规划能力的迷宫练习。",
      },
      fileSize: "850 KB",
    },
    {
      id: "calc_ex1",
      title: {
        FR: "Comptage Visuel: Les Dominos Magiques",
        AR: "الحساب البصري: الدومينو السحري",
        EN: "Visual Counting: Magic Dominoes",
        ZH: "视觉计数：魔法多米诺骨牌",
      },
      category: "DYSCALCULIA",
      description: {
        FR: "Exercice de subitisation par regroupements de points pour le calcul mental.",
        AR: "تمارين الحساب الذهني الفوري عبر تجميع النقاط والأشكال الهندسية.",
        EN: "Subitizing exercise using point grouping patterns to build mental math.",
        ZH: "通过圆点分组模型来训练即时心算和数量感知的练习。",
      },
      fileSize: "1.5 MB",
    },
  ];

  const handlePageNext = (max: number) => {
    audioEffects.playPop();
    if (currentPage < max - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePagePrev = () => {
    audioEffects.playPop();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStorySelect = (idx: number) => {
    audioEffects.playClick();
    setSelectedStory(idx);
    setCurrentPage(0);
  };

  const handlePrint = (title: string) => {
    audioEffects.playClick();
    // Simulate printing or trigger browser print
    window.print();
  };

  const handleDownload = (id: string) => {
    audioEffects.playSuccess();
    // Increment statistical counter in localstorage if needed
    const rawStats = localStorage.getItem("amtda_stats");
    if (rawStats) {
      const parsed = JSON.parse(rawStats);
      parsed.pdfDownloads = (parsed.pdfDownloads || 0) + 1;
      localStorage.setItem("amtda_stats", JSON.stringify(parsed));
    }
    alert(`Téléchargement de la ressource lancée ! (ID: ${id})`);
  };

  const activeStoryObj = storiesData[selectedStory];

  return (
    <div className="bg-gradient-to-br from-emerald-50/20 via-white to-orange-50/10 rounded-3xl p-6 md:p-8 border border-emerald-800/10 shadow-lg mt-8" id="storybooks-magazines-section">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-150 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">
            Ressources Culturelles & Éducatives
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 font-sans tracking-tight">
            Contes, Dessins Animés & Magazines
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab("stories");
              audioEffects.playClick();
            }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all duration-250 ${
              activeTab === "stories" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Contes Interactifs
          </button>
          <button
            onClick={() => {
              setActiveTab("cartoons");
              audioEffects.playClick();
            }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all duration-250 ${
              activeTab === "cartoons" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dessins Animés
          </button>
          <button
            onClick={() => {
              setActiveTab("magazines");
              audioEffects.playClick();
            }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all duration-250 ${
              activeTab === "magazines" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Magazines & Fiches
          </button>
        </div>
      </div>

      {/* Tab Area Content */}
      <div className="mt-8">
        
        {/* STORIES TAB */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Story Selectors */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Choisir une histoire :</span>
              {storiesData.map((st, i) => (
                <button
                  key={i}
                  onClick={() => handleStorySelect(i)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex gap-4 ${
                    selectedStory === i
                      ? "bg-emerald-50/50 border-emerald-500 shadow-md"
                      : "bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <img
                    src={st.coverImage}
                    alt={st.title[currentLang]}
                    className="w-12 h-16 object-cover rounded-lg border shadow-sm flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs leading-tight line-clamp-1">
                      {st.title[currentLang]}
                    </h5>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {st.desc[currentLang]}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Book Reader Stage */}
            <div className="lg:col-span-8 bg-white border-2 border-emerald-800/10 rounded-3xl p-6 shadow-md flex flex-col md:flex-row gap-6 min-h-[300px]">
              
              {/* Left Column: Page Illustration */}
              <div className="md:w-1/2 aspect-[4/3] md:aspect-square bg-gray-50 rounded-2xl overflow-hidden border shadow-inner relative flex-shrink-0">
                <img
                  src={activeStoryObj.pages[currentPage].illustration}
                  alt="Page Illustration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/55 backdrop-blur-md text-[10px] text-white px-2.5 py-1 rounded-full font-mono">
                  Page {currentPage + 1} / {activeStoryObj.pages.length}
                </div>
              </div>

              {/* Right Column: Page Text and navigation controls */}
              <div className="md:w-1/2 flex flex-col justify-between items-stretch">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold tracking-widest uppercase">
                    Livre interactif
                  </span>
                  <h4 className="text-base font-bold text-gray-900 mt-1 font-sans">
                    {activeStoryObj.title[currentLang]}
                  </h4>
                  
                  {/* Page Text Area */}
                  <p className="text-xs text-gray-700 leading-relaxed font-medium mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200/60 shadow-inner">
                    {activeStoryObj.pages[currentPage].text[currentLang]}
                  </p>
                </div>

                {/* Turn page actions */}
                <div className="flex justify-between items-center mt-6 border-t border-gray-100 pt-4">
                  <button
                    onClick={handlePagePrev}
                    disabled={currentPage === 0}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <span className="text-xs font-mono font-bold text-gray-500">
                    {currentPage + 1} / {activeStoryObj.pages.length}
                  </span>

                  <button
                    onClick={() => handlePageNext(activeStoryObj.pages.length)}
                    disabled={currentPage === activeStoryObj.pages.length - 1}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CARTOONS TAB */}
        {activeTab === "cartoons" && (
          <div className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-950 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Media Player Deck */}
              <div className="lg:col-span-7 bg-black aspect-video rounded-2xl overflow-hidden border border-white/5 relative flex items-center justify-center group shadow-2xl">
                {/* Simulated cartoon placeholder screen */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-zinc-950 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Screen elements overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10 text-[10px] text-white">
                  <Film className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>Série DYS-Maroc • Épisode 1: "Mon école m'accompagne"</span>
                </div>

                <button
                  onClick={() => {
                    audioEffects.playClick();
                    alert("Lecture de la vidéo d'explication de l'AMTDA lancée dans le local !");
                  }}
                  className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 hover:scale-110 active:scale-90 text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-emerald-500/20 z-10 cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>
              </div>

              {/* Episode Info / Guide */}
              <div className="lg:col-span-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                  Dessins animés de sensibilisation
                </span>
                <h4 className="text-xl font-bold font-sans mt-2 tracking-tight">
                  La série "Nos Super-Pouvoirs"
                </h4>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  L'AMTDA produit des capsules vidéos et dessins animés adaptés à la culture marocaine actuelle, mettant en scène des situations de classe quotidiennes de nos enfants. 
                </p>
                
                <div className="space-y-3 mt-6 border-t border-white/5 pt-6">
                  <div className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <h5 className="text-xs font-bold text-gray-200">Épisode 1: La rentrée des classes de Sarah</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">Comprendre la dyslexie en classe primaire inclusif.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <h5 className="text-xs font-bold text-gray-200">Épisode 2: Le secret des chiffres d'Othmane</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">Dédramatiser la dyscalculie et le blocage des maths.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MAGAZINES TAB */}
        {activeTab === "magazines" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {worksheets.map((sheet) => (
              <div
                key={sheet.id}
                className="bg-white border-2 border-emerald-800/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {sheet.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{sheet.fileSize}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mt-3 leading-tight line-clamp-1">
                    {sheet.title[currentLang]}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                    {sheet.description[currentLang]}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 border-t border-gray-50 pt-4">
                  <button
                    onClick={() => handleDownload(sheet.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </button>
                  
                  <button
                    onClick={() => handlePrint(sheet.title[currentLang])}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all"
                    title="Imprimer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => alert(`Partagez cette ressource: ${sheet.title[currentLang]}`)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all"
                    title="Partager"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CRITICAL WATERMARK: watermark print overlay on documents */}
        <div className="hidden print:flex flex-col items-center justify-center mt-12 border-t pt-4" id="amtda-library-print-watermark">
          <div className="opacity-25 w-12 h-12 flex items-center justify-center overflow-hidden mb-1">
            <img src={appLogo || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23ffffff'/><circle cx='50' cy='50' r='44' fill='none' stroke='%23059669' stroke-width='6'/><path d='M30 65 C 30 40, 70 40, 70 65' fill='none' stroke='%23ea580c' stroke-width='6' stroke-linecap='round'/><circle cx='50' cy='32' r='12' fill='%23ea580c'/><path d='M42 45 Q 50 49 58 45' fill='none' stroke='%23059669' stroke-width='4' stroke-linecap='round'/><path d='M32 58 L 42 52' fill='none' stroke='%23059669' stroke-width='4' stroke-linecap='round'/><path d='M68 58 L 58 52' fill='none' stroke='%23059669' stroke-width='4' stroke-linecap='round'/><polygon points='45,15 55,15 50,5' fill='%2310b981'/></svg>"} alt="Logo AMTDA" className="max-w-full max-h-full object-contain filter grayscale" />
          </div>
          <div className="text-center">
            <span className="text-[8px] font-extrabold text-gray-500 font-sans tracking-tight block">
              Association Marocaine des Troubles et Difficultés d'Apprentissage (AMTDA)
            </span>
            <div className="flex justify-center gap-3 text-[7px] text-gray-400 mt-0.5 font-mono">
              <span>Tél: +212 (0) 5.22.01.34.44 / +212 (0) 6.61.89.74.67</span>
              <span>Email: contact@amtda.ma</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
