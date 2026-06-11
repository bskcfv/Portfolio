import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "motion";
import { User } from "lucide-react";

// --- INSTRUCCIONES DE PERSONALIZACIÓN ---
// Puedes guardar tu foto en la ruta de tu proyecto como "assets/profile.jpg" o similar.
// Si deseas cambiar el nombre o extensión del archivo, edita el valor de abajo:
const PROFILE_IMAGE_URL = "assets/profile.jpg";

export default function MagneticFilings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE_URL);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const filings = containerRef.current.querySelectorAll(".filing");

    // Animación radial con stagger para las partículas rotatorias
    animate(
      filings,
      { rotate: [0, 360] },
      {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: stagger(0.015),
      }
    );
  }, []);

  return (
    <div className="relative p-8 group flex items-center justify-center">
      {/* Iluminación morada de fondo en degradado tipo glow */}
      <div className="absolute inset-0 bg-violet-600/10 blur-[100px] rounded-full group-hover:bg-violet-500/20 transition-all duration-500" />
      
      {/* Campo de filamentos magnéticos */}
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] gap-1 mx-auto relative z-10"
      >
        {Array.from({ length: 400 }).map((_, i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          // Centro exacto de la grilla de 20x20 es (9.5, 9.5)
          const dist = Math.sqrt(Math.pow(row - 9.5, 2) + Math.pow(col - 9.5, 2));
          
          // Ocultar las partículas del área central para abrir espacio al círculo de perfil
          const isCenter = dist < 5.2;

          return (
            <div
              key={i}
              className={`filing transition-all duration-300 ${isCenter ? "opacity-0 pointer-events-none" : ""}`}
              style={{
                width: "1.5px",
                height: "10px",
                opacity: isCenter ? 0 : 0.35,
                margin: "auto",
                borderRadius: "1px",
                boxShadow: "0 0 6px rgba(168, 85, 247, 0.5)",
                background: "linear-gradient(to bottom, #ffffff, #c084fc)",
              }}
            />
          );
        })}
      </div>

      {/* Círculo contenedor de la foto de perfil en el centro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145px] h-[145px] sm:w-[185px] sm:h-[185px] rounded-full z-20 overflow-hidden bg-black/70 border-2 border-violet-500/50 backdrop-blur-md flex items-center justify-center group-hover:border-violet-400 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
        
        {!imageError ? (
          <img
            src={imgSrc}
            alt="Cristian Valderrama"
            className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Placeholder de sistema de alta fidelidad si aún no se coloca la imagen */
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="text-[9px] font-mono text-violet-400 uppercase tracking-widest mb-1.5 animate-pulse">
              [ AGENTE_AVATAR ]
            </div>
            <User className="w-10 h-10 sm:w-14 sm:h-14 text-violet-500/80 animate-pulse" />
            <div className="text-[8px] font-mono text-gray-500 mt-2 leading-relaxed">
              Coloca tu foto en:
              <br />
              <span className="text-violet-400 font-bold select-all">assets/profile.jpg</span>
            </div>
          </div>
        )}

        {/* Efecto de escaneo scanline e iluminación morada de vidrio translúcido */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-transparent pointer-events-none border border-white/5 rounded-full" />
      </div>

      {/* Anillos concéntricos orbitales exteriores luminosos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[152px] h-[152px] sm:w-[195px] sm:h-[195px] rounded-full border border-violet-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] z-30 pointer-events-none animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[205px] sm:h-[205px] rounded-full border border-dashed border-violet-500/15 z-0 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
    </div>
  );
}
