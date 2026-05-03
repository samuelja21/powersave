"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Activity } from "lucide-react"

const sistemas = [
  {
    nombre: "Producción de nuggets",
    kw: 185, pct: 32, estado: "Crítico",
    sparkline: [172, 188, 182, 195, 185, 180, 185],
    detail: "Línea trabajando al 100% de su capacidad nominal. El arranque de nueva tanda genera picos de hasta 220 kW. PowerSave recomienda escalonar las cargas de arranque para reducir la demanda puntual.",
    saving: 1_800,
  },
  {
    nombre: "Línea Mac & Cheese",
    kw: 155, pct: 27, estado: "Mejorable",
    sparkline: [142, 158, 150, 162, 155, 150, 155],
    detail: "Línea operando al 85% de su eficiencia máxima. El motor de la cinta transportadora presenta signos de degradación temprana. Se recomienda revisión preventiva antes de que afecte a la producción.",
    saving: 620,
  },
  {
    nombre: "Cámaras de congelación",
    kw: 145, pct: 25, estado: "Óptimo",
    sparkline: [142, 145, 143, 147, 144, 145, 145],
    detail: "Temperatura estable a −18 °C en todas las cámaras. Consumo dentro de los parámetros normales. El ciclo de desescarche está correctamente programado en periodo Valle (03:00).",
    saving: 0,
  },
  {
    nombre: "Climatización industrial",
    kw: 62, pct: 11, estado: "Mejorable",
    sparkline: [55, 65, 58, 70, 62, 58, 62],
    detail: "Climatización activa en oficinas, zona de carga y pasillos durante periodo Punta. Mejora pendiente: automatización de apagado en zonas no productivas. Ahorro estimado: 2.800 €/mes.",
    saving: 2_800,
  },
  {
    nombre: "Oficinas y servicios",
    kw: 25, pct: 5, estado: "Óptimo",
    sparkline: [23, 26, 24, 27, 25, 25, 25],
    detail: "Consumo estable y dentro de la media del sector. Iluminación LED instalada en todas las zonas de oficina.",
    saving: 0,
  },
]

const estadoColor: Record<string, { bg: string; text: string; bar: string; line: string }> = {
  "Óptimo":    { bg: "bg-[#e8f5e9]", text: "text-[#1b5e20]", bar: "bg-primary",   line: "#248838" },
  "Mejorable": { bg: "bg-[#f1f8e9]", text: "text-[#558b2f]", bar: "bg-[#77B732]", line: "#77B732" },
  "Crítico":   { bg: "bg-red-50",    text: "text-red-800",    bar: "bg-red-500",   line: "#ef4444" },
}

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]

const sparkPath = (pts: [number, number][]): string =>
  pts.map(([x, y], i) => {
    if (i === 0) return `M ${x},${y}`
    const [px, py] = pts[i - 1]
    const mx = (px + x) / 2
    return `C ${mx},${py} ${mx},${y} ${x},${y}`
  }).join(" ")

export default function SistemasPage() {
  const [expanded,    setExpanded]    = useState<string | null>(null)
  const [activePoint, setActivePoint] = useState<{ name: string; idx: number } | null>(null)
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
          <p className="text-xl font-semibold text-gray-400">620 kW</p>
          <p className="text-xs text-primary font-semibold mt-0.5">{Math.round(total / 620 * 100)}% de uso</p>
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
          const W = 120, H = 26, PT = 28
          const pts: [number, number][] = s.sparkline.map((v, i) => [
            Math.round((i / 6) * W),
            Math.round(PT + H - ((v - sMin) / range) * H),
          ])
          const lineD  = sparkPath(pts)
          const areaD  = `${lineD} L ${pts[6][0]},${PT + H + 4} L 0,${PT + H + 4} Z`
          const gradId = `g-${s.nombre.replace(/\s/g, "-")}`

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
                    <svg viewBox="0 0 152 74" className="w-full h-[92px]"
                      onClick={() => setActivePoint(null)}>
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={c.line} stopOpacity="0.22" />
                          <stop offset="100%" stopColor={c.line} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid */}
                      {[PT + H * 0.33, PT + H * 0.67].map((y, k) => (
                        <line key={k} x1="0" y1={y} x2={W} y2={y} stroke="#f0f0f0" strokeWidth="0.8" />
                      ))}
                      {/* Relleno degradado */}
                      <path d={areaD} fill={`url(#${gradId})`} />
                      {/* Línea suave */}
                      <path d={lineD} fill="none" stroke={c.line} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Tooltip del punto activo */}
                      {activePoint?.name === s.nombre && (() => {
                        const ai = activePoint.idx
                        const [ax, ay] = pts[ai]
                        const tipX = Math.max(14, Math.min(ax, W - 14))
                        return (
                          <g>
                            <line x1={ax} y1={PT} x2={ax} y2={PT + H}
                              stroke={c.line} strokeWidth="1" strokeDasharray="3,2" opacity="0.35" />
                            <rect x={tipX - 14} y={ay - 22} width={28} height={14} rx={3} fill={c.line} />
                            <text x={tipX} y={ay - 12} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">
                              {s.sparkline[ai]} kW
                            </text>
                            <polygon points={`${tipX - 4},${ay - 8} ${tipX + 4},${ay - 8} ${tipX},${ay - 4}`} fill={c.line} />
                          </g>
                        )
                      })()}
                      {/* Puntos con área táctil */}
                      {pts.map(([x, y], i) => {
                        const isActive = activePoint?.name === s.nombre && activePoint.idx === i
                        return (
                          <g key={i} style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActivePoint(isActive ? null : { name: s.nombre, idx: i })
                            }}>
                            <circle cx={x} cy={y} r={8} fill="transparent" />
                            <circle cx={x} cy={y}
                              r={isActive ? 4 : i === 6 ? 3.5 : 2.2}
                              fill={isActive ? c.line : "white"}
                              stroke={c.line}
                              strokeWidth={isActive || i === 6 ? 2.2 : 1.5}
                            />
                          </g>
                        )
                      })}
                      {/* Valor último punto (oculto si hay selección activa) */}
                      {activePoint?.name !== s.nombre && (
                        <text x={pts[6][0] + 7} y={pts[6][1] + 4} fontSize="8.5" fill={c.line} fontWeight="700">
                          {s.sparkline[6]} kW
                        </text>
                      )}
                      {/* Labels días */}
                      {DAYS.map((d, i) => (
                        <text key={d} x={Math.round((i / 6) * W)} y="70" fontSize="8" fill="#d1d5db" textAnchor="middle">{d}</text>
                      ))}
                    </svg>
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
