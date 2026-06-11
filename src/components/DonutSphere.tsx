/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function DonutSphere() {
  // A high-end wireframe sphere using SVG and motion
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-violet-600/20 blur-[60px] rounded-full animate-pulse" />
      
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-full h-full preserve-3d"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Latitudes */}
          {[...Array(10)].map((_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="50"
              cy="50"
              rx={48}
              ry={Math.abs(48 * Math.cos(((i - 5) * Math.PI) / 5))}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-violet-500/40"
              style={{
                transform: `rotateX(${(i - 5) * 18}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
          
          {/* Longitudes */}
          {[...Array(10)].map((_, i) => (
            <ellipse
              key={`long-${i}`}
              cx="50"
              cy="50"
              rx={Math.abs(48 * Math.cos(((i - 5) * Math.PI) / 5))}
              ry={48}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-violet-500/40"
              style={{
                transform: `rotateY(${(i - 5) * 18}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}

          {/* Random particles for "sparkle" */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`p-${i}`}
              r="0.4"
              fill="var(--color-violet-primary)"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                cx: 50 + (Math.random() - 0.5) * 80,
                cy: 50 + (Math.random() - 0.5) * 80,
              }}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Center detail */}
      <div className="absolute w-2 h-2 bg-violet-400 rounded-full glow-text blur-[2px]" />
    </div>
  );
}
