import { useState, useEffect } from 'react';

// Web Audio API Sound Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

// Play a quick, clean button click/hover chime
export function playChime(type: 'hover' | 'click' | 'success' | 'fail' = 'hover') {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'hover') {
      // Gentle soft high chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'click') {
      // Solid click chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'success') {
      // Happy ascending arpeggio
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'fail') {
      // Sad buzzer
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    console.error("Web Audio API not allowed or supported yet", e);
  }
}

// Play a telephone ring sound (pulsed dual-tone)
let phoneRingInterval: any = null;
export function startPhoneRing() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    stopPhoneRing(); // clear previous if any

    let ringCount = 0;
    const playSingleRing = () => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Traditional Moroccan telephone ring dual tones: 400Hz + 450Hz modulated
      osc1.frequency.setValueAtTime(400, ctx.currentTime);
      osc2.frequency.setValueAtTime(450, ctx.currentTime);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      // Pulsating ring effect
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime + 0.5);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);
    };

    playSingleRing();
    phoneRingInterval = setInterval(() => {
      ringCount++;
      if (ringCount < 3) {
        playSingleRing();
      } else {
        stopPhoneRing();
      }
    }, 1200);
  } catch (e) {
    console.error(e);
  }
}

export function stopPhoneRing() {
  if (phoneRingInterval) {
    clearInterval(phoneRingInterval);
    phoneRingInterval = null;
  }
}

// Background Music Synthesizer (discreet, professional, slow ambient pad)
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

export function startAmbientMusic() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    if (ambientOsc1) return; // already running

    ambientOsc1 = ctx.createOscillator();
    ambientOsc2 = ctx.createOscillator();
    ambientGain = ctx.createGain();

    ambientOsc1.type = 'sine';
    ambientOsc2.type = 'sine';

    // Soft warm chords (E.g., C3 = 130.81Hz, G3 = 196.00Hz)
    ambientOsc1.frequency.setValueAtTime(130.81, ctx.currentTime);
    ambientOsc2.frequency.setValueAtTime(196.00, ctx.currentTime);

    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientGain.gain.setValueAtTime(0.015, ctx.currentTime); // extremely discreet

    ambientOsc1.start();
    ambientOsc2.start();
  } catch (e) {
    console.error(e);
  }
}

export function stopAmbientMusic() {
  try {
    if (ambientOsc1) {
      ambientOsc1.stop();
      ambientOsc1.disconnect();
      ambientOsc1 = null;
    }
    if (ambientOsc2) {
      ambientOsc2.stop();
      ambientOsc2.disconnect();
      ambientOsc2 = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  } catch (e) {
    console.error(e);
  }
}

// TEXT-TO-SPEECH (TTS) WRAPPER WITH SOLID ARABIC SUPPORT
let speechUtterance: SpeechSynthesisUtterance | null = null;
let isNarratingMainContent = false;

export function setNarratingState(state: boolean) {
  isNarratingMainContent = state;
}

export function isNarrating() {
  return isNarratingMainContent;
}

// Pre-load voices on browser loading
let voicesList: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && window.speechSynthesis) {
  voicesList = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voicesList = window.speechSynthesis.getVoices();
  };
}

export function speakText(text: string, lang: 'fr' | 'ar' | 'en' | 'zh', callback?: () => void, isGuide = false) {
  try {
    // If it's a guide/hover voice and we are currently narrating main content (book/lessons), ignore it to avoid cutting off
    if (isGuide && isNarratingMainContent) {
      if (callback) callback();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    speechUtterance = new SpeechSynthesisUtterance(text);
    
    // Configure rate and pitch for pedagogical clarity
    speechUtterance.rate = lang === 'ar' ? 0.8 : 0.85;
    speechUtterance.pitch = 1.05; // Soft child-friendly slightly higher pitch

    // Resolve exact language tags
    if (lang === 'ar') {
      speechUtterance.lang = 'ar-SA';
    } else if (lang === 'fr') {
      speechUtterance.lang = 'fr-FR';
    } else if (lang === 'en') {
      speechUtterance.lang = 'en-US';
    } else if (lang === 'zh') {
      speechUtterance.lang = 'zh-CN';
    }

    // Try to find the exact voice matching language tag
    const voices = voicesList.length > 0 ? voicesList : window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (lang === 'ar') {
      // Look for any Arabic voice (ar-SA, ar-EG, etc.) or voices containing 'Arabic'
      selectedVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.toLowerCase().includes('arabic') || v.lang.startsWith('ar-'));
    } else if (lang === 'fr') {
      selectedVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.toLowerCase().includes('french'));
    } else if (lang === 'en') {
      selectedVoice = voices.find(v => v.lang.startsWith('en') || v.lang.toLowerCase().includes('english'));
    } else if (lang === 'zh') {
      selectedVoice = voices.find(v => v.lang.startsWith('zh') || v.lang.toLowerCase().includes('chinese'));
    }

    if (selectedVoice) {
      speechUtterance.voice = selectedVoice;
    }

    if (callback) {
      speechUtterance.onend = () => {
        if (!isGuide) isNarratingMainContent = false;
        callback();
      };
      speechUtterance.onerror = () => {
        if (!isGuide) isNarratingMainContent = false;
        callback();
      };
    }

    window.speechSynthesis.speak(speechUtterance);
  } catch (e) {
    console.error("Text to speech failed to initiate", e);
    if (callback) callback();
  }
}

export function stopSpeaking() {
  try {
    window.speechSynthesis.cancel();
    isNarratingMainContent = false;
  } catch (e) {
    console.error(e);
  }
}
