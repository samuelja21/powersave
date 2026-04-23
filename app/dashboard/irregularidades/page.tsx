"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, ChevronDown, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const CONTRACTED = 800

const excesos = [
  {
    id: 1,
    time: "Lun 10:00–10:15",
    excess: 84,
    penalty: 420,
    barIdx: 20,
    causa: "Arranque simultáneo de Línea A, Línea B y climatización industrial. Pico de 884 kW superando el límite de 800 kW.",
    recomendacion: "Escalonar el arranque de las líneas con 10–15 min de separación. Configurar la climatización para arrancar 20 min después del inicio de producción.",
    saving: 380,
  },
  {
    id: 2,
    time: "Lun 18:30–18:45",
    excess: 51,
    penalty: 255,
    barIdx: 37,
    causa: "Reinicio de compresores coincidiendo con el arranque del turno de tarde. Consumo simultáneo de 851 kW.",
    recomendacion: "Adelantar la parada de producción a las 17:45 para que el turno de tarde arranque fuera del periodo Punta. Configurar reinicio gradual de compresores.",
    saving: 210,
  },
  {
    id: 3,
    time: "Mié 10:00–10:15",
    excess: 112,
    penalty: 560,
    barIdx: 44,
    causa: "El exceso más elevado del mes. Coincidencia de arranque de producción + prueba de carga de mantenimiento en Línea C + climatización a plena potencia.",
    recomendacion: "Programar pruebas de carga de mantenimiento en periodo Valle (00:00–08:00). Implementar política de no coincidencia entre mantenimiento y arranque de producción.",
    saving: 520,
  },
  {
    id: 4,
    time: "Jue 18:15–18:30",
    excess: 38,
    penalty: 190,
    barIdx: 36,
    causa: "Climatización en pleno rendimiento más arranque del horno de tratamiento térmico al inicio del turno de tarde.",
    recomendacion: "Iniciar el precalentamiento del horno a las 17:30 (periodo Llano) para que esté en régimen a las 18:15 sin generar pico de arranque.",
    saving: 170,
  },
  {
    id: 5,
    time: "Vie 10:30–10:45",
    excess: 76,
    penalty: 380,
    barIdx: 21,
    causa: "Cierre de semana con mayor actividad: Prensa A + Prensa B + Compresor C activos simultáneamente en el mismo intervalo de arranque.",
    recomendacion: "Instalar un sistema de gestión de cargas (Load Management) que limite la potencia simultánea máxima a 780 kW mediante curvas de prioridad entre equipos.",
    saving: 340,
  },
  {
    id: 6,
    time: "Lun 10:45–11:00",
    excess: 62,
    penalty: 310,
    barIdx: 22,
    causa: "Pico residual del arranque del lunes. La Línea B tarda 15 min adicionales en estabilizar su consumo respecto al histórico.",
    recomendacion: "Revisar el estado del motor principal de Línea B. Un motor degradado prolonga el pico de arranque. Coste de mantenimiento estimado: 800 €.",
    saving: 280,
  },
]

// Genera 48 barras deterministas (intervalos de 30 min)
const bars = Array.from({ length: 48 }, (_, i) => {
  const hour = i / 2
  let base =
    hour < 8 ? 320 + Math.round(Math.sin(i * 1.1) * 60) :
    hour < 10 ? 560 + Math.round(Math.sin(i * 0.9) * 50) :
    hour < 14 ? 720 + Math.round(Math.sin(i * 0.7) * 55) :
    hour < 18 ? 640 + Math.round(Math.sin(i * 0.8) * 45) :
    hour < 22 ? 740 + Math.round(Math.sin(i * 0.6) * 50) :
                510 + Math.round(Math.sin(i * 1.2) * 40)
  // Sobreescribir con los excesos reales
  const exc = excesos.find((e) => e.barIdx === i)
  if (exc) base = CONTRACTED + exc.excess
  return base
})

const maxBar = Math.max(...bars)

