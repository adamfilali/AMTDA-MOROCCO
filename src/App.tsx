import React, { useState, useEffect } from 'react';
import { 
  Menu, X, BookOpen, Brain, FileText, MapPin, Phone, Mail, Award, 
  HelpCircle, ChevronRight, Download, Heart, Users, CheckCircle2, 
  MessageCircle, Star, ShieldCheck, Printer, ArrowRight, BookMarked, Image as ImageIcon, Send 
} from 'lucide-react';

import BackgroundUniverse from './components/BackgroundUniverse';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import { motion } from 'motion/react';
import GamesSection from './components/GamesSection';
import EvaluationSection from './components/EvaluationSection';
import LibrarySection from './components/LibrarySection';
import AdminPanel from './components/AdminPanel';
import GallerySection from './components/GallerySection';

import { Testimonial, GalleryItem, Article, ClickStats, Language, CultureItem } from './types';
import { playChime, startPhoneRing, stopPhoneRing, speakText } from './components/AudioPlayer';
import VirtualClassroom from './components/VirtualClassroom';

// STYLISH MULTI-LINGUAL DICTIONARY FOR COMPLETE LOCALIZATION
const translations = {
  fr: {
    title: "Association Marocaine des Troubles et Difficultés d'Apprentissage",
    subtitle: "Accompagner, diagnostiquer et intégrer chaque enfant présentant des troubles d'apprentissage pour bâtir un avenir inclusif.",
    navHome: "Accueil",
    navPathologies: "Difficultés",
    navServices: "Pôles d'aide",
    navGames: "Espace Jeux",
    navEvaluation: "Évaluation",
    navLibrary: "Bibliothèque",
    navGallery: "Galerie",
    navAdmin: "Administration",
    navVirtualClass: "Classe Virtuelle 🎥",
    statsChildren: "Enfants Accompagnés",
    statsCenters: "Centres Nationaux",
    statsSpecialists: "Spécialistes Formés",
    moreInfo: "En savoir plus",
    readMore: "Lire plus",
    getStarted: "Démarrer l'Évaluation",
    downloadCatalog: "Télécharger le Catalogue",
    contactTitle: "Contactez notre équipe",
    formName: "Nom complet",
    formEmail: "Adresse Email",
    formMsg: "Votre Message / Réclamation",
    formSubmit: "Envoyer le Formulaire",
    footerCopyright: "© 2026 AMTDA Maroc. Tous droits réservés. Association reconnue d'utilité publique.",
    pathologyTitle: "Comprendre les Troubles d'Apprentissage (Dys/TDAH)",
    successTitle: "Témoignages de Réussite"
  },
  ar: {
    title: "الجمعية المغربية لإضطرابات وصعوبات التعلم",
    subtitle: "مرافقة، تشخيص وإدماج كل طفل يعاني من صعوبات التعلم لبناء مستقبل شامل ودامج.",
    navHome: "الرئيسية",
    navPathologies: "الصعوبات",
    navServices: "أقطاب المساعدة",
    navGames: "فضاء الألعاب",
    navEvaluation: "التقييم الآلي",
    navLibrary: "المكتبة الرقمية",
    navGallery: "معرض الصور",
    navAdmin: "لوحة التحكم",
    navVirtualClass: "الصف الافتراضي 🎥",
    statsChildren: "طفل تم مرافقتهم",
    statsCenters: "مراكز وطنية",
    statsSpecialists: "أخصائيين تم تكوينهم",
    moreInfo: "اقرأ المزيد",
    readMore: "المزيد من التفاصيل",
    getStarted: "ابدأ التقييم الآن",
    downloadCatalog: "تحميل الدليل التربوي",
    contactTitle: "اتصل بنا",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formMsg: "رسالتكم أو استفساركم",
    formSubmit: "إرسال الطلب",
    footerCopyright: "© 2026 الجمعية المغربية لإضطرابات وصعوبات التعلم. جميع الحقوق محفوظة.",
    pathologyTitle: "فهم اضطرابات وصعوبات التعلم",
    successTitle: "قصص نجاح ملهمة"
  },
  en: {
    title: "Moroccan Association for Learning Disorders",
    subtitle: "Supporting, diagnosing, and integrating every child with learning disorders to build an inclusive future.",
    navHome: "Home",
    navPathologies: "Disorders",
    navServices: "Services",
    navGames: "Play Zone",
    navEvaluation: "Assessment",
    navLibrary: "Library",
    navGallery: "Gallery",
    navAdmin: "Admin Dashboard",
    navVirtualClass: "Virtual Class 🎥",
    statsChildren: "Children Supported",
    statsCenters: "National Centers",
    statsSpecialists: "Specialists Trained",
    moreInfo: "Learn More",
    readMore: "Read More",
    getStarted: "Start Assessment",
    downloadCatalog: "Download Handbook",
    contactTitle: "Contact Us",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Your Message / Query",
    formSubmit: "Submit Form",
    footerCopyright: "© 2026 AMTDA Morocco. All rights reserved. Public utility association.",
    pathologyTitle: "Understanding Learning Disorders (Dys/ADHD)",
    successTitle: "Success Stories"
  },
  zh: {
    title: "摩洛哥学习障碍与困难协会 (AMTDA)",
    subtitle: "支持、诊断和融入每一位有学习障碍 of 的儿童，共同创造包容、平等的未来。",
    navHome: "首页",
    navPathologies: "障碍说明",
    navServices: "康复服务",
    navGames: "游戏区",
    navEvaluation: "自动评估",
    navLibrary: "数字图书馆",
    navGallery: "纪念相册",
    navAdmin: "管理员控制台",
    navVirtualClass: "虚拟课堂 🎥",
    statsChildren: "累计支持儿童",
    statsCenters: "国家级中心",
    statsSpecialists: "专业人员培训",
    textBook: "图书",
    moreInfo: "了解更多",
    readMore: "查看详情",
    getStarted: "开始免费评估",
    downloadCatalog: "下载家长手册",
    contactTitle: "联系我们",
    formName: "姓名",
    formEmail: "电子邮箱",
    formMsg: "留言/反馈",
    formSubmit: "提交表格",
    footerCopyright: "© 2026 AMTDA 摩洛哥版权所有。国家级教育公益组织单位。",
    pathologyTitle: "认知儿童学习障碍与困难",
    successTitle: "康复成功案例分享"
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<'home' | 'games' | 'evaluation' | 'library' | 'gallery' | 'admin' | 'classe'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // HOVER TO READ VOCAL ACCESSIBILITY
  const [hoverToRead, setHoverToRead] = useState<boolean>(() => {
    return localStorage.getItem('amtda_hover_to_read') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('amtda_hover_to_read', String(hoverToRead));
  }, [hoverToRead]);

  useEffect(() => {
    if (!hoverToRead) return;

    let hoverTimeout: any = null;
    let lastSpokenText = '';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'BUTTON', 'LI', 'A', 'LABEL'];
      if (!validTags.includes(target.tagName)) return;

      const text = target.innerText || target.textContent;
      if (!text || text.trim().length < 2 || text.trim().length > 180) return;

      if (hoverTimeout) clearTimeout(hoverTimeout);

      hoverTimeout = setTimeout(() => {
        const cleanText = text.trim();
        if (lastSpokenText === cleanText) return;
        lastSpokenText = cleanText;
        speakText(cleanText, lang === 'ar' ? 'ar' : 'fr', undefined, true);
      }, 550); // Debounce to keep navigation fluid
    };

    const handleMouseLeave = () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverToRead, lang]);

  // ACCESSIBILITY SWITCHES
  const [accessibility, setAccessibility] = useState({
    dyslexicFont: false,
    fontSize: 'normal' as 'normal' | 'large' | 'huge',
    highContrast: false,
    brightness: 1.0,
    lineSpacing: 'normal' as 'normal' | 'wide' | 'extra',
    wordSpacing: 'normal' as 'normal' | 'wide' | 'extra',
    highlightLinks: false,
    blueLightFilter: false,
  });


  // STATISTICS ENGINE
  const [stats, setStats] = useState<ClickStats>(() => {
    const saved = localStorage.getItem('amtda_click_stats');
    if (saved) return JSON.parse(saved);
    return {
      pageViews: 1420,
      gamePlays: { 'Memory Match': 214, 'Word Unscramble': 148, 'Math Quest': 98 },
      downloads: 412,
      prints: 85,
      phoneClicks: 64,
      whatsappClicks: 112
    };
  });

  useEffect(() => {
    localStorage.setItem('amtda_click_stats', JSON.stringify(stats));
  }, [stats]);

  const trackAction = (key: keyof ClickStats) => {
    if (key === 'pageViews' || key === 'downloads' || key === 'prints' || key === 'phoneClicks' || key === 'whatsappClicks') {
      setStats(prev => ({ ...prev, [key]: (prev[key] as number) + 1 }));
    }
  };

  const trackGame = (gameName: string) => {
    setStats(prev => {
      const copy = { ...prev };
      copy.gamePlays[gameName] = (copy.gamePlays[gameName] || 0) + 1;
      return copy;
    });
  };

