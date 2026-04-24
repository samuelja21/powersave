"use client"

import { useState } from "react"
import { Play } from "lucide-react"

export function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section
      id="video"
      className="bg-[#0d1f12] py-20 px-6 lg:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10">
          Demo en vídeo
        </span>

        <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance mb-4">
          Descubre{" "}
          <span className="text-primary">PowerSave</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto text-pretty">
          En menos de 1 minuto conocerás la solución a tus problemas energéticos.
        </p>

        {/* Player */}
        <div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
          style={{ aspectRatio: "16 / 9" }}
        >
          {playing ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video-1.mp4"
              autoPlay
              controls
            />
          ) : (
            /* Thumbnail + play overlay */
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a3a24] to-[#0d1f12] cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 39px,#248838 39px,#248838 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#248838 39px,#248838 40px)",
                }}
              />

              {/* Logo watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
                <span className="text-white font-bold text-[160px] tracking-tighter">PS</span>
              </div>

              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <span className="text-white/60 text-sm font-medium">Reproducir vídeo</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
