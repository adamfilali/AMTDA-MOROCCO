/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Square, Download, Share2, Search, Volume2, Sparkles, Check, Trash2, PlusCircle, AlertCircle } from "lucide-react";
import { audioEffects } from "./AudioEffects";
import { Language, SongItem } from "../types";
import { translations } from "../translations";

interface KidsMusicSectionProps {
  currentLang: Language;
  songs: SongItem[];
  onSongPlay?: (song: SongItem) => void;
  isAdmin?: boolean;
}

export default function KidsMusicSection({ currentLang, songs, onSongPlay }: KidsMusicSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "chant" | "music" | "nursery_rhyme">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Web Audio Synth backup for offline/reliable playing
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const synthActiveRef = useRef<boolean>(false);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    // Stop Web Audio Synth
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    synthActiveRef.current = false;

    // Stop native audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentPlayingId(null);
  };

  // Fun, child-friendly synth melody player
  const playSynthMelody = (songId: string) => {
    stopAllAudio();
    synthActiveRef.current = true;
    setCurrentPlayingId(songId);
    setIsPlaying(true);

    try {
      // Create Web Audio Context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Notes arrays
      let notes: { f: number; d: number }[] = [];
      if (songId.includes("frere") || songId.includes("2")) {
        // Frère Jacques
        const freqs = [261.63, 293.66, 329.63, 261.63, 261.63, 293.66, 329.63, 261.63, 329.63, 349.23, 392.00, 329.63, 349.23, 392.00];
        notes = freqs.map(f => ({ f, d: 400 }));
      } else if (songId.includes("national") || songId.includes("1")) {
        // Moroccan Anthem (Cherifian Anthem theme)
        const freqs = [392, 440, 493.88, 392, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 392];
        notes = freqs.map(f => ({ f, d: 350 }));
      } else if (songId.includes("star") || songId.includes("4")) {
        // Twinkle Twinkle
        const freqs = [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63];
        notes = freqs.map(f => ({ f, d: 450 }));
      } else {
        // Cute random lullaby scale
        const freqs = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 293.66, 349.23, 440.00, 349.23, 293.66];
        notes = freqs.map(f => ({ f, d: 500 }));
      }

      let index = 0;
      const playNextNote = () => {
        if (!synthActiveRef.current) {
          ctx.close();
          return;
        }

        const note = notes[index];
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine"; // child-friendly soft pure tone
        osc.frequency.setValueAtTime(note.f, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d / 1000 - 0.05);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + note.d / 1000);

        index = (index + 1) % notes.length;
        synthIntervalRef.current = setTimeout(playNextNote, note.d);
      };

      playNextNote();
    } catch (e) {
      console.warn("Speech/Synth audio failed: ", e);
    }
  };

  const handlePlayToggle = (song: SongItem) => {
    audioEffects.playClick();
    if (currentPlayingId === song.id) {
      if (isPlaying) {
        // Pause
        if (synthActiveRef.current) {
          stopAllAudio();
        } else if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        // Resume
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => playSynthMelody(song.id));
        } else {
          playSynthMelody(song.id);
        }
      }
    } else {
      // Play new song
      stopAllAudio();
      setCurrentPlayingId(song.id);

      // Check if URL is valid MP3 or fallback to local synth melody
      if (song.url && (song.url.startsWith("http") || song.url.startsWith("/"))) {
        const audio = new Audio(song.audioUrl);
        audioRef.current = audio;
        
        audio.addEventListener("timeupdate", () => {
          setCurrentTime(audio.currentTime);
        });

        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

        audio.addEventListener("ended", () => {
          setIsPlaying(false);
          setCurrentPlayingId(null);
        });

        audio.play()
          .then(() => {
            setIsPlaying(true);
            if (onSongPlay) onSongPlay(song);
          })
          .catch((err) => {
            console.log("Audio URL failed, playing local synth melody instead.", err);
            playSynthMelody(song.id);
          });
      } else {
        // Base64 or empty audioUrl, play synth melody
        playSynthMelody(song.id);
      }
    }
  };

  const handleDownload = (song: SongItem) => {
    audioEffects.playSuccess();

    // Increment download counter in LocalStorage
    const rawSongs = localStorage.getItem("amtda_songs");
    if (rawSongs) {
      const parsed: SongItem[] = JSON.parse(rawSongs);
      const updated = parsed.map(s => {
        if (s.id === song.id) {
          return { ...s, downloadsCount: (s.downloadsCount || 0) + 1 };
        }
        return s;
      });
      localStorage.setItem("amtda_songs", JSON.stringify(updated));
    }

    // Trigger standard browser download
    const link = document.createElement("a");
    link.href = song.audioUrl || "#";
    link.download = `${song.title.FR.toLowerCase().replace(/\s+/g, "_")}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track site stats
    const rawStats = localStorage.getItem("amtda_stats");
    if (rawStats) {
      const parsed = JSON.parse(rawStats);
      parsed.pdfDownloads = (parsed.pdfDownloads || 0) + 1;
      localStorage.setItem("amtda_stats", JSON.stringify(parsed));
    }
  };

  const handleShare = (song: SongItem) => {
    audioEffects.playPop();
    const shareUrl = `${window.location.origin}${window.location.pathname}?song=${song.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(song.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Filter songs
  const filteredSongs = songs.filter((song) => {
    const matchesCategory = selectedCategory === "all" || song.category === selectedCategory;
    const matchesSearch =
      song.title[currentLang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.description[currentLang]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "chant":
        return translations.music_category_chant[currentLang];
      case "music":
        return translations.music_category_music[currentLang];
      case "nursery_rhyme":
        return translations.music_category_nursery[currentLang];
      default:
        return cat;
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-800/10 p-6 md:p-8 shadow-sm" id="kids-music-section">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-orange-500 animate-spin-slow" />
            {currentLang === "AR" ? "فضاء الموسيقى والأناشيد" : "Éveil Musical & Chants"}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight font-sans mt-1">
            {translations.music_section_title[currentLang]}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {translations.music_section_subtitle[currentLang]}
          </p>
        </div>
        <div className="p-3 bg-orange-50 rounded-2xl flex items-center gap-3 border border-orange-200 w-max self-start md:self-auto">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
            <Music className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block font-mono">DYS-Friendly Audios</span>
            <span className="text-xs font-bold text-gray-800">{songs.length} Chants & Rythmes</span>
          </div>
        </div>
      </div>

      {/* Control bar: category tabs and search */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-gray-50 p-3 rounded-2xl border border-gray-100 mb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => { audioEffects.playPop(); setSelectedCategory("all"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "all" ? "bg-orange-500 text-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {translations.music_category_all[currentLang]}
          </button>
          <button
            onClick={() => { audioEffects.playPop(); setSelectedCategory("chant"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "chant" ? "bg-orange-500 text-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {translations.music_category_chant[currentLang]}
          </button>
          <button
            onClick={() => { audioEffects.playPop(); setSelectedCategory("music"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "music" ? "bg-orange-500 text-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {translations.music_category_music[currentLang]}
          </button>
          <button
            onClick={() => { audioEffects.playPop(); setSelectedCategory("nursery_rhyme"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "nursery_rhyme" ? "bg-orange-500 text-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {translations.music_category_nursery[currentLang]}
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={translations.music_search_placeholder[currentLang]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-800 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Grid of Songs */}
      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSongs.map((song) => {
            const isThisPlaying = currentPlayingId === song.id && isPlaying;
            return (
              <div
                key={song.id}
                className={`relative bg-white rounded-2xl border transition-all duration-300 p-4 md:p-5 flex gap-4 items-start group ${
                  isThisPlaying 
                    ? "border-orange-400 shadow-md ring-2 ring-orange-500/10 bg-orange-50/5" 
                    : "border-gray-150 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                {/* Album Cover & Play Button Overlay */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm">
                  <img src={song.cover} alt={song.title[currentLang]} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePlayToggle(song)}
                      className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition"
                    >
                      {isThisPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                  </div>
                  {isThisPlaying && (
                    <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center">
                      {/* Interactive CSS jumpy equalizer lines */}
                      <div className="flex gap-1 items-end h-8">
                        <span className="w-1 bg-white rounded-full animate-equalizer-bar-1 h-3" />
                        <span className="w-1 bg-white rounded-full animate-equalizer-bar-2 h-5" />
                        <span className="w-1 bg-white rounded-full animate-equalizer-bar-3 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Song Meta Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-orange-500/10 text-orange-600">
                      {getCategoryLabel(song.category)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {song.downloadsCount || 0} dl
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate">
                    {song.title[currentLang] || song.title.FR}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {song.description[currentLang] || song.description.FR}
                  </p>

                  {/* Playback time slider (if applicable) */}
                  {isThisPlaying && audioRef.current && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] text-orange-600 font-mono">{formatTime(currentTime)}</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 transition-all duration-100" 
                          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{formatTime(duration)}</span>
                    </div>
                  )}

                  {/* Operational controls */}
                  <div className="flex items-center gap-3 mt-3.5 border-t border-gray-100/60 pt-3">
                    <button
                      onClick={() => handlePlayToggle(song)}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {isThisPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>{currentLang === "AR" ? "تشغيل" : "Écouter"}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownload(song)}
                      className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
                      title={translations.music_download[currentLang]}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{translations.music_download[currentLang]}</span>
                    </button>

                    <button
                      onClick={() => handleShare(song)}
                      className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors ml-auto relative"
                      title={translations.music_share[currentLang]}
                    >
                      {copiedId === song.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{translations.music_share[currentLang]}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-500">{translations.music_empty[currentLang]}</p>
        </div>
      )}

    </div>
  );
}
