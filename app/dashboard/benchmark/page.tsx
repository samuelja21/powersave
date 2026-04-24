"use client"

import { useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const sectores = ["Siderurgia", "Logística", "Retail", "Hostelería"] as const
type Sector = typeof sectores[number]

const MY_KWH = 28_000

const sectorData: Record<Sector, { media: number; top: number; percentil: number }> = {
  "Siderurgia": { media: 34_000, top: 17_500, percentil: 62 },
  "Logística":  { media: 18_000, top:  9_200, percentil: 71 },
  "Retail":     { media: 12_500, top:  5_800, percentil: 55 },
  "Hostelería": { media: 22_000, top: 11_000, percentil: 68 },
}

export default function BenchmarkPage() {
  const [sector, setSector] = useState<Sector>("Siderurgia")

  const { media, top, percentil } = sectorData[sector]
  const gapSector  = Math.round((media - MY_KWH) / media * 100)
  const gapTop     = Math.round((MY_KWH - top)   / MY_KWH * 100)
  const potencial  = Math.round((MY_KWH - top) * 180 * 0.152)
  const topPercent = Math.round(top  / media * 69)
  const myPercent  = Math.round(MY_KWH / media * 69)

  const comparativa = [
    { label: "Tu empresa",       kwh: MY_KWH, pct: myPercent,  color: "#248838" },
    { label: "Media del sector", kwh: media,  pct: 69,         color: "#77B732" },
    { label: "Top 10% sector",   kwh: top,    pct: topPercent, color: "#1b5e20" },
  ]

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Benchmark Sectorial</h1>
        <p className="text-xs text-gray-400">kWh por empleado/año · Cataluña</p>
      </div>

      {/* Selector de sector */}
      <div className="flex gap-1.5 flex-wrap">
        {sectores.map((s) => (
          <button
            key={s}
            onClick={() => setSector(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
              sector === s ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-primary/10"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Percentil */}
      <div className="rounded-2xl bg-primary/10 p-4">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">Tu posición — {sector}</p>
        <p className="text-4xl font-semibold text-gray-900 mb-0.5">P{percentil}</p>
        <p className="text-sm text-gray-500 mb-3">Mejor que el {percentil}% del sector en kWh/empleado/año</p>
        <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${percentil}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
          <span>Mayor consumo</span>
          <span>Mejor eficiencia</span>
        </div>
      </div>

      {/* Comparativa barras */}
      <div className="rounded-2xl bg-white p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          kWh por empleado / año — {sector}
        </p>
        <div className="space-y-3.5">
          {comparativa.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{item.kwh.toLocaleString()} kWh</p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brechas */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Análisis de brecha</p>
        <div className="space-y-2">
          <div className="rounded-2xl bg-[#e8f5e9] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">vs Media del sector</p>
              <p className="text-xs text-gray-500">
                Consumes {(media - MY_KWH).toLocaleString()} kWh/empleado menos que la media
              </p>
            </div>
            <span className="text-sm font-bold text-primary">−{gapSector}%</span>
          </div>

          <div className="rounded-2xl bg-[#f1f8e9] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-[#558b2f]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Potencial vs Top 10%</p>
              <p className="text-xs text-gray-500">
                {gapTop > 0
                  ? `Alcanzar el top 10% supondría ${potencial.toLocaleString()} € adicionales/año`
                  : "Ya en el top 10% del sector"}
              </p>
            </div>
            <span className="text-sm font-bold text-[#558b2f]">{gapTop > 0 ? `−${gapTop}%` : "Top"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
