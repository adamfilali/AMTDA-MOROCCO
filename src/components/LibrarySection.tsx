import { useState, useEffect } from 'react';
import { BookOpen, Volume2, VolumeX, ZoomIn, ZoomOut, Printer, Headphones, BookMarked, HelpCircle, FileText, ChevronLeft, ChevronRight, Download, Film, BookOpenCheck, Search } from 'lucide-react';
import { playChime, speakText, stopSpeaking, setNarratingState } from './AudioPlayer';
import { Language, Song, CultureItem } from '../types';
import MusicSection from './MusicSection';
import { VOCAL_LAB_LESSONS, CULTURE_PROVERBS, LanguageLesson, Proverb } from './VocalLabData';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  coverUrl?: string;
  coverColor?: string;
  pages: string[];
}

interface LibrarySectionProps {
  lang: Language;
  books?: Book[];
  pdfFiles?: any[];
  songs?: Song[];
  setSongs?: (songs: Song[]) => void;
  cultureItems?: CultureItem[];
  setCultureItems?: (items: CultureItem[]) => void;
}

export default function LibrarySection({ 
  lang, 
  books = [], 
  pdfFiles = [], 
  songs = [], 
  setSongs = () => {},
  cultureItems = [],
  setCultureItems = () => {}
}: LibrarySectionProps) {
  const [activeTab, setActiveTab] = useState<'books' | 'audio-lessons' | 'songs' | 'culture' | 'pdfs'>('books');
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);

  // Fallback default books with 7 new educational children's stories (9 total)
  const defaultBooks: Book[] = [
    {
      id: 'hiba',
      title: 'Le Voyage de Hiba & ses drôles de chiffres',
      author: 'AMTDA Éditions',
      description: 'Une histoire merveilleuse illustrant comment Hiba surmonte ses difficultés de calcul grâce à sa persévérance et à des astuces de comptage.',
      coverColor: '#92C83E',
      coverImage: './fil-couv.jpg',
      pages: [
        "Il était une fois, dans une école de Casablanca, une petite fille intelligente nommée Hiba. Hiba adorait dessiner des papillons colorés.",
        "Mais en classe de calcul, les chiffres semblaient danser. Le 3 ressemblait à une vague et le 8 à un bonhomme de neige. Son institutrice remarqua cela.",
        "Elle lui dit alors : 'Ne t'inquiète pas, les chiffres sont des amis. Dessinons ensemble pour les apprivoiser !' Et ensemble, elles apprirent à les compter avec des objets.",
        "Grâce à des exercices amusants de l'AMTDA, Hiba comprit enfin la magie des nombres. Aujourd'hui, elle compte joyeusement toutes ses belles créations !"
      ]
    },
    {
      id: 'yassine',
      title: 'Yassine et le mystère des lettres inversées',
      author: 'AMTDA Éditions',
      description: 'Yassine découvre que ses yeux jouent des tours avec les lettres b et d, et apprend des astuces visuelles rigolotes pour lire fluidement.',
      coverColor: '#F58220',
      pages: [
        "Yassine est un garçon énergique qui adore construire des cabanes. Mais quand il lit, le b devient un d, et le p fait la pirouette avec le q.",
        "À l'atelier de l'AMTDA, son éducateur lui montre une astuce : 'Regarde, Yassine, la lettre b a un gros ventre tourné vers la droite, comme un ballon de football !'",
        "Et le d ? Le d a un grand dos bien droit tourné vers la gauche, comme une chaise. Yassine s'amuse à faire les formes avec ses mains.",
        "En s'entraînant tous les jours avec ces petits secrets, les lettres arrêtent de danser. Yassine dévore maintenant ses livres préférés !"
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
      title: 'Rayan et la boussole magique de l’attention',
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
        "Jour après jour, ces petits pas s'accumulent. Sans s'en rendre compte, Amine a lu un livre entier ! Il est fier de sa persévérance et de sa régularité."
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
        "Les rayons du soleil tracent des lignes parallèles entre les grands arbres et le tronc des pins forme de parfaits cylindres élancés.",
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
        "Dès qu'il pose le pinceau sur la toile, de grands mouvements fluides et joyeux se dessinent sans aucun effort et sans aucune fatigue.",
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
        "Quand Thomas a du mal à recopier le tableau, Lina lui prête ses notes colorées. Quand Inès cherche ses mots, ses camarades l'écoutent patiemment.",
        "Cette solidarité transforme l'école en un havre de bonheur. Ensemble, les enfants prouvent que les différences sont des richesses extraordinaires !"
      ]
    }
  ];

  const actualBooks = books.length > 0 ? books : defaultBooks;
  const [selectedBook, setSelectedBook] = useState<Book | null>(actualBooks[0] || null);

  useEffect(() => {
    if (actualBooks.length > 0 && (!selectedBook || !actualBooks.find(b => b.id === selectedBook.id))) {
      setSelectedBook(actualBooks[0]);
      setCurrentPage(0);
    }
  }, [books]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Reset page when book changes
  const handleSelectBook = (book: Book) => {
    playChime('click');
    setSelectedBook(book);
    setCurrentPage(0);
    setIsPlayingAudio(false);
    stopSpeaking();
    setNarratingState(false);
  };

  // Language Vocal lessons - HUGE vocabulary database with 150 phrases (50 French, 50 English, 50 Chinese)
  const [playingLessonId, setPlayingLessonId] = useState<string | null>(null);
  const [vocalLangFilter, setVocalLangFilter] = useState<'all' | 'fr' | 'en' | 'zh'>('all');
  const [vocalCatFilter, setVocalCatFilter] = useState<'all' | 'polite' | 'vocab' | 'expression'>('all');
  
  const [proverbSearch, setProverbSearch] = useState<string>('');
  const [proverbLangFilter, setProverbLangFilter] = useState<'all' | 'fr' | 'en'>('all');
  const [playingProverbId, setPlayingProverbId] = useState<string | null>(null);

  const lessons = VOCAL_LAB_LESSONS;

  const filteredLessons = lessons.filter(l => {
    const matchesLang = vocalLangFilter === 'all' || l.lang === vocalLangFilter;
    const matchesCat = vocalCatFilter === 'all' || l.category === vocalCatFilter;
    return matchesLang && matchesCat;
  });

  const handleZoom = (direction: 'in' | 'out') => {
    playChime('hover');
    if (direction === 'in') {
      setZoomScale(z => Math.min(1.5, z + 0.15));
    } else {
      setZoomScale(z => Math.max(0.85, z - 0.15));
    }
  };

  const handleReadPage = () => {
    if (!selectedBook) return;
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      setNarratingState(false);
    } else {
      setIsPlayingAudio(true);
      setNarratingState(true);
      const targetText = selectedBook.pages[currentPage];
      speakText(
        targetText,
        'fr',
        () => {
          setIsPlayingAudio(false);
          setNarratingState(false);
        }
      );
    }
  };

  const handlePlayLesson = (lesson: LanguageLesson) => {
    if (playingLessonId === lesson.id) {
      stopSpeaking();
      setPlayingLessonId(null);
      setNarratingState(false);
    } else {
      setPlayingLessonId(lesson.id);
      setNarratingState(true);
      speakText(lesson.phrase, lesson.lang, () => {
        setPlayingLessonId(null);
        setNarratingState(false);
      });
    }
  };

  const handlePlayProverb = (proverb: Proverb) => {
    if (playingProverbId === proverb.id) {
      stopSpeaking();
      setPlayingProverbId(null);
      setNarratingState(false);
    } else {
      setPlayingProverbId(proverb.id);
      setNarratingState(true);
      speakText(proverb.text, proverb.lang, () => {
        setPlayingProverbId(null);
        setNarratingState(false);
      });
    }
  };

  const handlePrintBook = () => {
    playChime('click');
    window.print();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 p-6 shadow-xl" id="library-digital">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-[#133C8B] tracking-tight flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#0B722C] animate-pulse" />
              Espace Lecture Numérique & Vocale 📖
            </h3>
            <button
              onClick={() => { playChime('click'); setShowHelpGuide(!showHelpGuide); }}
              className="p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              title="Aide & Guide Pédagogique"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Découvrez nos 9 histoires inclusives éducatives adaptées ou entraînez-vous avec notre laboratoire de vocabulaire interactif.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
          <button
            onClick={() => { playChime('click'); setActiveTab('books'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'books' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            📖 Romans ({actualBooks.length})
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('audio-lessons'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'audio-lessons' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            🗣️ Labo Vocabulaire ({lessons.length})
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('songs'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'songs' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            🎵 Chants Scolaires ({songs.length})
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('culture'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'culture' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <img src="/image/l_1000a_t.png" className="w-3.5 h-3.5 object-contain rounded-full" alt="Maroc" referrerPolicy="no-referrer" />
            Culture Marocaine
          </button>
          <button
            onClick={() => { playChime('click'); setActiveTab('pdfs'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'pdfs' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            📂 Supports PDF ({pdfFiles.length})
          </button>
        </div>
      </div>

      {/* Help pedagogic panel */}
      {showHelpGuide && (
        <div className="bg-[#f4faf2] border border-[#92C83E]/30 p-5 rounded-2xl mb-6 animate-slide-up text-xs space-y-2 text-slate-700">
          <h4 className="font-semibold text-[#0B722C] text-sm">💡 Guide Pédagogique de l'Espace Lecture</h4>
          <p>
            Notre bibliothèque numérique utilise la synthèse vocale intégrée pour aider les enfants dyslexiques ou dysphasiques à associer l'image graphique d'un mot à sa phonologie réelle.
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Lecture Vocale :</strong> Cliquez sur le haut-parleur pour que la voix AMTDA narre le conte page par page.</li>
            <li><strong>Zoom Adaptatif :</strong> Augmentez la taille des caractères pour réduire la fatigue oculaire et limiter le chevauchement visuel des lettres.</li>
            <li><strong>Miroir d'entraînement :</strong> Le laboratoire de prononciation vocale permet d'entendre la phonétique parfaite en Français et Chinois.</li>
          </ul>
        </div>
      )}

      {/* TAB 1: BOOKS READING */}
      {activeTab === 'books' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Sélectionner une histoire :</span>
            <div className="flex flex-wrap gap-2">
              {actualBooks.map((book) => {
                const isSelected = selectedBook?.id === book.id;
                return (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all max-w-[280px] shrink-0 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#92C83E]/10 border-[#92C83E] shadow-2xs' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div 
                      className="w-8 h-10 rounded-lg shrink-0 shadow-2xs border border-white/20 bg-cover bg-center" 
                      style={{ 
                        backgroundColor: book.coverColor || '#0B722C',
                        backgroundImage: (book.coverImage || book.coverUrl) ? `url(${book.coverImage || book.coverUrl})` : undefined
                      }}
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-slate-800 truncate">{book.title}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">{book.author}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedBook && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
              {/* Cover view */}
              <div className="lg:col-span-4 space-y-4">
                 <div className="aspect-[3/4] w-full rounded-2xl shadow-sm p-5 flex flex-col justify-between text-white relative overflow-hidden bg-[length:100%_100%] bg-center bg-no-repeat"
            style={{
              backgroundColor: selectedBook.coverColor || '#0B722C',
              backgroundImage: `url('${selectedBook.coverImage || './fil-couv.jpg'}')`
            }}
                >
                  <div className="space-y-1.5 relative z-10">
                    <span className="bg-white/20 backdrop-blur-xs text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full tracking-wider">
                      Livre Inclusif
                    </span>
                    <h4 className="text-base font-bold leading-tight">
                      {selectedBook.title}
                    </h4>
                  </div>

                  <div className="space-y-1 relative z-10 pt-4">
                    <span className="block text-xs font-semibold opacity-90">{selectedBook.author}</span>
                    <p className="text-[10px] text-white/80 leading-relaxed line-clamp-4">
                      {selectedBook.description}
                    </p>
                  </div>
                </div>

                {/* Dyslexia controls */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-600">Aide Dyslexie :</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      title="Diminuer police"
                    >
                      <ZoomOut className="w-3 h-3" /> A-
                    </button>
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      title="Agrandir police"
                    >
                      <ZoomIn className="w-3 h-3" /> A+
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Content Screen */}
             <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-5 border border-slate-200/80 min-h-[280px] flex flex-col justify-between shadow-2xs">

                {/* Book header bar */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReadPage}
                      className={`p-2 rounded-full cursor-pointer transition-all ${
                        isPlayingAudio 
                          ? 'bg-rose-500 text-white animate-pulse' 
                          : 'bg-[#0B722C] hover:brightness-110 text-white shadow-xs'
                      }`}
                      title={isPlayingAudio ? "Arrêter l'audio" : "Lire à haute voix"}
                    >
                      {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-semibold text-[#133C8B]">Écouter la page</span>
                  </div>
                  <span className="text-xs text-slate-400">Page {currentPage + 1} sur {selectedBook.pages.length}</span>
                  <button onClick={handlePrintBook} className="p-1.5 bg-white hover:bg-slate-100 rounded-xl text-slate-600 border border-slate-200 cursor-pointer">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>

                {/* Page contents */}
                <div className="my-5 flex-1 flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-100/50 shadow-3xs">
                  <p 
                    className="text-slate-800 text-center leading-relaxed font-sans"
                    style={{ fontSize: `${1.05 * zoomScale}rem`, wordSpacing: `${0.04 * zoomScale}em` }}
                  >
                    {selectedBook.pages[currentPage] || "Page vide."}
                  </p>
                </div>

                {/* Page turn controls */}
                <div className="flex justify-between pt-3 border-t border-slate-200">
                  <button
                    onClick={() => { playChime('click'); setCurrentPage(p => Math.max(0, p - 1)); }}
                    disabled={currentPage === 0}
                    className="p-2 bg-[#133C8B] hover:brightness-110 text-white disabled:opacity-30 rounded-xl font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Précédent
                  </button>
                  
                  <button
                    onClick={() => { playChime('click'); setCurrentPage(p => Math.min(selectedBook.pages.length - 1, p + 1)); }}
                    disabled={currentPage === selectedBook.pages.length - 1}
                    className="p-2 bg-[#133C8B] hover:brightness-110 text-white disabled:opacity-30 rounded-xl font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AUDIO LANGUAGE TRAINING */}
      {activeTab === 'audio-lessons' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-start gap-3">
            <Headphones className="w-6 h-6 text-[#0B722C] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Laboratoire de Prononciation Vocale Interactive (150 Phrases)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Entraînez-vous à écouter et prononcer <strong>150 phrases d'apprentissage clés (50 en Français, 50 en Anglais, 50 en Chinois)</strong> pour surmonter les troubles du langage. Sélectionnez une langue et une catégorie, puis cliquez sur une carte pour entendre la prononciation vocale.
              </p>
            </div>
          </div>

          {/* Interactive Filters Panel */}
          <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-200/50 space-y-3">
            {/* Lang filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 min-w-[100px]">Langue active :</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { playChime('click'); setVocalLangFilter('all'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    vocalLangFilter === 'all' ? 'bg-[#133C8B] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  🌐 Toutes ({lessons.length})
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalLangFilter('fr'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalLangFilter === 'fr' ? 'bg-[#133C8B] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>🇫🇷</span> Français ({lessons.filter(l => l.lang === 'fr').length})
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalLangFilter('en'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalLangFilter === 'en' ? 'bg-[#133C8B] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>🇬🇧</span> English ({lessons.filter(l => l.lang === 'en').length})
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalLangFilter('zh'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalLangFilter === 'zh' ? 'bg-[#133C8B] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>🇨🇳</span> 汉语 Chinois ({lessons.filter(l => l.lang === 'zh').length})
                </button>
              </div>
            </div>

            {/* Category filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 min-w-[100px]">Catégorie :</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { playChime('click'); setVocalCatFilter('all'); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    vocalCatFilter === 'all' ? 'bg-[#0B722C] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Tout
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalCatFilter('polite'); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalCatFilter === 'polite' ? 'bg-[#0B722C] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  🤝 Formules de Politesse
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalCatFilter('vocab'); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalCatFilter === 'vocab' ? 'bg-[#0B722C] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  📖 Vocabulaire Thématique
                </button>
                <button
                  onClick={() => { playChime('click'); setVocalCatFilter('expression'); }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    vocalCatFilter === 'expression' ? 'bg-[#0B722C] text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  💡 Expressions & Encouragements
                </button>
              </div>
            </div>
          </div>

          {/* Grid display */}
          {filteredLessons.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-400 italic">Aucune expression ne correspond aux filtres sélectionnés.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson) => {
                const isPlaying = playingLessonId === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handlePlayLesson(lesson)}
                    className={`p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[135px] shadow-2xs hover:shadow-xs hover:scale-[1.01] active:scale-[0.99] hover:border-[#92C83E] ${
                      isPlaying 
                        ? 'bg-[#92C83E]/10 border-[#92C83E] ring-1 ring-[#92C83E]' 
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                        lesson.lang === 'fr' 
                          ? 'bg-blue-50 text-blue-700' 
                          : lesson.lang === 'en' 
                            ? 'bg-sky-50 text-sky-700' 
                            : 'bg-rose-50 text-rose-700'
                      }`}>
                        {lesson.lang === 'fr' ? '🇫🇷 Français' : lesson.lang === 'en' ? '🇬🇧 English' : '🇨🇳 中文'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold italic uppercase tracking-wider">
                        {lesson.category === 'polite' ? '🤝 Politesse' : lesson.category === 'vocab' ? '📖 Vocab' : '💡 Utile'}
                      </span>
                    </div>

                    <div className="my-3 text-center">
                      <h5 className="font-extrabold text-sm leading-relaxed text-slate-800 tracking-tight">
                        {lesson.phrase}
                      </h5>
                      {lesson.pinyin && (
                        <p className="text-[10px] font-bold text-amber-600 font-mono mt-0.5">{lesson.pinyin}</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <p className="text-[10px] text-slate-500 font-medium leading-normal flex-1 line-clamp-2">{lesson.translation}</p>
                      <div className={`p-1.5 rounded-full shrink-0 transition-transform ${isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-[#0B722C] hover:scale-110'}`}>
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DOWNLOADABLE PDF FILES */}
      {activeTab === 'pdfs' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-start gap-3">
            <FileText className="w-6 h-6 text-[#0B722C] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Supports PDF & Fiches d’exercices</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Téléchargez librement les guides pratiques d'accompagnement orthophonique et psycho-pédagogique mis à disposition par l’équipe d’AMTDA Maroc.
              </p>
            </div>
          </div>

          {pdfFiles.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-xs text-slate-500">Aucun support disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pdfFiles.map((file) => (
                <div key={file.id} className="p-4 bg-white border border-slate-200 hover:border-[#92C83E] rounded-2xl flex flex-col justify-between transition-all shadow-3xs group">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#133C8B]/10 text-[#133C8B]">
                        {file.category || 'Support'}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-semibold">{file.size || '1.2 MB'}</span>
                    </div>
                    
                    <h5 className="text-xs font-semibold text-slate-800 line-clamp-2">
                      {file.name}
                    </h5>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <a
                      href={file.url && file.url !== '#' ? file.url : `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        playChime('success');
                      }}
                      className="w-full py-1.5 bg-slate-100 hover:bg-[#0B722C] text-[#0B722C] hover:text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Télécharger support
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* TAB: CHILDREN CHANTS AND SONGS */}
      {activeTab === 'songs' && (
        <div className="animate-fade-in">
          <MusicSection lang={lang} songs={songs} setSongs={setSongs} />
        </div>
      )}

      {/* TAB: MOROCCAN CULTURE CORNER */}
      {activeTab === 'culture' && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="bg-[#133C8B]/5 border border-[#133C8B]/20 p-5 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase bg-[#D97706]/15 text-[#D97706] px-2.5 py-0.5 rounded-full border border-[#D97706]/20 font-sans">
                Patrimoine Marocain Inclusif
                <img src="/image/l_1000a_t.png" className="w-3 h-3 object-contain rounded-full" alt="Maroc" referrerPolicy="no-referrer" />
              </span>
              <h4 className="text-base font-extrabold text-slate-800">Espace Dessins Animés, Magazines & Contes Marocains</h4>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                Explorez la richesse culturelle marocaine à travers des dessins animés éducatifs, des magazines adaptés et des récits traditionnels simplifiés pour les enfants à besoins spécifiques.
              </p>
            </div>
            <img 
              src="./image/LAM.jpg" 
              alt="Maroc" 
              referrerPolicy="no-referrer"
              className="w-24 h-16 object-cover rounded-xl shadow-xs shrink-0 border border-white" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Culture items grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {cultureItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-100">
                      <img 
                        src={item.image || './image/LAM.jpg'} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 left-2 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                        item.type === 'video' ? 'bg-rose-600' : item.type === 'magazine' ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}>
                        {item.type === 'video' && <><Film className="w-3 h-3" /> Dessin Animé</>}
                        {item.type === 'magazine' && <><BookOpenCheck className="w-3 h-3" /> Magazine</>}
                        {item.type === 'tale' && <>📖 Légende & Conte</>}
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 text-left">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed text-left">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                    {item.type === 'video' && (
                      <button 
                        onClick={() => {
                          playChime('click');
                          alert(item.actionPayload || "Lancement du dessin animé éducatif !");
                        }}
                        className="flex-1 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all font-bold text-[10px] rounded-lg text-center cursor-pointer"
                      >
                        Visionner la vidéo 🎥
                      </button>
                    )}
                    {item.type === 'magazine' && (
                      <button 
                        onClick={() => {
                          playChime('success');
                          alert(item.actionPayload || "Ouverture du Magazine...");
                        }}
                        className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all font-bold text-[10px] rounded-lg text-center cursor-pointer"
                      >
                        Lire le Magazine 📖
                      </button>
                    )}
                    {item.type === 'tale' && (
                      <button 
                        onClick={() => {
                          playChime('click');
                          speakText(item.actionPayload || "Il était une fois...", 'fr');
                        }}
                        className="flex-1 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all font-bold text-[10px] rounded-lg text-center cursor-pointer"
                      >
                        Écouter l'Histoire 🗣️
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {cultureItems.length === 0 && (
                <div className="col-span-2 p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">Aucun contenu culturel disponible.</p>
                </div>
              )}
            </div>

            {/* Right panel: Moroccan folklore custom tales reader card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-5 rounded-3xl space-y-4">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                Conte Traditionnel Interactif
              </span>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 text-center">
                <div className="text-3xl">🕌</div>
                <h5 className="text-xs font-extrabold text-[#133C8B]">La Légende du Tapis de Tazenakht</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                  "Dans le village de Tazenakht, chaque couleur de fil raconte une histoire d'entraide. Les tisserandes s'unissent pour créer le tapis le plus doux du pays."
                </p>

                <div className="pt-2 border-t border-slate-100 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      playChime('click');
                      speakText("Dans le village de Tazenakht, chaque couleur de fil raconte une histoire d'entraide. Les tisserandes s'unissent pour créer le tapis le plus doux du pays.", 'fr');
                    }}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Narration 🗣️
                  </button>
                  <button
                    onClick={() => {
                      stopSpeaking();
                    }}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Arrêter
                  </button>
                </div>
              </div>

              <div className="bg-[#92C83E]/10 border border-[#92C83E]/20 p-4 rounded-2xl text-[10px] text-[#0B722C] leading-relaxed">
                <strong>💡 Valeur Pédagogique :</strong> Ces contes marocains intègrent des structures de phrases simplifiées, idéales pour les séances d'orthophonie et d'aide aux enfants atteints de TDAH.
              </div>
            </div>
          </div>

          {/* Full-width Proverbs Section */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-extrabold text-[#133C8B] flex items-center gap-2">
                  💡 Sagesse & Proverbes de la Culture Française & Anglaise (20 Proverbes)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Découvrez des expressions inspirantes bilingues adaptées, avec lecture audio interactive par synthèse vocale.
                </p>
              </div>

              {/* Filter and search */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex bg-white border border-slate-200 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => { playChime('click'); setProverbLangFilter('all'); }}
                    className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                      proverbLangFilter === 'all' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tout ({CULTURE_PROVERBS.length})
                  </button>
                  <button
                    onClick={() => { playChime('click'); setProverbLangFilter('fr'); }}
                    className={`px-3 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                      proverbLangFilter === 'fr' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🇫🇷 Fr ({CULTURE_PROVERBS.filter(p => p.lang === 'fr').length})
                  </button>
                  <button
                    onClick={() => { playChime('click'); setProverbLangFilter('en'); }}
                    className={`px-3 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                      proverbLangFilter === 'en' ? 'bg-[#0B722C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🇬🇧 En ({CULTURE_PROVERBS.filter(p => p.lang === 'en').length})
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={proverbSearch}
                    onChange={(e) => setProverbSearch(e.target.value)}
                    className="bg-white border border-slate-200 pl-8 pr-3 py-1 text-xs rounded-lg focus:outline-none focus:border-[#0B722C] w-40"
                  />
                </div>
              </div>
            </div>

            {/* Grid of Proverbs */}
            {(() => {
              const filteredProverbs = CULTURE_PROVERBS.filter(p => {
                const matchesLang = proverbLangFilter === 'all' || p.lang === proverbLangFilter;
                const matchesSearch = p.text.toLowerCase().includes(proverbSearch.toLowerCase()) ||
                                      p.translation.toLowerCase().includes(proverbSearch.toLowerCase());
                return matchesLang && matchesSearch;
              });

              if (filteredProverbs.length === 0) {
                return (
                  <div className="text-center py-8 bg-white border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-xs text-slate-400 italic">Aucun proverbe ne correspond à vos critères.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProverbs.map((proverb) => {
                    const isPlaying = playingProverbId === proverb.id;
                    return (
                      <div
                        key={proverb.id}
                        onClick={() => handlePlayProverb(proverb)}
                        className={`p-4 bg-white border rounded-2xl cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-xs hover:border-[#92C83E] ${
                          isPlaying ? 'border-[#92C83E] bg-[#92C83E]/5 ring-1 ring-[#92C83E]' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[8px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            proverb.lang === 'fr' ? 'bg-indigo-50 text-indigo-700' : 'bg-sky-50 text-sky-700'
                          }`}>
                            {proverb.lang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
                          </span>
                          <span className="text-[14px]">✍️</span>
                        </div>

                        <div className="my-2 text-left">
                          <h5 className="font-extrabold text-sm leading-relaxed text-slate-800 tracking-tight italic">
                            "{proverb.text}"
                          </h5>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed flex-1">
                            {proverb.translation}
                          </p>
                          <div className={`p-1.5 rounded-full shrink-0 transition-transform ${isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-[#0B722C] hover:scale-110'}`}>
                            <Volume2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
