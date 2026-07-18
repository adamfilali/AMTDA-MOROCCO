/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BookOpen, ZoomIn, ZoomOut, Printer, Download, Volume2, HelpCircle, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { audioEffects } from "./AudioEffects";
import { Language, BookItem } from "../types";

interface DigitalLibraryProps {
  currentLang: Language;
  appLogo: string;
  library: BookItem[];
}

export default function DigitalLibrary({ currentLang, appLogo, library }: DigitalLibraryProps) {
  const [selectedBook, setSelectedBook] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100); // 100, 115, 130, 145 (%)
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  useEffect(() => {
    if (selectedBook >= library.length && library.length > 0) {
      setSelectedBook(0);
      setCurrentPage(0);
    }
  }, [library, selectedBook]);

  if (library.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-emerald-800/10 shadow-xl mt-8 text-center py-12" id="inclusive-library-panel">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-700">Aucun livre disponible</h3>
        <p className="text-xs text-gray-400 mt-1">L'administrateur de l'association n'a pas encore ajouté de romans ou bandes dessinées.</p>
      </div>
    );
  }

  const handleZoomIn = () => {
    audioEffects.playPop();
    if (zoomLevel < 145) {
      setZoomLevel((prev) => prev + 15);
    }
  };

  const handleZoomOut = () => {
    audioEffects.playPop();
    if (zoomLevel > 100) {
      setZoomLevel((prev) => prev - 15);
    }
  };

  const handleNarrate = (text: string) => {
    audioEffects.playClick();
    if (isNarrating) {
      window.speechSynthesis.cancel();
      (window as any).__amtda_playing_deliberate_speech = false;
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      (window as any).__amtda_playing_deliberate_speech = true;

      // Select proper voices based on current language
      const voices = window.speechSynthesis.getVoices();
      if (currentLang === "FR") {
        utterance.lang = "fr-FR";
        const frVoice = voices.find(v => v.lang.startsWith("fr") || v.name.includes("French") || v.name.includes("Thomas") || v.name.includes("Amelie"));
        if (frVoice) utterance.voice = frVoice;
      } else if (currentLang === "AR") {
        utterance.lang = "ar-SA";
        const arVoice = voices.find(v => v.lang.startsWith("ar") || v.name.includes("Arabic") || v.name.includes("Maged") || v.name.includes("Laila"));
        if (arVoice) utterance.voice = arVoice;
      } else {
        utterance.lang = "en-US";
        const enVoice = voices.find(v => v.lang.startsWith("en") || v.name.includes("English") || v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.rate = 0.8; // Calme et plus lent pour DYS
      
      utterance.onend = () => {
        (window as any).__amtda_playing_deliberate_speech = false;
        setIsNarrating(false);
      };
      
      utterance.onerror = () => {
        (window as any).__amtda_playing_deliberate_speech = false;
        setIsNarrating(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDownload = (bookTitle: string) => {
    audioEffects.playSuccess();
    const rawStats = localStorage.getItem("amtda_stats");
    if (rawStats) {
      const parsed = JSON.parse(rawStats);
      parsed.pdfDownloads = (parsed.pdfDownloads || 0) + 1;
      localStorage.setItem("amtda_stats", JSON.stringify(parsed));
    }
    // Simple custom styled toast/alert mock
    alert(`[AMTDA] Téléchargement sécurisé : "${bookTitle}" est disponible hors-ligne.`);
  };

  const activeBook = library[selectedBook];
  const activePage = activeBook.pages[currentPage] || activeBook.pages[0];

  const handleBookChange = (idx: number) => {
    audioEffects.playClick();
    setSelectedBook(idx);
    setCurrentPage(0);
    window.speechSynthesis.cancel();
    (window as any).__amtda_playing_deliberate_speech = false;
    setIsNarrating(false);
  };

  const handlePrintBook = () => {
    audioEffects.playClick();
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-emerald-800/10 shadow-xl mt-8" id="inclusive-library-panel">
      
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">
            Espace Lecture Numérique
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 font-sans tracking-tight">
            Bibliothèque Numérique Inclusive
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Romans, contes et bandes dessinées adaptés avec synthèse vocale intégrée, zoom dynamique et mise en page optimisée pour DYS.
          </p>
        </div>

        {/* CONTROLS ROW */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEffects.playClick();
              setShowGuide(!showGuide);
            }}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
              showGuide ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Guide d'inclusion</span>
          </button>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel === 100}
              className="p-2 hover:bg-gray-200 rounded-xl text-gray-700 transition disabled:opacity-45 cursor-pointer"
              title="Réduire la taille"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold font-mono px-2.5 text-gray-600">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel === 145}
              className="p-2 hover:bg-gray-200 rounded-xl text-gray-700 transition disabled:opacity-45 cursor-pointer"
              title="Agrandir la taille"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE GUIDE BANNER */}
      {showGuide && (
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 mb-6 animate-fade-in flex gap-4 items-start">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-emerald-950 font-sans uppercase">
              Guide d'Utilisation de la Bibliothèque Numérique
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs text-gray-700 leading-relaxed">
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p><strong>Lecture vocale intégrée :</strong> Activez le bouton "Narration" pour écouter le texte à vitesse adaptée (sans interruption par le survol de la souris).</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p><strong>Mise en page DYS :</strong> Utilisez le zoom (100% à 145%) pour faciliter la distinction des graphèmes et soulager la fatigue oculaire.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left selector shelf */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
            Étagère des Livres :
          </span>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-premium-scroll">
            {library.map((book, idx) => (
              <button
                key={book.id}
                onClick={() => handleBookChange(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex gap-4 ${
                  selectedBook === idx
                    ? "bg-emerald-50/50 border-emerald-500 shadow-sm"
                    : "bg-white border-gray-100 hover:bg-gray-50"
                }`}
              >
                <img
                  src={book.cover}
                  alt={book.title[currentLang]}
                  className="w-12 h-16 object-cover rounded-lg shadow-sm border flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[8px] font-extrabold uppercase bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-md">
                    {book.type === "novel" ? "Roman" : book.type === "comic" ? "Bande Dessinée" : "Magazine"}
                  </span>
                  <h5 className="font-bold text-gray-900 text-xs mt-1 leading-tight line-clamp-1">
                    {book.title[currentLang]}
                  </h5>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {book.desc[currentLang]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Reader Canvas */}
        <div className="lg:col-span-8 bg-gray-50 rounded-3xl p-6 border border-gray-150 relative flex flex-col justify-between min-h-[420px]" id="inclusive-reader-canvas">
          
          {/* Main Book Reader Sheet */}
          <div style={{ fontSize: `${zoomLevel / 100}rem` }} className="transition-all duration-300">
            {/* Page Header */}
            <div className="flex justify-between items-center border-b border-gray-150 pb-3 mb-4 text-xs font-mono text-gray-400">
              <span className="font-bold text-emerald-800 uppercase">
                {activeBook.title[currentLang]}
              </span>
              <span>
                Page {currentPage + 1} / {activeBook.pages.length}
              </span>
            </div>

            {/* Illustration Area & Comic speech bubbles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 items-start">
              
              <div className="rounded-2xl overflow-hidden shadow-inner border border-gray-200 aspect-[4/3] relative bg-white flex-shrink-0">
                <img
                  src={activePage.illustration}
                  alt="Illustration de page"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                {/* Speech bubbles if Comic panel */}
                {activeBook.type === "comic" && activePage.bubbles && (
                  <div className="space-y-3">
                    {activePage.bubbles.map((bub, bIdx) => (
                      <div
                        key={bIdx}
                        className={`p-3 rounded-2xl relative border shadow-sm ${
                          bub.speaker === "Sarah" || bub.speaker === "Sarah (Pensée)"
                            ? "bg-amber-50 border-amber-200 text-slate-900 ml-4"
                            : "bg-white border-gray-200 text-slate-800 mr-4"
                        }`}
                      >
                        <span className="text-[9px] font-extrabold text-emerald-800 uppercase block mb-1">
                          {bub.speaker} :
                        </span>
                        <p className="text-xs leading-relaxed font-semibold">
                          {bub.text[currentLang]}
                        </p>
                        {/* Audio speech bubble trigger */}
                        <button
                          onClick={() => handleNarrate(bub.text[currentLang])}
                          className="absolute bottom-2 right-2 p-1 bg-emerald-600 text-white rounded-lg hover:scale-105"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main page description text */}
                <p className="text-xs text-gray-700 leading-relaxed font-semibold bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  {activePage.text[currentLang]}
                </p>
              </div>

            </div>
          </div>

          {/* READER BOTTOM ACTIONS FOOTER */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-gray-200/60 pt-4 gap-4">
            
            {/* Narrator actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNarrate(activePage.text[currentLang])}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isNarrating ? "bg-amber-500 text-slate-950 animate-pulse" : "bg-emerald-600 text-white hover:bg-emerald-500"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isNarrating ? "Arrêter la narration" : "Narration Vocale"}</span>
              </button>

              <button
                onClick={() => handlePrintBook()}
                className="p-2.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl text-gray-600 transition"
                title="Imprimer"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDownload(activeBook.title[currentLang])}
                className="p-2.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl text-gray-600 transition"
                title="Télécharger"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Turn page actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="p-2.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl text-gray-700 transition disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold font-mono text-gray-500">
                {currentPage + 1} / {activeBook.pages.length}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(activeBook.pages.length - 1, p + 1))}
                disabled={currentPage === activeBook.pages.length - 1}
                className="p-2.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl text-gray-700 transition disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* CRITICAL WATERMARK: watermark print overlay on documents */}
          <div className="hidden print:flex flex-col items-center justify-center mt-12 border-t pt-4" id="amtda-library-print-watermark">
            <div className="opacity-25 w-12 h-12 flex items-center justify-center overflow-hidden mb-1">
              <img src={appLogo} alt="Logo AMTDA" className="max-w-full max-h-full object-contain filter grayscale" />
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
    </div>
  );
}
