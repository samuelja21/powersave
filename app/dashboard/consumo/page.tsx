"use client"

import { cn } from "@/lib/utils"

type Period = "valle" | "llano" | "punta"

const getPeriod = (h: number): Period => {
  if (h >= 0 && h < 8) return "valle"
  if ((h >= 8 && h < 10) || (h >= 14 && h < 18) || h >= 22) return "llano"
  return "punta"
}

const period = {
  valle: { label: "Valle",  color: "#248838", fill: "#e8f5e9", text: "#1b5e20", price: 0.10, hours: "00:00–08:00" },
  llano: { label: "Llano",  color: "#77B732", fill: "#f1f8e9", text: "#558b2f", price: 0.15, hours: "08–10 · 14–18 · 22–24h" },
  punta: { label: "Punta",  color: "#bf360c", fill: "#fbe9e7", text: "#bf360c", price: 0.20, hours: "10:00–14:00 · 18:00–22:00" },
}

// kWh por hora — empresa 70.000€/mes
const hourlyData = [
  220, 200, 195, 188, 192, 215, 285, 420,  // 0–7  Valle
  590, 650,                                  // 8–9  Llano
  830, 880, 865, 845,                        // 10–13 Punta
  630,                                       // 14   Llano (hora actual)
]

const CURRENT_HOUR = 14

export default function ConsumoPage() {
  const vallekWh = hourlyData.slice(0, 8).reduce((a, b) => a + b, 0)            // 1.915
  const llanokWh = [hourlyData[8], hourlyData[9], hourlyData[14]].reduce((a, b) => a + b, 0) // 1.870
  const puntakWh = hourlyData.slice(10, 14).reduce((a, b) => a + b, 0)          // 3.420
  const totalKwh = vallekWh + llanokWh + puntakWh

  const valleEur  = (vallekWh  * 0.10).toFixed(0)
  const llanoEur  = (llanokWh  * 0.15).toFixed(0)
  const puntaEur  = (puntakWh  * 0.20).toFixed(0)
  const totalEur  = (parseFloat(valleEur) + parseFloat(llanoEur) + parseFloat(puntaEur)).toFixed(0)

  const currentPeriod = getPeriod(CURRENT_HOUR)
  const cfg = period[currentPeriod]

  const maxVal = Math.max(...hourlyData)
  const BAR_W = 11
  const BAR_GAP = 3
  const CHART_H = 96

  const kwhByPeriod: Record<Period, number>   = { valle: vallekWh, llano: llanokWh, punta: puntakWh }
  const eurByPeriod:  Record<Period, string>  = { valle: valleEur,  llano: llanoEur,  punta: puntaEur }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Consumo Actual</h1>
        <p className="text-sm text-gray-500 mt-0.5">Miércoles, 23 de Abril · Planta Lleida</p>
      </div>

      {/* Periodo activo — M3 filled card */}
      <div className="rounded-3xl p-5" style={{ background: cfg.fill }}>
        <div className="flex items-center justify-between">
          <div>
            <span
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
              style={{ background: cfg.color, color: "#fff" }}
            >
              Periodo {cfg.label}
            </span>
            <p className="text-4xl font-semibold" style={{ color: cfg.text }}>
              {hourlyData[CURRENT_HOUR].toLocaleString()} <span className="text-xl font-normal">kW</span>
            </p>
            <p className="text-sm mt-1" style={{ color: cfg.text }}>
              {cfg.price.toFixed(2)} €/kWh · {cfg.hours}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Hoy acumulado</p>
            <p className="text-2xl font-semibold text-gray-900">{Number(totalEur).toLocaleString()} €</p>
            <p className="text-sm text-gray-500">{totalKwh.toLocaleString()} kWh</p>
          </div>
        </div>
        {currentPeriod === "llano" && (
          <p className="mt-3 text-xs font-medium" style={{ color: cfg.text }}>
            Próximo periodo Punta: 18:00 – 22:00. Considera adelantar paradas de producción.
          </p>
        )}
        {currentPeriod === "punta" && (
          <p className="mt-3 text-xs font-medium" style={{ color: cfg.text }}>
            Tarifa máxima activa. Reduce cargas no críticas y muévelas al periodo Valle.
          </p>
        )}
      </div>

      {/* Desglose por periodo */}
      <div className="grid grid-cols-3 gap-3">
        {(["valle", "llano", "punta"] as Period[]).map((p) => {
          const c = period[p]
          const isActive = currentPeriod === p
          return (
            <div
              key={p}
              className={cn("rounded-2xl p-4 transition-all", isActive ? "shadow-md" : "")}
              style={{ background: isActive ? c.fill : "#fff" }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{c.label}</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{kwhByPeriod[p].toLocaleString()}</p>
              <p className="text-xs text-gray-400 mb-2">kWh</p>
              <p className="text-sm font-semibold" style={{ color: c.color }}>{eurByPeriod[p]} €</p>
              <p className="text-[10px] text-gray-400">{c.price.toFixed(2)} €/kWh</p>
            </div>
          )
        })}
      </div>

      {/* Gráfico horario */}
      <div className="rounded-2xl bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-900">Consumo por hora (kWh)</p>
          <div className="flex gap-3">
            {(["valle", "llano", "punta"] as Period[]).map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: period[p].color }} />
                <span className="text-xs text-gray-400">{period[p].label}</span>
              </div>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${24 * (BAR_W + BAR_GAP)} ${CHART_H + 22}`} className="w-full h-[130px]">
          {hourlyData.map((val, i) => {
            const barH = (val / maxVal) * CHART_H
            const x = i * (BAR_W + BAR_GAP)
            const y = CHART_H - barH
            const p = getPeriod(i)
            const isCurrent = i === CURRENT_HOUR
            return (
              <g key={i}>
                <rect x={x} y={y} width={BAR_W} height={barH}
                  fill={period[p].color} opacity={isCurrent ? 1 : 0.55} rx={2} />
                {isCurrent && (
                  <rect x={x - 1} y={y - 4} width={BAR_W + 2} height={4}
                    fill={period[p].color} rx={2} />
                )}
                {i % 6 === 0 && (
                  <text x={x + BAR_W / 2} y={CHART_H + 14} textAnchor="middle"
                    fontSize="8" fill="#9ca3af">{i}h</text>
                )}
              </g>
            )
          })}
          {Array.from({ length: 24 - hourlyData.length }, (_, i) => {
            const h = hourlyData.length + i
            const x = h * (BAR_W + BAR_GAP)
            const p = getPeriod(h)
            return <rect key={h} x={x} y={CHART_H - 3} width={BAR_W} height={3}
              fill={period[p].color} opacity={0.12} rx={1} />
          })}
        </svg>
      </div>
    </div>
  )
}
