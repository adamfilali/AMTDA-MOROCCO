/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

interface FloatingLetter {
  id: number;
  char: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
}

export default function FloatingLettersBackground() {
  const [letters, setLetters] = useState<FloatingLetter[]>([]);

  useEffect(() => {
    const chars = [
      "أ", "ب", "ت", "ج", "د", "ر", "س", "ع", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي",
      "A", "B", "C", "D", "E", "F", "M", "S", "R", "T", "X", "Y", "Z", "α", "β", "γ"
    ];
    const generated: FloatingLetter[] = Array.from({ length: 30 }).map((_, i) => {
      const left = Math.random() * 95; // %
      const delay = Math.random() * 20; // seconds delay
      const duration = 20 + Math.random() * 25; // seconds duration
      const size = 14 + Math.random() * 32; // px size
      const char = chars[Math.floor(Math.random() * chars.length)];
      return {
        id: i,
        char,
        left: `${left}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        size: `${size}px`
      };
    });
    setLetters(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true" id="floating-letters-cosmos">
      {letters.map((letter) => (
        <span
          key={letter.id}
          className="absolute font-serif text-slate-400/5 font-extrabold select-none animate-float-slow"
          style={{
            left: letter.left,
            fontSize: letter.size,
            animationDelay: letter.delay,
            animationDuration: letter.duration,
            bottom: "-10%"
          }}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
}
