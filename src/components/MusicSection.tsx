import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Download, Share2, Volume2, VolumeX, Heart, Library, Search } from 'lucide-react';
import { playChime, speakText, stopSpeaking } from './AudioPlayer';
import { Song, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MusicSectionProps {
  lang: Language;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
}

export default function MusicSection({ lang, songs, setSongs }: MusicSectionProps) {
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('amtda_fav_songs');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [speakLyricsActive, setSpeakLyricsActive] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('amtda_fav_songs', JSON.stringify(favorites));
  }, [favorites]);

  // Set first song as default if changed
  useEffect(() => {
    if (songs.length > 0 && (!currentSong || !songs.find(s => s.id === currentSong.id))) {
      setCurrentSong(songs[0]);
    }
  }, [songs]);

  // Handle audio player
  useEffect(() => {
    if (currentSong) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(currentSong.url);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleAudioEnded);
      
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 180); // default fallback
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    playChime('click');
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Stop any voice synthesizer reading lyrics first
      if (speakLyricsActive) {
        stopSpeaking();
        setSpeakLyricsActive(false);
      }
      audioRef.current.play().catch(() => {
        // Fallback simulation if browser blocks media or dummy url
        console.log("Playing simulated audio...");
      });
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime('success');
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fid => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleDownload = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime('success');
    
    // Generate a downloadable text file containing lyrics and info
    const content = `AMTDA Maroc - Chanson pour Enfants\n\nTitre : ${song.title}\nArtiste : ${song.artist}\n\nParoles / Paroles :\n------------------------------\n${song.lyrics || 'Aucun texte.'}\n\nTéléchargé depuis l'application AMTDA Maroc.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${song.title.replace(/\s+/g, '_')}_paroles.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Also increment downloads statistic if trackAction is available (handled silently here)
  };

  const handleShare = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime('click');
    const shareText = `🎵 Écoute "${song.title}" par ${song.artist} sur l'application inclusive AMTDA Maroc ! 🇲🇦`;
    
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: shareText,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("Lien de partage copié dans le presse-papier ! / تم نسخ رابط المشاركة بنجاح");
    }
  };

  const handleReadLyricsAloud = () => {
    if (!currentSong || !currentSong.lyrics) return;
    playChime('click');

    if (speakLyricsActive) {
      stopSpeaking();
      setSpeakLyricsActive(false);
    } else {
      // Pause active music to read clearly
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setSpeakLyricsActive(true);
      speakText(currentSong.lyrics, 'fr', () => {
        setSpeakLyricsActive(false);
      });
    }
  };

  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.lyrics && s.lyrics.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-slate-200 p-6 shadow-xl space-y-6" id="kids-music">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#133C8B] tracking-tight flex items-center gap-2">
            <Music className="w-6 h-6 text-[#92C83E] animate-bounce" />
            Espace Musique & Chants Scolaires 🎵 أناشيد للأطفال
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Écoutez des chants rythmiques et éducatifs, apprenez les paroles et téléchargez vos morceaux préférés.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher un chant... / بحث"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-1.5 rounded-xl text-xs outline-hidden focus:border-[#92C83E] transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: List of songs */}
        <div className="lg:col-span-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Chansons Disponibles ({filteredSongs.length})
          </span>

          {filteredSongs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-400">Aucune chanson trouvée.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSongs.map((song) => {
                const isActive = currentSong?.id === song.id;
                const isFav = favorites.includes(song.id);
                return (
                  <motion.div
                    key={song.id}
                    onClick={() => {
                      playChime('click');
                      setCurrentSong(song);
                      setProgress(0);
                      setCurrentTime(0);
                      if (speakLyricsActive) {
                        stopSpeaking();
                        setSpeakLyricsActive(false);
                      }
                    }}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-[#92C83E]/10 border-[#92C83E] shadow-2xs' 
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-150'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#92C83E] text-white animate-pulse' : 'bg-[#133C8B]/10 text-[#133C8B]'
                      }`}>
                        <Music className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate text-left">{song.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium text-left truncate">{song.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => toggleFavorite(song.id, e)}
                        className={`p-1.5 rounded-lg hover:bg-white/80 transition-all cursor-pointer ${
                          isFav ? 'text-rose-500' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="Favori"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => handleDownload(song, e)}
                        className="p-1.5 rounded-lg hover:bg-white/80 text-[#0B722C] transition-all cursor-pointer"
                        title="Télécharger paroles"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: Interactive Player Card & Lyrics */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 rounded-3xl p-5 flex flex-col justify-between shadow-3xs min-h-[420px]">
          {currentSong ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {/* Header Info */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-[#92C83E]/25 text-[#0B722C] rounded-full border border-[#92C83E]/20">
                    Lecture En Cours
                  </span>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1.5 text-left">{currentSong.title}</h4>
                  <p className="text-xs text-slate-500 font-medium text-left">{currentSong.artist}</p>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => handleShare(currentSong, e)}
                    className="p-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 cursor-pointer transition-all"
                    title="Partager ce chant"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDownload(currentSong, e)}
                    className="p-2 bg-white border border-slate-200 hover:bg-[#0B722C] hover:text-white rounded-xl text-slate-600 cursor-pointer transition-all"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated Equalizer Visualizer */}
              <div className="h-16 flex items-end justify-center gap-1.5 px-4 bg-white/70 rounded-2xl border border-slate-150 relative overflow-hidden my-2">
                {isPlaying ? (
                  <>
                    <span className="text-[10px] absolute top-2 left-3 text-slate-400 font-mono flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Audio actif
                    </span>
                    <div className="flex items-end justify-center gap-1 h-10 mb-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => {
                        const randomDur = 0.5 + Math.random() * 0.8;
                        return (
                          <span
                            key={bar}
                            className="w-1 bg-[#92C83E] rounded-full origin-bottom"
                            style={{
                              height: '100%',
                              animation: `sound-bar-rise 1s ease-in-out infinite alternate`,
                              animationDelay: `${bar * 0.05}s`,
                              animationDuration: `${randomDur}s`
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-[10px] text-slate-400 italic mb-6">Lecteur en pause. Appuyez sur lecture pour démarrer.</p>
                )}
              </div>

              {/* Style for animation */}
              <style>{`
                @keyframes sound-bar-rise {
                  0% { transform: scaleY(0.15); }
                  100% { transform: scaleY(0.9); }
                }
              `}</style>

              {/* Progress Bar & Controls */}
              <div className="space-y-2 bg-white/50 p-3 rounded-2xl border border-slate-100">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full accent-[#0B722C] cursor-pointer h-1.5 bg-slate-200 rounded-lg outline-hidden"
                />

                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 180)}</span>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-[#0B722C] hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleReadLyricsAloud}
                    className={`p-2.5 rounded-full cursor-pointer transition-all ${
                      speakLyricsActive 
                        ? 'bg-rose-500 text-white animate-pulse' 
                        : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100'
                    }`}
                    title={speakLyricsActive ? "Arrêter la narration" : "Écouter les paroles lues"}
                  >
                    {speakLyricsActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] text-slate-400 font-bold">Lecture Vocale</span>
                </div>
              </div>

              {/* Lyrics card */}
              <div className="bg-white rounded-2xl border border-slate-150 p-4 flex-1 flex flex-col justify-between max-h-[160px] overflow-y-auto">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5 text-left tracking-wide">
                  Paroles du chant / كلمات الأنشودة
                </span>
                <p className="text-slate-700 text-xs text-center font-sans leading-relaxed whitespace-pre-line py-1">
                  {currentSong.lyrics || "Pas de paroles renseignées pour ce chant."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Library className="w-12 h-12 text-slate-300 animate-pulse mb-3" />
              <p className="text-xs text-slate-400">Aucune chanson sélectionnée.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