export default function IrregularidadesPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [activeBarIdx, setActiveBarIdx] = useState<number | null>(null)

  const totalPenalty = excesos.reduce((a, e) => a + e.penalty, 0)
  const totalSaving  = excesos.reduce((a, e) => a + e.saving,  0)

  const handleBarClick = (barIdx: number) => {
    const exc = excesos.find((e) => e.barIdx === barIdx)
    if (!exc) return
    setActiveBarIdx(barIdx)
    setExpanded((prev) => (prev === exc.id ? null : exc.id))
  }

  const toggleExpand = (id: number, barIdx: number) => {
    setExpanded((prev) => (prev === id ? null : id))
    setActiveBarIdx(barIdx)
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Irregularidades</h1>
        <p className="text-sm text-gray-500 mt-0.5">Periodos de 15 min — Abril 2025</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-red-50 p-4">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <p className="text-2xl font-semibold text-gray-900">{excesos.length}</p>
          <p className="text-xs text-gray-500">Excesos detectados</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Penalización est.</p>
          <p className="text-2xl font-semibold text-red-600">{totalPenalty.toLocaleString()} €</p>
          <p className="text-xs text-gray-400">este mes</p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Ahorro posible</p>
          <p className="text-2xl font-semibold text-primary">{totalSaving.toLocaleString()} €</p>
          <p className="text-xs text-gray-400">aplicando mejoras</p>
        </div>
      </div>

      {/* Gráfico interactivo */}
      <div className="rounded-2xl bg-white p-5">
        <p className="text-sm font-semibold text-gray-900 mb-0.5">Potencia por intervalo de 30 min</p>
        <p className="text-xs text-gray-400 mb-4">Pulsa una barra roja para ver la causa y recomendación</p>
        <svg viewBox="0 0 480 120" className="w-full h-[130px]">
          {bars.map((val, i) => {
            const h       = (val / maxBar) * 96
            const x       = i * 10
            const exceeded = val > CONTRACTED
            const isActive = activeBarIdx === i
            const isExceso = excesos.some((e) => e.barIdx === i)

            return (
              <g key={i}>
                <rect
                  x={x} y={96 - h} width={8} height={h}
                  fill={exceeded ? (isActive ? "#b71c1c" : "#ef4444") : "#248838"}
                  opacity={exceeded ? (isActive ? 1 : 0.75) : 0.35}
                  rx={1}
                  style={{ cursor: isExceso ? "pointer" : "default" }}
                  onClick={() => handleBarClick(i)}
                />
                {isActive && exceeded && (
                  <rect x={x - 1} y={96 - h - 5} width={10} height={5} fill="#b71c1c" rx={1.5} />
                )}
              </g>
            )
          })}

          {/* Línea potencia contratada */}
          <line
            x1={0} y1={96 - (CONTRACTED / maxBar) * 96}
            x2={480} y2={96 - (CONTRACTED / maxBar) * 96}
            stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5,3"
          />
          <text x={4} y={96 - (CONTRACTED / maxBar) * 96 - 4} fontSize="8" fill="#ef4444">
            800 kW
          </text>

          {/* Eje X */}
          {[0, 8, 16, 24, 32, 40, 47].map((i) => (
            <text key={i} x={i * 10 + 4} y={114} fontSize="8" fill="#9ca3af">
              {`${Math.floor(i / 2)}h`}
            </text>
          ))}
        </svg>
      </div>

      {/* Lista de excesos con acordeón */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Detalle y recomendaciones
        </p>
        <div className="space-y-2">
          {excesos.map((exc) => {
            const isOpen = expanded === exc.id
            return (
              <div
                key={exc.id}
                className={cn(
                  "rounded-2xl bg-white overflow-hidden transition-shadow",
                  isOpen ? "shadow-md" : "shadow-sm"
                )}
              >
                {/* Cabecera */}
                <button
                  className="w-full p-4 flex items-center gap-3 text-left"
                  onClick={() => toggleExpand(exc.id, exc.barIdx)}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    isOpen ? "bg-red-100" : "bg-red-50"
                  )}>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{exc.time}</p>
                    <p className="text-xs text-gray-400">
                      +{exc.excess} kW sobre el límite · penalización {exc.penalty} €
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Contenido expandido */}
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="h-px bg-gray-100" />

                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                        Causa detectada
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{exc.causa}</p>
                    </div>

                    <div className="rounded-xl bg-primary/10 p-3.5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Lightbulb className="w-3.5 h-3.5 text-primary" />
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">
                          Recomendación
                        </p>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{exc.recomendacion}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-gray-400">Ahorro mensual estimado si se aplica</p>
                      <p className="text-sm font-bold text-primary">−{exc.saving} €/mes</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Sin excesos */}
          <div className="rounded-2xl bg-[#e8f5e9] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">858 intervalos dentro del límite</p>
              <p className="text-xs text-gray-500">Sin penalización</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
