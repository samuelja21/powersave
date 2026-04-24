"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Activity } from "lucide-react"

const sistemas = [
  {
    nombre: "Línea de producción A",
    kw: 320, pct: 35, estado: "Mejorable",
    sparkline: [285, 310, 298, 320, 315, 308, 320],
    detail: "Motor principal degradado. Arranque a plena potencia genera picos de 120 kW. Recomendado: variador de frecuencia (ROI 16 meses).",
    saving: 1_800,
  },
  {
    nombre: "Compresores — Zona prensas",
    kw: 285, pct: 31, estado: "Crítico",
    sparkline: [260, 275, 280, 290, 285, 292, 285],
    detail: "Consumo 26% por encima de la media del sector para el mismo equipo. Degradación estimada. Se recomienda revisión urgente o sustitución.",
    saving: 980,
  },
  {
    nombre: "Climatización industrial",
    kw: 180, pct: 20, estado: "Óptimo",
    sparkline: [175, 180, 178, 182, 176, 180, 180],
    detail: "Funcionamiento dentro de los parámetros óptimos. Automatización de parada a 17:45 implementada en Feb 2025.",
    saving: 0,
  },
  {
    nombre: "Iluminación nave y ext.",
    kw: 75, pct: 8, estado: "Mejorable",
    sparkline: [72, 75, 74, 76, 73, 75, 75],
    detail: "Luminarias convencionales en zona exterior. Detectado encendido nocturno hasta las 02:00. Sensores de presencia pendientes.",
    saving: 620,
  },
  {
    nombre: "Oficinas y servicios",
    kw: 55, pct: 6, estado: "Óptimo",
    sparkline: [50, 54, 52, 55, 53, 55, 55],
    detail: "Consumo estable y dentro de la media del sector para instalaciones de oficina con 180 empleados.",
    saving: 0,
  },
]

const estadoColor: Record<string, { bg: string; text: string; bar: string }> = {
  "Óptimo":    { bg: "bg-[#e8f5e9]", text: "text-[#1b5e20]", bar: "bg-primary"   },
  "Mejorable": { bg: "bg-[#f1f8e9]", text: "text-[#558b2f]", bar: "bg-[#77B732]" },
  "Crítico":   { bg: "bg-red-50",    text: "text-red-800",    bar: "bg-red-500"   },
}

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]

export default function SistemasPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const total = sistemas.reduce((a, s) => a + s.kw, 0)

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Análisis de Sistemas</h1>
        <p className="text-xs text-gray-400">Consumo individualizado por equipo · Ahora</p>
      </div>

      {/* KPI total */}
      <div className="rounded-2xl bg-primary/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">Consumo total ahora</p>
          <p className="text-3xl font-semibold text-gray-900">
            {total} <span className="text-base font-normal text-gray-500">kW</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-0.5">Potencia contratada</p>
          <p className="text-xl font-semibold text-gray-400">800 kW</p>
          <p className="text-xs text-primary font-semibold mt-0.5">{Math.round(total / 800 * 100)}% de uso</p>
        </div>
      </div>

      {/* Sistemas expandibles */}
      <div className="space-y-2">
        {sistemas.map((s) => {
          const c      = estadoColor[s.estado]
          const isOpen = expanded === s.nombre
          const sMax   = Math.max(...s.sparkline)
          const sMin   = Math.min(...s.sparkline)
          const range  = sMax - sMin || 1

          return (
            <div key={s.nombre} className={cn("rounded-2xl overflow-hidden transition-shadow", isOpen ? "shadow-sm" : "")}>
              <button
                className="w-full bg-white p-4 text-left"
                onClick={() => setExpanded(isOpen ? null : s.nombre)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.nombre}</p>
                    <p className="text-xs text-gray-400">{s.kw} kW · {s.pct}% del total</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", c.bg, c.text)}>
                      {s.estado}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", c.bar)} style={{ width: `${s.pct}%` }} />
                </div>
              </button>

              {isOpen && (
                <div className="bg-white border-t border-gray-100 px-4 pb-4 space-y-3">
                  {/* Sparkline 7 días */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Últimos 7 días (kW)</p>
                    </div>
                    <svg viewBox="0 0 120 32" className="w-full h-10">
                      <polyline
                        points={s.sparkline.map((v, i) => {
                          const x = i * 20
                          const y = 28 - ((v - sMin) / range) * 22
                          return `${x},${y}`
                        }).join(" ")}
                        fill="none"
                        stroke="#248838"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {s.sparkline.map((v, i) => {
                        const x = i * 20
                        const y = 28 - ((v - sMin) / range) * 22
                        return <circle key={i} cx={x} cy={y} r="2.5" fill="#248838" />
                      })}
                    </svg>
                    <div className="flex justify-between text-[10px] text-gray-400 -mt-1">
                      {DAYS.map((d) => <span key={d}>{d}</span>)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#f4f6f3] p-3">
                    <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
                  </div>

                  {s.saving > 0 && (
                    <div className="flex items-center justify-between pt-0.5">
                      <p className="text-xs text-gray-400">Ahorro potencial</p>
                      <p className="text-sm font-bold text-primary">−{s.saving.toLocaleString()} €/mes</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