// PERSISTED SOUVENIR GALLERY
const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
  const saved = localStorage.getItem('amtda_gallery');
  if (saved) return JSON.parse(saved);
  return [
    {
      id: '1',
      url: './image/ortof.jpg',
      title: 'Journée Dépistage - Casablanca',
      description: 'Le dépistage précoce est souvent gratuit dans notre réseau des centres.'
    },
    {
      id: '2',
      url: './image/Fpro.jpg',
      title: 'Formations au Professionnels',
      description: 'L\'accompagnement et la formation professionnelle permettent le développement stratégique des compétences en entreprise.'
    },
    {
      id: '3', // Corrigé : id unique
      url: './image/family.jpg',
      title: 'AMTDA',
      description: 'La famille AMTDA'
    },
    {
      id: '4', // Corrigé : id unique
      url: './image/natio.jpg',
      title: 'Journée d\'accompagnement',
      description: 'la mise en place d\'un PAP (Plan d\'Accompagnement Personnalisé) ou d\'un PPS.'
    },
    {
      id: '5', // Corrigé : id unique
      url: './image/scool.jpg',
      title: 'Atelier d\'orthophonie - Casablanca',
      description: 'Atelier d\'orthophonie - Casablanca'
    }
  ];
});

useEffect(() => {
  localStorage.setItem('amtda_gallery', JSON.stringify(galleryItems));
}, [galleryItems]);

  // TESTIMONIALS STATE
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('amtda_testimonials');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 't1',
        name: 'Mr. Khïr-Eddine Nejjari',
        role: 'SPETIAL & FURNITURE DESIGNER',
        text: 'La formation dispensée par les experts de l\'association a complètement transformé notre approche des enfants ayant des troubles d\'apprentissage en classe.',
        avatar: './image/avatar-1784369122265-nej.jpg',
        isApproved: true
      },
      {
        id: 't2',
        name: 'Mme Ghita Alami',
        role: 'MAMAN DE Farass (9ans)',
        text: 'Grâce à l\'accompagnement de l\'AMTDA, ma fille qui souffrait d\'une dyslexie sévère a réappris à aimer l\'école et à déchiffrer ses premières lectures courantes.',
        avatar: './image/ALAMI.jpg',
        isApproved: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);

  // ARTICLES STATE
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('amtda_articles');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'art1',
        title: {
          fr: 'Signature du Partenariat Écoles Inclusives',
          ar: 'توقيع شراكة المدارس الدامجة',
          en: 'Inclusive Schools Partnership Signed',
          zh: '签约包容性学校合作共建'
        },
        excerpt: {
          fr: 'Lancement du plaidoyer national pour intégrer l\'orthophonie dans le système public marocain.',
          ar: 'إطلاق برنامج وطني لدمج تخصصات النطق في المنظومة التربوية.',
          en: 'Launching our advocacy to integrate speech therapy into public educational sectors.',
          zh: '开展将语言与康复训练融入公立学校教学系统的国家级倡议活动。'
        },
        content: {
          fr: 'Dans le cadre de son plan national, l\'AMTDA a signé un accord pour équiper des salles pilotes de Hay Hassani en matériel d\'apprentissage ergonomique et dys-adapté.',
          ar: 'في إطار خطتها الوطنية، قامت الجمعية بتجهيز قاعات نموذجية في الحي الحسني بالوسائل الديداكتيكية الدامجة والملائمة للاضطرابات.',
          en: 'AMTDA equipped primary pilot classrooms in Casablanca with ergonomic, dys-adaptive aids to support inclusive learning.',
          zh: '在国家战略合作框架下，协会在哈桑区装备了多所配备人体工程学与读写障碍友好教具的示范融合教室。'
        },
        image: './image/acc.jpg',
        date: '15/07/2026',
        category: 'Actualités'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_articles', JSON.stringify(articles));
  }, [articles]);

  // DOWNLOADABLE RESOURCES
  const [pdfFiles, setPdfFiles] = useState<any[]>(() => {
    const saved = localStorage.getItem('amtda_pdf_files');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'pdf1', name: 'Dossier d\'inscription et Bilan initial', url: '#', category: 'inscription', size: '1.4 MB' },
      { id: 'pdf2', name: 'Guide Parents: Comprendre la Dyslexie', url: '#', category: 'formation', size: '2.8 MB' },
      { id: 'pdf3', name: 'Fiches pratiques d\'exercices d\'écriture', url: '#', category: 'exercices', size: '940 KB' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_pdf_files', JSON.stringify(pdfFiles));
  }, [pdfFiles]);

  // SHARED BOOKS (ROMANS) STATE
  const [books, setBooks] = useState<any[]>(() => {
    const saved = localStorage.getItem('amtda_books');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= 9) return parsed;
    }
    return [
      {
        id: 'hiba',
        title: 'Le Voyage de Hiba & Sarah et ses drôles de chiffres',
        author: 'AMTDA Éditions',
        description: 'Une histoire merveilleuse illustrant comment Hiba surmonte ses difficultés de calcul et de lecture grâce à sa persévérance.',
        coverColor: '#92C83E',
        pages: [
          "Il était une fois, dans une jolie école de Casablanca, une petite fille intelligente nommée Hiba. Hiba adorait dessiner des papillons de toutes les couleurs.",
          "Mais en classe, les chiffres semblaient danser devant elle. Le 3 ressemblait à une vague, le 8 à un petit bonhomme de neige timide. Sarah, son institutrice, remarqua ces drôles de chiffres.",
          "Sarah dit alors à Hiba : 'Ne t'inquiète pas, les chiffres sont des amis qui aiment jouer. Dessinons ensemble pour les apprivoiser !' Et ensemble, ils tracèrent des ronds et des triangles.",
          "Grâce aux méthodes ludiques de l'AMTDA, Hiba comprit enfin la logique des nombres. Aujourd'hui, elle compte joyeusement tous ses dessins et réussit avec brio !"
        ]
      },
      {
        id: 'yassine',
        title: 'Yassine et le mystère des lettres inversées',
        author: 'AMTDA Éditions',
        description: 'Yassine découvre que ses yeux jouent des tours avec les lettres "b" et "d", et apprend des astuces visuelles rigolotes.',
        coverColor: '#F58220',
        pages: [
          "Yassine est un garçon plein d'énergie qui adore construire des cabanes en carton. Mais quand il lit, le 'b' devient un 'd' et le 'p' fait la pirouette avec le 'q'.",
          "Un après-midi à l'atelier AMTDA, l'orthophoniste lui montre une astuce en carton : 'Regarde, Yassine, le b a une grosse bedaine tournée vers la droite, comme un ballon !'",
          "Et le 'd' ? Le 'd' a un grand dos droit tourné vers la gauche, comme une chaise de profil. Yassine mime les lettres avec ses mains et s'amuse beaucoup.",
          "En s'entraînant avec ces petits secrets, les lettres arrêtent enfin de bouger. Yassine peut maintenant dévorer ses livres d'aventures préférés sans aucune hésitation !"
        ]
      },
      {
        id: 'leo_ecureuil',
        title: 'Léo l’écureuil et le secret des mots-images',
        author: 'AMTDA Éditions',
        description: 'Léo a du mal à se souvenir de l’orthographe des mots. Ses amis de la forêt lui enseignent la méthode des dessins magiques.',
        coverColor: '#E11D48',
        pages: [
          "Léo est un petit écureuil très espiègle qui adore ramasser des noisettes. Mais quand il doit écrire le mot 'arbre' ou 'fleur', il oublie toujours les lettres.",
          "Un jour, la sage chouette de l'école lui propose un jeu : 'Dessine le mot à la place d'écrire de simples lettres noires !'",
          "Pour écrire le mot 'arbre', Léo dessine un petit sapin à la place de la lettre A. Pour le mot 'chat', il rajoute deux petites oreilles de chat sur le C.",
          "Cette astuce visuelle change tout pour Léo. En s'amusant à dessiner ses mots, il les mémorise facilement et devient le champion d'orthographe de la forêt !"
        ]
      },
      {
        id: 'sofia_girafe',
        title: 'Sofia la petite girafe au grand cœur',
        author: 'AMTDA Éditions',
        description: 'Sofia parle différemment et cherche ses mots. Elle montre à ses camarades que l’art, les gestes et la peinture expriment de magnifiques sentiments.',
        coverColor: '#D97706',
        pages: [
          "Sofia est une jeune girafe avec un cou immense et de grands yeux doux. Elle aime tout le monde, mais parfois, quand elle veut parler, ses mots restent bloqués.",
          "Les autres girafes parlent très vite, et Sofia se sent parfois un peu seule pendant la récréation car elle n'arrive pas à suivre leurs conversations.",
          "Un après-midi, elle décide d'apporter ses pinceaux géants. Elle peint un immense tableau coloré représentant le soleil, l'amitié et la joie de vivre.",
          "Ses camarades courent admirer l'œuvre. 'C'est magnifique !' disent-ils. Sofia sourit : elle vient de montrer que le cœur s'exprime de mille et une façons !"
        ]
      },
      {
        id: 'rayan_boussole',
        title: 'Rayan et la boussole de l’attention',
        author: 'AMTDA Éditions',
        description: 'Rayan a une énergie débordante et son esprit papillonne. Il apprend des techniques douces de respiration pour focaliser son attention.',
        coverColor: '#059669',
        pages: [
          "Rayan a un cerveau qui tourne à toute vitesse, comme un petit moulin à vent. En classe, il regarde un oiseau dehors, puis sa trousse, puis il oublie sa leçon.",
          "Son professeur lui donne alors une petite boussole imaginaire : 'Chaque fois que tu te sens papillonner, prends une grande inspiration de trois secondes.'",
          "'Imagine que tu souffles doucement sur une bougie sans l'éteindre pour ramener ton esprit sur ta feuille', ajoute le maître avec un sourire chaleureux.",
          "Rayan essaie l'exercice. Son esprit se calme doucement, comme un lac paisible. Grâce à cette boussole de la respiration, il réussit tous ses exercices de la journée !"
        ]
      },
      {
        id: 'amine_petits_pas',
        title: 'Amine le champion des petits pas',
        author: 'AMTDA Éditions',
        description: 'Une histoire touchante sur la persévérance. Amine apprend que chaque petit effort quotidien mène vers de grandes réussites.',
        coverColor: '#2563EB',
        pages: [
          "Amine trouve parfois les devoirs très longs et très difficiles. Il a l'impression d'être au pied d'une montagne trop haute pour lui.",
          "Son grand-père lui confie un secret : 'Amine, pour gravir une montagne, on ne saute pas au sommet d'un coup. On fait juste un petit pas après l'autre.'",
          "Amine décide de faire ses devoirs par petits morceaux. Dix minutes d'effort, puis une petite pause pour jouer, puis dix autres minutes de lecture appliquée.",
          "La régularité fait des miracles. Amine termine ses devoirs tous les jours avec joie !"
        ]
      },
      {
        id: 'foret_maya',
        title: 'La forêt géométrique de Maya',
        author: 'AMTDA Éditions',
        description: 'Maya a peur de la géométrie et des maths, mais elle apprend à les aimer en découvrant les formes cachées dans la nature.',
        coverColor: '#7C3AED',
        pages: [
          "Maya pense que les mathématiques ne servent à rien d'autre qu'à lui faire peur. Elle préfère se promener dans la forêt près de chez elle.",
          "Un jour, elle remarque que les feuilles de l'arbre ont la forme de parfaits triangles et que la coquille de l'escargot dessine une magnifique spirale.",
          "Maya s'exclame : 'Mais la forêt est un grand livre de géométrie !' Depuis ce jour, elle adore mesurer et étudier les formes de la nature."
        ]
      },
      {
        id: 'pinceau_sami',
        title: 'Le pinceau magique de Sami',
        author: 'AMTDA Éditions',
        description: 'Sami a du mal à tenir son stylo fermement. Il découvre le plaisir et l’épanouissement artistique grâce à des outils de dessin ergonomiques.',
        coverColor: '#DB2777',
        pages: [
          "Sami trouve que l'écriture est fatigante car ses doigts manquent de force et ont du mal à guider précisément la pointe du stylo sur la feuille de papier.",
          "À l'atelier créatif de l'AMTDA, l'éducatrice lui remet un pinceau ergonomique avec une petite poignée en mousse souple et des couleurs éclatantes.",
          "Sami réalise qu'il est un artiste formidable. Ses œuvres sont exposées fièrement dans toute l'école, redonnant le sourire à ses doigts fatigués !"
        ]
      },
      {
        id: 'lina_club',
        title: 'Lina et le club de l’école inclusive',
        author: 'AMTDA Éditions',
        description: 'L’entraide et l’amitié font des miracles. Lina et ses amis s’unissent pour que chaque enfant trouve sa place à l’école.',
        coverColor: '#0D9488',
        pages: [
          "Dans l'école de Lina, il y a de la place pour tout le monde. Certains enfants marchent vite, d'autres prennent leur temps, certains lisent avec des images.",
          "Lina décide de créer le 'Club de l'Entraide'. Le but est simple : s'assurer que personne ne reste seul pendant la récréation ou en classe.",
          "Ensemble, les enfants prouvent que les différences sont des richesses extraordinaires !"
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_books', JSON.stringify(books));
  }, [books]);

  // CHILDREN SONGS STATE
  const [songs, setSongs] = useState<any[]>(() => {
    const saved = localStorage.getItem('amtda_songs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'song1',
        title: 'أناشيد مدرستي الحبيبة',
        artist: 'Chœur des Enfants AMTDA',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        lyrics: 'مدرستي يا نور عيني.. فيك أقضي جل يومي..\nأتعلم الحروف والعلوم.. وأحقق كل حلم..\nمدرستي يا بيتي الثاني.. فيك أحلى الألحان..'
      },
      {
        id: 'song2',
        title: 'نشيد العلم المغربي الوطني',
        artist: 'Chanterelle du Maroc',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        lyrics: 'منبت الأحرار.. مشرق الأنوار..\nمنتدى السؤدد وحماه.. دمت منتداه وحماه..\nعشت في الأوطان.. للعلى عنوان..\nملء كل جنان.. ذكر كل لسان..\nبالروح بالجسد.. هب فتاك.. لبى نداك..\nفي فمي وفي دمي.. هواك ثار نور ونار..\nإخوتي هيا.. للعلى سعيا..\nنشهد الدنيا.. أن هنا نحيا..\nبشعار: الله، الوطن، الملك'
      },
      {
        id: 'song3',
        title: 'أغنية الحروف الهجائية',
        artist: 'Les Petits Écoliers de Tanger',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        lyrics: 'ألف أرنب يجري يلعب.. باء بطة تنط في الماء..\nتاء تاج فوق الرأس.. ثاء ثعلب صاد دجاجة..\nجيم جمل في الصحراء.. حاء حمامة تطير في السماء..'
      },
      {
        id: 'song4',
        title: 'L’Hymne de l’Inclusion et de l’Amitié',
        artist: 'AMTDA Harmonie Choir',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        lyrics: 'Tous différents, mais tous égaux !\nEnsemble, nous volons très haut.\nTa main dans ma main, mon ami,\nNous dessinons un monde sans soucis.\nLes lettres dansent, nous chantons fort,\nL’entraide est notre plus beau trésor !'
      },
      {
        id: 'song5',
        title: 'La Chanson des Petits Étoiles',
        artist: 'Association Marocaine des Enfants',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        lyrics: 'Petite étoile qui brille dans la nuit,\nÉclaire le chemin de tous mes amis.\nUn pas après l’autre, sans bruit,\nNous grandissons libres et épanouis.\nAu Maroc de Tanger à Lagouira,\nL’amour nous guidera toujours là !'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_songs', JSON.stringify(songs));
  }, [songs]);

  // HOMEPAGE IMAGE STATE
  const [homePageImage, setHomePageImage] = useState<string>(() => {
    return localStorage.getItem('amtda_homepage_image') || './image/acc.jpg';
  });

  useEffect(() => {
    localStorage.setItem('amtda_homepage_image', homePageImage);
  }, [homePageImage]);

  // MOROCCAN CULTURE ITEMS STATE
  const [cultureItems, setCultureItems] = useState<CultureItem[]>(() => {
    const saved = localStorage.getItem('amtda_culture_items');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'cult1',
        type: 'video',
        title: 'Le petit chameau de Ouarzazate 🐪',
        description: "Un magnifique court-métrage d'animation rythmé qui stimule la prononciation vocale des syllabes chez l'enfant dyslexique.",
        image: './image/chameau.jpg',
        actionPayload: "Lancement du dessin animé éducatif !\nEn raison des restrictions d'iframe, la vidéo fictive se lance en mode stimulation sensorielle sonore."
      },
      {
        id: 'cult2',
        type: 'video',
        title: 'Les aventures de Mimoun le singe 🐒',
        description: "Suivez Mimoun dans le Moyen-Atlas marocain pour apprendre les formes géométriques et l'importance de la solidarité.",
        image: './image/singee.jpg',
        actionPayload: "Lancement de l'épisode de Mimoun !"
      },
      {
        id: 'cult3',
        type: 'magazine',
        title: 'Mag-Inclusion AMTDA : Spécial Artisanat',
        description: "Un journal illustré avec une typographie de grand confort et des fiches en couleur sur les potiers de Safi et tanneurs de Fès.",
        image: './image/teen.jpg',
        actionPayload: "Ouverture du Magazine en cours de chargement... / فتح المجلة الملونة للأطفال"
      },
      {
        id: 'cult4',
        type: 'tale',
        title: "L'arbre magique de Chefchaouen 🌳",
        description: "Une histoire de sagesse et de partage au pied des montagnes bleues de Chefchaouen pour éveiller l'imagination.",
        image: './image/image_49cd57f1.jpg',
        actionPayload: "Il était une fois, niché au cœur des ruelles bleues de Chefchaouen, un arbre de sagesse dont chaque feuille murmurait de jolis contes d'entraide et de bonheur."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('amtda_culture_items', JSON.stringify(cultureItems));
  }, [cultureItems]);

  // TRANSITIONS AND NAVIGATION HELPERS
  const handleTabChange = (tab: typeof activeTab) => {
    playChime('click');
    setActiveTab(tab);
    trackAction('pageViews');
    setIsMobileMenuOpen(false);
  };

  // FORM SUBMISSION
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formFeedback, setFormFeedback] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('click');
    if (!formState.name || !formState.email || !formState.message) {
      setFormFeedback('Veuillez remplir tous les champs / المرجو ملء جميع الخانات');
      playChime('fail');
      return;
    }
    // Success simulation
    setFormFeedback('Votre message a été envoyé avec succès à contact@amtda.ma !');
    playChime('success');
    setFormState({ name: '', email: '', message: '' });
    trackAction('downloads'); // increment general impact
  };

  // TESTIMONY ADDITION FROM USER
  const [userTestimony, setUserTestimony] = useState({ name: '', role: '', text: '', avatar: '' });
  const [testimonyFeedback, setTestimonyFeedback] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    playChime('click');
    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'x-folder-name': 'image',
          'x-file-name': encodeURIComponent(`avatar-${Date.now()}-${file.name}`),
        },
        body: file
      });
      if (response.ok) {
        const data = await response.json();
        playChime('success');
        setUserTestimony(prev => ({ ...prev, avatar: data.url }));
        setTestimonyFeedback('Avatar mis en ligne avec succès !');
      } else {
        setTestimonyFeedback("Erreur lors de l'upload de l'avatar.");
        playChime('fail');
      }
    } catch (err) {
      console.error(err);
      setTestimonyFeedback("Erreur lors de l'upload de l'avatar.");
      playChime('fail');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleAddTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    playChime('click');
    if (!userTestimony.name || !userTestimony.text) {
      setTestimonyFeedback('Veuillez renseigner votre nom et votre témoignage.');
      playChime('fail');
      return;
    }
    const newT: Testimonial = {
      id: Date.now().toString(),
      name: userTestimony.name,
      role: userTestimony.role || 'Parent d\'élève',
      text: userTestimony.text,
      avatar: userTestimony.avatar || '/image/l_1000a_t.png',
      isApproved: false // awaits admin validation!
    };
    setTestimonials([newT, ...testimonials]);
    setTestimonyFeedback('Témoignage envoyé avec succès ! Il sera affiché après validation par l\'administrateur.');
    playChime('success');
    setUserTestimony({ name: '', role: '', text: '', avatar: '' });
  };

  // PATHOLOGIES DETAILS MODAL STATE
  const [activePathologyDetail, setActivePathologyDetail] = useState<string | null>(null);

  // PATHOLOGIES ARRAY
  const pathologies = [
    {
      id: 'dyslexia',
      title: { fr: 'Dyslexie', ar: 'عسر القراءة', en: 'Dyslexia', zh: '读写困难 (Dyslexia)' },
      icon: '📖',
      desc: {
        fr: 'Trouble d\'acquisition de la lecture impactant la reconnaissance de mots et l\'orthographe.',
        ar: 'اضطراب في اكتساب القراءة يؤثر على التعرف على الكلمات والهجاء.',
        en: 'A learning disorder characterized by difficulty reading due to problems identifying speech sounds.',
        zh: '一种以阅读和拼写困难为特征的发展性学习障碍。'
      },
      details: "La dyslexie est liée à une difficulté de traitement phonologique. L'AMTDA fournit des outils spécifiques combinant supports visuels (gros caractères, contrastes colorés) et audio-lecture pour aider les élèves à restaurer l'accès lexical."
    },
    {
      id: 'dysgraphia',
      title: { fr: 'Dysgraphie', ar: 'عسر الكتابة', en: 'Dysgraphia', zh: '书写困难 (Dysgraphia)' },
      icon: '✍️',
      desc: {
        fr: 'Trouble affectant l\'écriture manuelle, le tracé et l\'organisation spatiale des mots.',
        ar: 'اضطراب يؤثر على الكتابة اليدوية، الرسم، والتنظيم المكاني للكلمات.',
        en: 'A neurological disorder characterized by writing disabilities, impacting handwriting speed and legibility.',
        zh: '影响手写技巧、拼写和空间组织的神经发育障碍。'
      },
      details: "La dysgraphie altère l'automatisation du geste graphique. Nos psychomotriciens formés proposent des programmes de rééducation corporelle et digitale, complétés par l'initiation aux claviers ergonomiques."
    },
    {
      id: 'dyscalculia',
      title: { fr: 'Dyscalculie', ar: 'عسر الحساب', en: 'Dyscalculia', zh: '计算困难 (Dyscalculia)' },
      icon: '🧮',
      desc: {
        fr: 'Difficulté à comprendre les nombres, les structures arithmétiques et les calculs de base.',
        ar: 'صعوبة في فهم الأعداد، التراكيب الحسابية، والعمليات الحسابية الأساسية.',
        en: 'A severe difficulty in making arithmetical calculations, understanding quantities and number lines.',
        zh: '在学习算术及理解数量、数字概念方面存在严重困难。'
      },
      details: "La dyscalculie rend l'évaluation de quantité très abstraite. Nos jeux éducatifs interactifs basés sur le 'subitizing' (comptage visuel instantané) permettent d'appréhender les nombres de façon ludique."
    },
    {
      id: 'dyspraxia',
      title: { fr: 'Dyspraxie / TAC', ar: 'عسر الحركة', en: 'Dyspraxia', zh: '动作协调困难 (Dyspraxia)' },
      icon: '🎒',
      desc: {
        fr: 'Trouble de la planification des gestes coordonnés, de la motricité fine et de l\'organisation.',
        ar: 'اضطرab في التخطيط للحركات المنسقة، المهارات الحركية الدقيقة، والتنظيم.',
        en: 'A neurological disorder affecting coordinate physical movements, fine motor skills and spatial planning.',
        zh: '影响身体协调能力、精细动作和空间规划的发展性协调障碍。'
      },
      details: "La dyspraxie affecte la motricité fine (lacer ses chaussures, découper). Le pôle psychomotricité de l'AMTDA aide les enfants à structurer leurs repères corporels par des parcours sensoriels."
    },
    {
      id: 'dysphasia',
      title: { fr: 'Dysphasie', ar: 'عسر الكلام', en: 'Dysphasia', zh: '语言障碍 (Dysphasia)' },
      icon: '🗣️',
      desc: {
        fr: 'Trouble structurel du développement du langage oral, de la parole et de la compréhension.',
        ar: 'اضطراب هيكلي في تطور اللغة الشفهية، الكلام، والفهم.',
        en: 'A developmental language disorder affecting both comprehension and oral expression skills.',
        zh: '影响口语表达和听力理解能力的结构性发育语言障碍。'
      },
      details: "La dysphasie perturbe l'articulation ou la compréhension. Nos orthophonistes conçoivent des protocoles personnalisés intégrant des supports pictographiques et de la remédiation vocale."
    },
    {
      id: 'adhd',
      title: { fr: 'TDAH', ar: 'فرط الحركة وتشتت الانتباه', en: 'ADHD', zh: '注意力缺陷多动障碍 (ADHD)' },
      icon: '⚡',
      desc: {
        fr: 'Trouble du déficit de l\'attention avec ou sans hyperactivité et impulsivité cognitive.',
        ar: 'اضطراب نقص الانتباه مع أو بدون فرط النشاط والاندفاع المعرفي.',
        en: 'Attention deficit hyperactivity disorder, characterized by concentration deficits and physical impulsivity.',
        zh: '伴随注意力缺损、多动或认知冲动的脑神经学障碍。'
      },
      details: "Le TDAH rend l'assise prolongée complexe. Nous prônons des méthodes d'apprentissage modulaires, intégrant des jeux d'attention courte pour canaliser positivement l'énergie cognitive."
    }
  ];

  // SERVICES ARRAY
  const services = [
    { id: 's1', title: 'Orthophonie / تقويم النطق', desc: 'Rééducation approfondie du langage écrit et oral, réhabilitation phonétique.', icon: '🗣️' },
    { id: 's2', title: 'Psychologie / الدعم النفسي', desc: 'Soutien psychologique des enfants, gestion du stress lié à l\'échec scolaire.', icon: '🧠' },
    { id: 's3', title: 'Psychomotricité / العلاج الحركي', desc: 'Correction de la motricité fine, équilibre corporel et repères spatiaux.', icon: '🏃' },
    { id: 's4', title: 'Early Screening / الكشف المبكر', desc: 'Campagnes d\'évaluation de masse dans les établissements scolaires partenaires.', icon: '🔍' },
    { id: 's5', title: 'Teacher Training / تكوين المعلمين', desc: 'Formations qualifiantes pour doter les écoles de méthodes inclusives.', icon: '🎓' },
    { id: 's6', title: 'Serious Games / الألعاب الجادة', desc: 'Développement d\'outils numériques ludiques pour l\'aide à la rééducation.', icon: '🎮' }
  ];

  return (
    <div 
      style={{ filter: `brightness(${accessibility.brightness})` }}
      className={`min-h-screen relative overflow-x-hidden flex flex-col justify-between ${
        accessibility.dyslexicFont ? 'font-dyslexic' : 'font-sans'
      } ${
        accessibility.fontSize === 'large' ? 'text-lg' : accessibility.fontSize === 'huge' ? 'text-xl' : 'text-base'
      } ${
        accessibility.highContrast ? 'bg-slate-950 text-white dark' : 'bg-slate-50 text-slate-850'
      } ${
        accessibility.lineSpacing === 'wide' ? 'line-spacing-wide' : accessibility.lineSpacing === 'extra' ? 'line-spacing-extra' : ''
      } ${
        accessibility.wordSpacing === 'wide' ? 'word-spacing-wide' : accessibility.wordSpacing === 'extra' ? 'word-spacing-extra' : ''
      } ${
        accessibility.highlightLinks ? 'highlight-active' : ''
      }`}
    >
      {accessibility.blueLightFilter && (
        <div className="fixed inset-0 bg-amber-500/8 pointer-events-none z-[99999] mix-blend-multiply" />
      )}

      {/* Animated Floating background */}
      <BackgroundUniverse />

      {/* FIXED FLOATING WHATSAPP CHAT BUTTON */}
      <motion.div 
        initial={{ scale: 0, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group" 
        id="whatsapp-floater-container"
      >
        <div className="bg-white text-slate-800 text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          Besoin d'aide ? Chattez avec l'AMTDA
        </div>
        <a
          href="https://wa.me/212677158888"
          target="_blank"
          rel="noreferrer"
          onClick={() => { trackAction('whatsappClicks'); playChime('click'); }}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer relative"
          title="Discuter sur WhatsApp"
          id="whatsapp-floater"
        >
          <MessageCircle className="w-6.5 h-6.5 animate-pulse" />
          <span className="absolute top-0 right-0 bg-rose-500 w-2.5 h-2.5 rounded-full border border-white animate-ping"></span>
          <span className="absolute top-0 right-0 bg-rose-500 w-2.5 h-2.5 rounded-full border border-white"></span>
        </a>
      </motion.div>

      {/* HEADER NAVBAR - FLOATING GLASS PILL */}
      <div className="fixed top-4 left-0 right-0 z-40 px-4 max-w-7xl mx-auto w-full pointer-events-none">
        <header className="pointer-events-auto bg-white/75 backdrop-blur-md border border-slate-200/40 rounded-2xl shadow-lg transition-all">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Logo element - no outline/frame container, custom vector rendering of AMTDA mascot + text layout */}
            <motion.div 
              onClick={() => handleTabChange('home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 cursor-pointer select-none"
              id="logo-amtda-original"
            >
              {/* APPEL DIRECT DE VOTRE NOUVEAU LOGO SVG */}
              <img 
                src="/logo.svg" 
                alt="Logo AMTDA" 
                className="h-14 md:h-16 w-auto object-contain" 
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              <button onClick={() => handleTabChange('home')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'home' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navHome}
              </button>
              <button onClick={() => handleTabChange('games')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'games' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navGames}
              </button>
              <button onClick={() => handleTabChange('evaluation')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'evaluation' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navEvaluation}
              </button>
              <button onClick={() => handleTabChange('library')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'library' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navLibrary}
              </button>
              <button onClick={() => handleTabChange('gallery')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'gallery' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navGallery}
              </button>
              <button onClick={() => handleTabChange('classe')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'classe' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navVirtualClass}
              </button>
              <button onClick={() => handleTabChange('admin')} className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-xl ${activeTab === 'admin' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-600 hover:text-[#0B722C]'}`}>
                {translations[lang].navAdmin}
              </button>
            </nav>

            {/* Actions & Multi-Language */}
            <div className="flex items-center gap-2.5">
              {/* HOVER TO READ TOGGLE BUTTON */}
              <button
                onClick={() => {
                  playChime('click');
                  setHoverToRead(!hoverToRead);
                }}
                className={`p-2 rounded-xl transition-all border text-xs font-bold flex items-center gap-1.5 cursor-pointer select-none ${
                  hoverToRead 
                    ? 'bg-[#0B722C] text-white border-[#0B722C] shadow-sm animate-pulse' 
                    : 'bg-white/90 text-slate-600 border-slate-200/50 hover:bg-slate-50'
                }`}
                title={hoverToRead ? "Lecture vocale au survol ACTIVE - Hover to speak" : "Activer la lecture vocale au survol des mots"}
              >
                <span className="text-sm">🗣️</span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider">{hoverToRead ? "Survol ACTIF" : "Lecture survol"}</span>
              </button>

              {/* National Moroccan Flag Indicator */}
              <div 
                className="flex items-center gap-1.5 bg-slate-100/55 p-1 rounded-xl text-xs font-bold select-none border border-slate-200/40"
                title="Royaume du Maroc"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden shadow-xs shrink-0 bg-transparent flex items-center justify-center">
                  <img 
                    src="/image/l_1000f_t.png" 
                    className="w-full h-full object-contain" 
                    alt="Royaume du Maroc" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <span className="text-[#133C8B] font-bold text-[9px] hidden sm:inline-block pr-1">MAROC</span>
              </div>

              {/* Language Selector */}
              <select
                value={lang}
                onChange={(e) => { playChime('click'); setLang(e.target.value as Language); }}
                className="bg-white/90 hover:bg-slate-50 border border-slate-200/50 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-hidden cursor-pointer"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="zh">ZH</option>
              </select>

              {/* Mobile menu toggle */}
              <button 
                onClick={() => { playChime('click'); setIsMobileMenuOpen(!isMobileMenuOpen); }} 
                className="lg:hidden p-2 text-slate-600 hover:text-[#0B722C] rounded-xl hover:bg-white/80 transition-all border border-slate-200/20"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 rounded-b-2xl space-y-1.5 animate-fade-in pointer-events-auto">
              <button onClick={() => handleTabChange('home')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'home' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navHome}
              </button>
              <button onClick={() => handleTabChange('games')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'games' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navGames}
              </button>
              <button onClick={() => handleTabChange('evaluation')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'evaluation' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navEvaluation}
              </button>
              <button onClick={() => handleTabChange('library')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'library' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navLibrary}
              </button>
              <button onClick={() => handleTabChange('gallery')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'gallery' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navGallery}
              </button>
              <button onClick={() => handleTabChange('classe')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'classe' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navVirtualClass}
              </button>
              <button onClick={() => handleTabChange('admin')} className={`block w-full text-left p-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'admin' ? 'text-[#0B722C] bg-[#92C83E]/15' : 'text-slate-700 hover:bg-slate-50'}`}>
                {translations[lang].navAdmin}
              </button>
            </div>
          )}
        </header>
      </div>

      {/* MAIN SCREEN SECTIONS */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-28 sm:pt-32 pb-8 space-y-16">

        {activeTab === 'home' && (
          <>
            {/* HERO SECTION / CINEMATIC INTRO */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden relative">
              {/* Star-burst vector decoration */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-100/30 blur-2xl"></div>

              {/* Text block */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Utilité Publique Nationale
                  <img src="/image/l_1000a_t.png" className="w-4 h-4 object-contain rounded-full" alt="Maroc" referrerPolicy="no-referrer" />
                </span>
                
                <h2 className="text-3xl md:text-5xl font-bold text-slate-800 font-sans tracking-tight leading-tight uppercase">
                  {translations[lang].title}
                </h2>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {translations[lang].subtitle}
                </p>

                {/* Impact statistics counter banner */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
                  <div className="text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-emerald-600 font-mono">15K+</span>
                    <span className="text-[9px] md:text-xs text-slate-500">{translations[lang].statsChildren}</span>
                  </div>
                  <div className="text-center border-x border-slate-150">
                    <span className="block text-2xl md:text-3xl font-bold text-sky-600 font-mono">4+</span>
                    <span className="text-[9px] md:text-xs text-slate-500">{translations[lang].statsCenters}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl md:text-3xl font-bold text-orange-500 font-mono">820+</span>
                    <span className="text-[9px] md:text-xs text-slate-500">{translations[lang].statsSpecialists}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleTabChange('evaluation')}
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md text-center cursor-pointer"
                  >
                    {translations[lang].getStarted} ➔
                  </button>
                  <button
                    onClick={() => { playChime('click'); trackAction('downloads'); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4.5 h-4.5" />
                    {translations[lang].downloadCatalog}
                  </button>
                </div>
              </div>

              {/* Decorative Image space */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative">
                  <img
                    src={homePageImage}
                    alt="Dyslexia friendly reading"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating badge for child support */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-emerald-100/50 shadow-md flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Pour chaque enfant</span>
                      <span className="text-xs font-bold text-slate-700">Le droit de réussir !</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PATHOLOGIES EXPLAINER */}
            <section className="space-y-6" id="pathologies">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 font-sans tracking-tight">
                  {translations[lang].pathologyTitle}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  L'AMTDA fournit une compréhension clinique et pédagogique pour accompagner au mieux les élèves. Cliquez sur une difficulté pour voir nos protocoles d'accompagnement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pathologies.map((path) => (
                  <motion.div
                    key={path.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { playChime('click'); setActivePathologyDetail(activePathologyDetail === path.id ? null : path.id); }}
                    className="p-5 bg-white/80 backdrop-blur-md border border-slate-150 hover:border-[#92C83E] rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{path.icon}</div>
                      <h4 className="text-lg font-bold text-slate-800 font-sans tracking-tight">{path.title[lang] || path.title.fr}</h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{path.desc[lang] || path.desc.fr}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-sky-600">
                      <span>{translations[lang].moreInfo}</span>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${activePathologyDetail === path.id ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Expandable info frame with transparent scroll */}
                    {activePathologyDetail === path.id && (
                      <div className="mt-4 p-3 bg-sky-50/50 rounded-xl border border-sky-100 text-[11px] text-slate-600 leading-relaxed font-sans max-h-[100px] overflow-y-auto custom-scrollbar">
                        {path.details}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SERVICES INCLUSION DECK */}
            <section className="space-y-6" id="services">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Pôles de Prise en Charge</h3>
                <p className="text-xs text-slate-500 mt-2">
                  De la rééducation spécialisée au soutien des familles pour un parcours scolaire harmonieux.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 bg-white rounded-2xl border border-slate-200/50 flex gap-4 items-start shadow-xs hover:shadow-md transition-all">
                    <div className="text-2xl p-2.5 bg-sky-50 rounded-xl text-sky-600 shrink-0">{srv.icon}</div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">{srv.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NOTRE ADRESSE & LOCALISATION REELLE CASABLANCA */}
            <section className="space-y-6" id="localisation">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#92C83E]/15 text-[#0B722C] border border-[#92C83E]/30 font-sans">
                  Notre Localisation
                </span>
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight mt-2">Notre Siège & Centre d'Accueil à Casablanca 📍</h3>
                <p className="text-xs text-slate-500 mt-1">Venez nous rencontrer pour un bilan d'évaluation approfondi avec nos orthophonistes et psychologues.</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/60 p-5 shadow-xs max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Adresse Réelle</span>
                        <p className="text-xs font-semibold text-slate-700 mt-1">Association AMTDA, Boulevard Modibo Keita, Casablanca 20100, Maroc</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Téléphone</span>
                        <p className="text-xs font-semibold text-slate-700 mt-1">+212 (0) 5.22.01.34.44</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Adresse Email</span>
                        <p className="text-xs font-semibold text-[#133C8B] mt-1">contact@amtda.ma</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed">
                    <strong>Horaires de permanence d'accueil :</strong>
                    <br />Lundi au Vendredi : 08:30 - 18:30
                    <br />Samedi : 09:00 - 13:00
                  </div>
                </div>

                <div className="md:col-span-8 rounded-2xl overflow-hidden border border-slate-100 min-h-[280px]">
                  <iframe 
                    src="https://maps.google.com/maps?q=Boulevard%20Modibo%20Keita%2C%20Casablanca%2C%20Morocco&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    className="w-full h-full border-0" 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* TESTIMONIALS ANIMATED + SUBMIT YOUR OWN */}
            <section className="space-y-8" id="temoignages">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                  {translations[lang].successTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-2">Découvrez les retours de parents et enseignants qui collaborent avec l'AMTDA.</p>
              </div>

              {/* Elegant Testimonials Slider */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 bg-gradient-to-br from-white/95 to-emerald-50/25 backdrop-blur-md border border-emerald-100/50 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden min-h-[350px] shadow-sm">
                  {/* Decorative big quotation mark icon */}
                  <div className="absolute right-6 top-6 text-[#92C83E]/10 font-serif text-9xl pointer-events-none select-none">“</div>
                  
                  <div className="space-y-5 relative z-10 text-left">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 text-sm italic font-medium leading-relaxed">
                      "{testimonials.filter(t => t.isApproved)[currentTestIndex]?.text || "Excellent service et accompagnement continu."}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonials.filter(t => t.isApproved)[currentTestIndex]?.avatar} 
                        alt={testimonials.filter(t => t.isApproved)[currentTestIndex]?.name} 
                        className="w-12 h-12 object-cover rounded-full border-2 border-emerald-500/20 shadow-xs shrink-0" 
                        referrerPolicy="no-referrer" 
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">
                          {testimonials.filter(t => t.isApproved)[currentTestIndex]?.name}
                        </h4>
                        <span className="inline-block text-[10px] bg-emerald-50 text-[#0B722C] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider mt-0.5">
                          {testimonials.filter(t => t.isApproved)[currentTestIndex]?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation dots and arrow keys */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100/60 z-10 mt-6">
                    <div className="flex gap-1.5">
                      {testimonials.filter(t => t.isApproved).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => { playChime('click'); setCurrentTestIndex(idx); }}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            currentTestIndex === idx ? 'bg-[#0B722C] w-6' : 'bg-slate-200 hover:bg-slate-300 w-2'
                          }`}
                          aria-label={`Testimonial slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          playChime('click');
                          const approvedLength = testimonials.filter(t => t.isApproved).length;
                          setCurrentTestIndex((prev) => (prev === 0 ? approvedLength - 1 : prev - 1));
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer text-xs font-bold"
                        title="Précédent"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => {
                          playChime('click');
                          const approvedLength = testimonials.filter(t => t.isApproved).length;
                          setCurrentTestIndex((prev) => (prev === approvedLength - 1 ? 0 : prev + 1));
                        }}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer text-xs font-bold"
                        title="Suivant"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Testimony adder form */}
                <form onSubmit={handleAddTestimony} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Partager votre témoignage</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={userTestimony.name}
                      onChange={(e) => setUserTestimony({ ...userTestimony, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Votre rôle (ex: Parent, Enseignant)"
                      value={userTestimony.role}
                      onChange={(e) => setUserTestimony({ ...userTestimony, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-slate-700"
                    />
                    
                    {/* AVATAR UPLOADER FIELD */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {userTestimony.avatar ? (
                        <img 
                          src={userTestimony.avatar} 
                          alt="Avatar" 
                          className="w-10 h-10 rounded-full object-cover border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-500">
                          AV
                        </div>
                      )}
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 cursor-pointer">
                          {uploadingAvatar ? "Upload en cours..." : "Photo de profil / Avatar"}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                          disabled={uploadingAvatar}
                        />
                      </div>
                    </div>

                    <textarea
                      placeholder="Votre message de soutien"
                      value={userTestimony.text}
                      onChange={(e) => setUserTestimony({ ...userTestimony, text: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-slate-700 h-20"
                    />
                  </div>
                  {testimonyFeedback && <p className="text-xs font-semibold text-emerald-600">{testimonyFeedback}</p>}
                  <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-md">
                    Soumettre pour validation
                  </button>
                </form>
              </div>
            </section>

            {/* ARTICLES & NEWS GRID SECTION - DYNAMICALLY ADDED BY ADMIN */}
            <section className="space-y-6" id="actualites">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#92C83E]/15 text-[#0B722C] border border-[#92C83E]/30 font-sans">
                  Actualités & Actions Inclusives
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mt-2">
                  Derniers Événements de l'AMTDA
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Suivez nos combats au quotidien, nos signatures de partenariats et nos ateliers pratiques à Casablanca.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <article key={art.id} className="bg-white rounded-2xl border border-slate-200/50 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between transition-all group">
                    <div>
                      <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-100">
                        <img 
                          src={art.image} 
                          alt={art.title[lang] || art.title.fr} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#0B722C] text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase">
                          {art.category || 'Actualité'}
                        </span>
                      </div>
                      
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 block">{art.date}</span>
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0B722C] transition-colors">
                          {art.title[lang] || art.title.fr}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {art.excerpt[lang] || art.excerpt.fr}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button 
                        onClick={() => {
                          playChime('click');
                          alert(`${art.title[lang] || art.title.fr}\n\n${art.content[lang] || art.content.fr}`);
                        }}
                        className="w-full py-2 bg-slate-100 hover:bg-[#92C83E]/15 text-[#0B722C] font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Lire la suite ➔
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* PARTENAIRES & COLLABORATIONS */}
            <section className="space-y-4">
              <h4 className="text-center text-xs font-bold uppercase text-slate-400 tracking-widest">Ils nous soutiennent</h4>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
                <span className="font-sans font-bold text-lg text-slate-400">Ministère de l'Éducation Nationale</span>
                <span className="font-sans font-bold text-lg text-slate-400">INDH</span>
                <span className="font-sans font-bold text-lg text-slate-400">Université Hassan II</span>
              </div>
            </section>
          </>
        )}

        {/* ACTIVE MODULE SCREENS */}
        {activeTab === 'games' && (
          <GamesSection onGamePlay={trackGame} lang={lang} />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationSection onPrintReport={() => trackAction('prints')} lang={lang} />
        )}

        {activeTab === 'library' && (
          <LibrarySection lang={lang} books={books} pdfFiles={pdfFiles} songs={songs} setSongs={setSongs} cultureItems={cultureItems} setCultureItems={setCultureItems} />
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Galerie Souvenirs & Activités</h3>
              <p className="text-xs text-slate-500 mt-2">Découvrez en images la vie de notre association et nos ateliers pratiques à Casablanca.</p>
            </div>
            <GallerySection items={galleryItems} />
          </div>
        )}

        {activeTab === 'classe' && (
          <VirtualClassroom lang={lang} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            galleryItems={galleryItems}
            setGalleryItems={setGalleryItems}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            articles={articles}
            setArticles={setArticles}
            pdfFiles={pdfFiles}
            setPdfFiles={setPdfFiles}
            books={books}
            setBooks={setBooks}
            songs={songs}
            setSongs={setSongs}
            cultureItems={cultureItems}
            setCultureItems={setCultureItems}
            homePageImage={homePageImage}
            setHomePageImage={setHomePageImage}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            stats={stats}
            onResetStats={() => setStats({ pageViews: 0, gamePlays: {}, downloads: 0, prints: 0, phoneClicks: 0, whatsappClicks: 0 })}
          />
        )}

        {/* COMPREHENSIVE CONTACT FORM */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200/50 shadow-lg" id="contact">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
              {translations[lang].contactTitle}
            </h3>
            
            <p className="text-slate-500 text-xs leading-relaxed">
              Pour s'informer, s'inscrire ou nous adresser une réclamation, notre pôle administratif est à votre entière disposition.
            </p>

            <div className="space-y-3 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                <span>Ecole Al Akhtal Banate - Bd Afghanistan - Hay Hassani, 20000 Casablanca, Morocco</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="mailto:contact@amtda.ma" onClick={() => trackAction('downloads')} className="text-emerald-600 hover:underline font-semibold">
                  contact@amtda.ma
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a
                  href="tel:+2110522013444"
                  onMouseEnter={startPhoneRing}
                  onMouseLeave={stopPhoneRing}
                  onClick={() => { playChime('click'); trackAction('phoneClicks'); }}
                  className="font-mono font-semibold text-slate-800 hover:text-orange-600"
                >
                  +212 (0) 5.22.01.34.44 📞
                </a>
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">{translations[lang].formName}</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Rayane Nejjar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-hidden text-slate-700 focus:border-sky-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">{translations[lang].formEmail}</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-hidden text-slate-700 focus:border-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">{translations[lang].formMsg}</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Votre message ou réclamation..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-hidden text-slate-700 h-24 focus:border-sky-500"
              />
            </div>

            {formFeedback && (
              <p className={`text-xs font-semibold ${formFeedback.includes('succès') ? 'text-emerald-600' : 'text-rose-500'}`}>
                {formFeedback}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
            >
              <Send className="w-4 h-4" />
              {translations[lang].formSubmit}
            </button>
          </form>
        </section>

      </main>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-lg font-bold font-sans text-amber-400 uppercase tracking-wider">AMTDA MAROC</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Accompagnement, prise en charge et intégration des enfants présentant des troubles et difficultés d’apprentissage. Reconnu d'utilité publique.
            </p>
            <div className="flex gap-4 text-xs font-mono text-slate-500">
              <a href="tel:+212522013444" className="hover:text-amber-400">+212 (0) 5.22.01.34.44</a>
              <span>|</span>
              <a href="mailto:contact@amtda.ma" className="hover:text-amber-400">contact@amtda.ma</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Liens rapides</span>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button onClick={() => handleTabChange('home')} className="hover:text-amber-400 text-left">Accueil</button>
              <button onClick={() => handleTabChange('games')} className="hover:text-amber-400 text-left">Espace Jeux</button>
              <button onClick={() => handleTabChange('evaluation')} className="hover:text-amber-400 text-left">Évaluation</button>
              <button onClick={() => handleTabChange('library')} className="hover:text-amber-400 text-left">Bibliothèque</button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-right">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Pays d'ancrage</span>
            <span className="flex items-center justify-end gap-1.5 text-base font-bold text-white">
              <img src="/image/l_1000a_t.png" className="w-5 h-5 object-contain rounded-full" alt="Maroc" referrerPolicy="no-referrer" />
              Royaume du Maroc
            </span>
            <span className="block text-[9px] text-slate-500 font-mono">Territoire Unifié de Tanger à Lagouira</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800/80 pt-6 mt-8 text-center text-xs text-slate-500">
          <p>{translations[lang].footerCopyright}</p>
        </div>
      </footer>

      {/* FLOAT BAR FOR DISABILITIES */}
      <AccessibilityToolbar onSettingsChange={(setts) => setAccessibility(setts)} lang={lang} />
    </div>
  );
}
