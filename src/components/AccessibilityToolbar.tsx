import { useState, useEffect } from 'react';
import { Settings, Eye, Sun, Volume2, VolumeX, Type, HelpCircle, X, Check } from 'lucide-react';
import { playChime, speakText, stopSpeaking, isNarrating } from './AudioPlayer';

interface AccessibilitySettings {
  dyslexicFont: boolean;
  fontSize: 'normal' | 'large' | 'huge';
  highContrast: boolean;
  brightness: number; // 0.5 to 1.5
  audioGuide: boolean;
  lineSpacing: 'normal' | 'wide' | 'extra';
  wordSpacing: 'normal' | 'wide' | 'extra';
  highlightLinks: boolean;
  blueLightFilter: boolean;
}

interface AccessibilityToolbarProps {
  onSettingsChange: (settings: AccessibilitySettings) => void;
  lang: 'fr' | 'en' | 'zh';
}

export default function AccessibilityToolbar({ onSettingsChange, lang }: AccessibilityToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [settings, setSettings] = useState<AccessibilitySettings>({
    dyslexicFont: false,
    fontSize: 'normal',
    highContrast: false,
    brightness: 1.0,
    audioGuide: false,
    lineSpacing: 'normal',
    wordSpacing: 'normal',
    highlightLinks: false,
    blueLightFilter: false,
  });

  const toggleOpen = () => {
    playChime('click');
    setIsOpen(!isOpen);
    
    if (!isOpen && settings.audioGuide) {
      speakText("Panneau d'accessibilité AMTDA ouvert. Vous pouvez régler la police, le contraste et la luminosité.", 'fr');
    }
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    onSettingsChange(updated);
    playChime('hover');

    if (key === 'audioGuide') {
      if (value) {
        speakText("Guidage vocal activé.", 'fr');
      } else {
        stopSpeaking(); // stop immediately when deactivated
      }
    }
  };

  // Listen to global hover speech if audioGuide is active
  useEffect(() => {
    if (!settings.audioGuide) {
      stopSpeaking();
      return;
    }

    const handleHoverSpeech = (e: MouseEvent) => {
      if (isNarrating()) return; // Don't interrupt book/lesson audio
      const target = e.target as HTMLElement;
      if (!target) return;

      // Extract spoken content from buttons, links or headers
      const speechAttr = target.getAttribute('aria-label') || target.getAttribute('title') || '';
      let textToSpeak = speechAttr;

      if (!textToSpeak && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'H3' || target.tagName === 'H4')) {
        textToSpeak = target.innerText;
      }

      if (textToSpeak && textToSpeak.length < 150) {
        // Speak briefly
        speakText(textToSpeak, lang, undefined, true);
      }
    };

    window.addEventListener('mouseover', handleHoverSpeech);
    return () => {
      window.removeEventListener('mouseover', handleHoverSpeech);
    };
  }, [settings.audioGuide, lang]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Trigger Button */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 relative"
        title="Accessibilité & Handicap"
        id="btn-accessibility"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 bg-emerald-500 w-3 h-3 rounded-full border border-white"></span>
      </button>

      {/* Settings Drawer */}
      {isOpen && (
        <div className="absolute bottom-18 left-0 w-80 max-h-[70vh] overflow-y-auto scrollbar-thin bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xl p-5 space-y-5 animate-slide-up">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <Settings className="w-4.5 h-4.5 text-sky-600 animate-spin" />
              Panneau d'Accessibilité AMTDA
            </h4>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
              OPTIMISÉ DYS
            </span>
          </div>

          <div className="space-y-4">
            {/* 1. Dyslexic Font support */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="block text-xs font-bold text-slate-700">Police Dyslexique</span>
                  <span className="block text-[10px] text-slate-400">Lettres arrondies adaptées</span>
                </div>
              </div>
              <button
                onClick={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${settings.dyslexicFont ? 'bg-emerald-500 flex justify-end' : 'bg-slate-200 flex justify-start'}`}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
              </button>
            </div>

            {/* 2. Text Size */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-slate-700">Taille du Texte</span>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {(['normal', 'large', 'huge'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => updateSetting('fontSize', sz)}
                    className={`py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      settings.fontSize === sz ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {sz === 'normal' ? 'Standard' : sz === 'large' ? 'Grand' : 'Très Grand'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Contrast adjustment */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Eye className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="block text-xs font-bold text-slate-700">Contraste Élevé</span>
                  <span className="block text-[10px] text-slate-400">Augmente la lisibilité</span>
                </div>
              </div>
              <button
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${settings.highContrast ? 'bg-emerald-500 flex justify-end' : 'bg-slate-200 flex justify-start'}`}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
              </button>
            </div>

            {/* 4. Brightness adjuster */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Sun className="w-4 h-4 text-slate-500" /> Luminosité
                </span>
                <span className="font-mono text-slate-400 font-bold">{Math.round(settings.brightness * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.1"
                value={settings.brightness}
                onChange={(e) => updateSetting('brightness', parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg outline-hidden"
              />
            </div>

            {/* 4b. Anti-fatigue Blue Light Filter */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full bg-amber-400" />
                <div>
                  <span className="block text-xs font-bold text-slate-700">Filtre Anti-Fatigue</span>
                  <span className="block text-[10px] text-slate-400">Teinte chaude reposante</span>
                </div>
              </div>
              <button
                onClick={() => updateSetting('blueLightFilter', !settings.blueLightFilter)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${settings.blueLightFilter ? 'bg-emerald-500 flex justify-end' : 'bg-slate-200 flex justify-start'}`}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
              </button>
            </div>

            {/* 4c. Line Spacing */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-slate-700">Interligne (Espacement)</span>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {(['normal', 'wide', 'extra'] as const).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => updateSetting('lineSpacing', sp)}
                    className={`py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                      settings.lineSpacing === sp ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {sp === 'normal' ? 'Standard' : sp === 'wide' ? 'Large' : 'Très Large'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4d. Word Spacing */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-slate-700">Espacement des Mots</span>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {(['normal', 'wide', 'extra'] as const).map((ws) => (
                  <button
                    key={ws}
                    onClick={() => updateSetting('wordSpacing', ws)}
                    className={`py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                      settings.wordSpacing === ws ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {ws === 'normal' ? 'Standard' : ws === 'wide' ? 'Espacé' : 'Très Espacé'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4e. Highlight interactive items */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Check className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="block text-xs font-bold text-slate-700">Surligner les Liens</span>
                  <span className="block text-[10px] text-slate-400">Encadre les zones cliquables</span>
                </div>
              </div>
              <button
                onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${settings.highlightLinks ? 'bg-emerald-500 flex justify-end' : 'bg-slate-200 flex justify-start'}`}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
              </button>
            </div>

            {/* 5. Audio vocal guidance */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                {settings.audioGuide ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="block text-xs font-bold text-slate-700">Guidage Audio</span>
                  <span className="block text-[10px] text-slate-400">Lit au survol des éléments</span>
                </div>
              </div>
              <button
                onClick={() => updateSetting('audioGuide', !settings.audioGuide)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${settings.audioGuide ? 'bg-emerald-500 flex justify-end' : 'bg-slate-200 flex justify-start'}`}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
