"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Zap, Euro, TrendingDown, Clock, Snowflake, Lightbulb, Cpu, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const periods = ["7 días", "Mensual", "Trimestral", "Anual"]

const mejoras = [
  { id: 1, title: "Desplazamiento de horarios a Valle", description: "Mover procesos pesados al periodo Valle (00:00–08:00)", saving: 4_200, icon: Clock },
  { id: 2, title: "Optimización climatización industrial", description: "Automatizar apagado en paradas y ajustar +2 °C en Punta", saving: 2_800, icon: Snowflake },
  { id: 3, title: "Iluminación LED nave + exterior", description: "Sensores de presencia + regulación por luz natural", saving: 620, icon: Lightbulb },
  { id: 4, title: "Variadores de frecuencia — Línea B", description: "Eliminar picos de arranque y reducir consumo en vacío", saving: 1_800, icon: Cpu },
]

const COSTO_ACTUAL = 70_000

export default function PrediccionPage() {
  const [activePeriod, setActivePeriod]     = useState("Mensual")
  const [showActual, setShowActual]         = useState(true)
  const [showMejoras, setShowMejoras]       = useState(true)
  const [selected, setSelected]             = useState<number[]>([1, 2])

  const toggle = (id: number) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id])

  const totalSaving      = mejoras.filter((m) => selected.includes(m.id)).reduce((a, m) => a + m.saving, 0)
  const costoConMejoras  = COSTO_ACTUAL - totalSaving
  const pctReduccion     = Math.round((totalSaving / COSTO_ACTUAL) * 100)

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Predicción de Consumo</h1>
        <p className="text-sm text-gray-500 mt-0.5">Estimación basada en historial + IA · Planta Lleida</p>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 bg-primary/10 rounded-full p-1">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className={cn(
              "flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all",
              activePeriod === p
                ? "bg-primary text-white shadow-sm"
                : "text-primary/60 hover:text-primary"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chart card */}
      <div className="rounded-2xl bg-[#f4fbf4] p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-400 mb-1">Consumo estimado — Abril 2025</p>
            <p className="text-3xl font-semibold text-primary">
              418.500 <span className="text-base font-normal text-primary/50">kWh</span>
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            −6% vs Mar
          </span>
        </div>

        {/* Scenario toggles */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowActual(!showActual)}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-semibold border transition-all",
              showActual
                ? "bg-[#248838] text-white border-[#248838]"
                : "bg-gray-100 text-gray-400 border-transparent"
            )}
          >
            Actual
          </button>
          <button
            onClick={() => setShowMejoras(!showMejoras)}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-semibold border transition-all",
              showMejoras
                ? "bg-[#77B732] text-white border-[#77B732]"
                : "bg-gray-100 text-gray-400 border-transparent"
            )}
          >
            Con mejoras
          </button>
        </div>

        <svg className="w-full h-[160px] overflow-visible" viewBox="0 0 360 140">
          <defs>
            <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#248838" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#248838" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gMejoras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#77B732" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#77B732" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[35, 70, 105].map((y) => (
            <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#d4edda" strokeWidth="1" />
          ))}

          {/* Y labels */}
          <text x="2" y="33"  fill="#c0c0c0" fontSize="8">18 MWh</text>
          <text x="2" y="68"  fill="#c0c0c0" fontSize="8">12 MWh</text>
          <text x="2" y="103" fill="#c0c0c0" fontSize="8">6 MWh</text>

          {/* Hoy line */}
          <line x1="228" y1="15" x2="228" y2="120" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="3,3" />
          <text x="232" y="25" fill="#c0c0c0" fontSize="8">Hoy</text>

          {/* Línea actual */}
          {showActual && (
            <>
              <path d="M28,105 C60,88 92,80 124,76 C156,70 172,52 204,48 C236,42 268,30 300,28 C332,24 344,26 352,24 L352,120 L28,120 Z"
                fill="url(#gActual)" />
              <path d="M28,105 C60,88 92,80 124,76 C156,70 172,52 204,48 C236,42 268,30 300,28 C332,24 344,26 352,24"
                fill="none" stroke="#248838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="228" cy="48" r="8" fill="#248838" opacity="0.12" />
              <circle cx="228" cy="48" r="4" fill="#248838" />
            </>
          )}

          {/* Línea con mejoras */}
          {showMejoras && (
            <>
              <path d="M28,108 C60,93 92,87 124,84 C156,79 172,63 204,59 C236,53 268,38 300,36 C332,32 344,34 352,31 L352,120 L28,120 Z"
                fill="url(#gMejoras)" opacity="0.8" />
              <path d="M28,108 C60,93 92,87 124,84 C156,79 172,63 204,59 C236,53 268,38 300,36 C332,32 344,34 352,31"
                fill="none" stroke="#77B732" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6,3" />
            </>
          )}

          {/* X labels */}
          {[["28", 28], ["7", 84], ["13", 140], ["18", 196], ["23", 252], ["28", 308], ["30", 352]].map(([label, x]) => (
            <text key={x} x={Number(x)} y="133" fill="#c0c0c0" fontSize="8" textAnchor="middle">{label}</text>
          ))}
        </svg>

        {/* Leyenda */}
        <div className="flex gap-5 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0.5 rounded" style={{ background: "#248838" }} />
            <span className="text-[10px] text-gray-400">Sin optimizar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0.5 rounded" style={{ background: "repeating-linear-gradient(90deg,#77B732 0,#77B732 4px,transparent 4px,transparent 8px)" }} />
            <span className="text-[10px] text-gray-400">Con mejoras</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Zap,          value: "418.500",                              sub: "kWh estimados",    note: "−6% vs Mar",                            noteColor: "text-primary", green: true  },
          { icon: Euro,         value: `${COSTO_ACTUAL.toLocaleString()} €`,   sub: "Coste estimado",   note: "+2.1% vs Mar",                           noteColor: "text-red-500", green: false },
          { icon: TrendingDown, value: `${costoConMejoras.toLocaleString()} €`, sub: "Con mejoras",     note: `−${totalSaving.toLocaleString()} € ahorro`, noteColor: "text-primary", green: true  },
          { icon: TrendingDown, value: `−${pctReduccion}%`,                    sub: "Reducción posible", note: "Potencial máximo",                       noteColor: "text-primary", green: true  },
        ].map((s, i) => (
          <div key={i} className={cn("rounded-2xl p-4", s.green ? "bg-primary/10" : "bg-white")}>
            <s.icon className="w-5 h-5 text-primary mb-2" />
            <p className={cn("text-xl font-semibold", s.green ? "text-primary" : "text-gray-900")}>{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
            <p className={cn("text-xs font-semibold mt-1.5", s.noteColor)}>{s.note}</p>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="rounded-3xl bg-primary/10 p-5 relative overflow-hidden">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          Resumen — Abril 2025
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">Sin optimizar</p>
            <p className="text-2xl font-semibold text-gray-900">{COSTO_ACTUAL.toLocaleString()} €</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300" />
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">Con mejoras</p>
            <p className="text-2xl font-semibold text-gray-900">{costoConMejoras.toLocaleString()} €</p>
          </div>
          <div className="rounded-2xl bg-primary px-4 py-3 text-center">
            <p className="text-lg font-bold text-white">{totalSaving.toLocaleString()} €</p>
            <p className="text-[9px] text-white/80">ahorro est.</p>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
          <span>0%</span>
          <span>Reducción posible: {pctReduccion}%</span>
          <span>100%</span>
        </div>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pctReduccion}%`, background: "#248838" }}
          />
        </div>
      </div>

      {/* Mejoras seleccionables */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Mejoras disponibles</p>
          <p className="text-xs font-medium text-primary">Selecciona para simular</p>
        </div>
        <div className="space-y-2">
          {mejoras.map((m) => {
            const isSelected = selected.includes(m.id)
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className={cn(
                  "w-full rounded-2xl p-4 flex items-start gap-3.5 text-left transition-all relative overflow-hidden",
                  isSelected ? "bg-primary/15 shadow-sm" : "bg-[#f4fbf4] hover:bg-primary/10"
                )}
              >
                {isSelected && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r bg-primary" />
                )}
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                  isSelected ? "bg-primary border-primary" : "border-gray-200"
                )}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <m.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{m.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{m.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">−{m.saving.toLocaleString()} €</p>
                  <p className="text-[10px] text-gray-400">/mes</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <Button className="w-full rounded-full py-6 text-sm font-semibold">
        Ver plan de acción completo <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
