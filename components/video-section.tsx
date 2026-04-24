"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: 1, label: "Video 1", src: "/videos/video-1.mp4" },
  { id: 2, label: "Video 2", src: "/videos/video-2.mp4" },
  { id: 3, label: "Video 3", src: "/videos/video-3.mp4" },
  { id: 4, label: "Video 4", src: "/videos/video-4.mp4" },
]

export function VideoSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [playing, setPlaying]     = useState(false)

  const handleTabChange = (index: number) => {
    if (index === activeTab) return
    setActiveTab(index)
    setPlaying(false)
  }

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
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto text-pretty">
          En menos de 1 minuto conocerás la solución a tus problemas energéticos.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(i)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                activeTab === i
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Player */}
        <div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
          style={{ aspectRatio: "16 / 9" }}
        >
          {playing ? (
            <video
              key={tabs[activeTab].src}
              className="absolute inset-0 w-full h-full object-cover"
              src={tabs[activeTab].src}
              autoPlay
              controls
            />
          ) : (
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
                <span className="text-white/60 text-sm font-medium">
                  {tabs[activeTab].label}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
