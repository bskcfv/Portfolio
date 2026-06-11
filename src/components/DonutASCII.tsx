/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export default function DonutASCII() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0;
    let B = 0;
    const width = 40;
    const height = 22;

    const renderDonut = () => {
      const b = new Array(width * height).fill(" ");
      const z = new Array(width * height).fill(0);

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const c = Math.sin(i);
          const d = Math.cos(j);
          const e = Math.sin(A);
          const f = Math.sin(j);
          const g = Math.cos(A);
          const h = d + 2;
          const D = 1 / (c * h * e + f * g + 5);
          const l = Math.cos(i);
          const m = Math.cos(B);
          const n = Math.sin(B);

          const t = c * h * g - f * e;

          const x = Math.floor(width / 2 + 30 * D * (l * h * m - t * n));
          const y = Math.floor(height / 2 + 15 * D * (l * h * n + t * m));

          const o = x + width * y;
          const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

          if (y >= 0 && y < height && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }

      let output = "";
      for (let i = 0; i < b.length; i++) {
        output += b[i];
        if (i % width === width - 1) output += "\n";
      }

      if (preRef.current) {
        preRef.current.textContent = output;
      }

      A += 0.04;
      B += 0.02;
    };

    const intervalId = setInterval(renderDonut, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative font-mono leading-[0.8] text-[8px] sm:text-[10px] md:text-[12px] text-violet-500/90 flex items-center justify-center h-full w-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_60%)]">
      {/* Background Glow Effects - Seamless atmospheric integration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        {/* Soft diffusion centered within the container to avoid clipping */}
        <div className="absolute w-[110%] h-[110%] bg-violet-600/5 blur-[100px] rounded-full animate-pulse" />
      </div>
      
      <pre ref={preRef} className="z-10 bg-transparent text-center select-none drop-shadow-[0_0_15px_rgba(139,92,246,0.15)]" />
    </div>
  );
}
