/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

const WIDTH = 40;
const HEIGHT = 22;
const FRAME_INTERVAL = 80;
const SHADES = ".,-~:;=!*#$@";

const iAngles = (() => {
  const angles: Array<{ sin: number; cos: number }> = [];
  for (let i = 0; i < 6.28; i += 0.02) {
    angles.push({ sin: Math.sin(i), cos: Math.cos(i) });
  }
  return angles;
})();

const jAngles = (() => {
  const angles: Array<{ sin: number; cos: number }> = [];
  for (let j = 0; j < 6.28; j += 0.07) {
    angles.push({ sin: Math.sin(j), cos: Math.cos(j) });
  }
  return angles;
})();

export default function DonutASCII() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0;
    let B = 0;
    let animationFrame = 0;
    let lastFrame = 0;
    let isVisible = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const b = new Array(WIDTH * HEIGHT).fill(" ");
    const z = new Array(WIDTH * HEIGHT).fill(0);

    const renderDonut = () => {
      b.fill(" ");
      z.fill(0);
      const sinA = Math.sin(A);
      const cosA = Math.cos(A);
      const sinB = Math.sin(B);
      const cosB = Math.cos(B);

      for (const j of jAngles) {
        for (const i of iAngles) {
          const c = i.sin;
          const d = j.cos;
          const e = sinA;
          const f = j.sin;
          const g = cosA;
          const h = d + 2;
          const D = 1 / (c * h * e + f * g + 5);
          const l = i.cos;
          const m = cosB;
          const n = sinB;

          const t = c * h * g - f * e;

          const x = Math.floor(WIDTH / 2 + 30 * D * (l * h * m - t * n));
          const y = Math.floor(HEIGHT / 2 + 15 * D * (l * h * n + t * m));

          const o = x + WIDTH * y;
          const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

          if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && D > z[o]) {
            z[o] = D;
            b[o] = SHADES[N > 0 ? N : 0];
          }
        }
      }

      let output = "";
      for (let i = 0; i < b.length; i++) {
        output += b[i];
        if (i % WIDTH === WIDTH - 1) output += "\n";
      }

      if (preRef.current) {
        preRef.current.textContent = output;
      }

      A += 0.04;
      B += 0.02;
    };

    const tick = (timestamp: number) => {
      if (isVisible && !document.hidden && timestamp - lastFrame >= FRAME_INTERVAL) {
        renderDonut();
        lastFrame = timestamp;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '120px 0px' },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    renderDonut();

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(tick);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative font-mono leading-[0.8] text-[8px] sm:text-[10px] md:text-[12px] text-violet-500/90 flex items-center justify-center h-full w-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_60%)]">
      {/* Background Glow Effects - Seamless atmospheric integration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        {/* Soft diffusion centered within the container to avoid clipping */}
        <div className="absolute w-[110%] h-[110%] bg-violet-600/5 blur-[100px] rounded-full animate-pulse" />
      </div>
      
      <pre ref={preRef} className="z-10 bg-transparent text-center select-none drop-shadow-[0_0_15px_rgba(139,92,246,0.15)]" />
    </div>
  );
}
