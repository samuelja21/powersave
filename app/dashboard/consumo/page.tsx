"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Period = "valle" | "llano" | "punta"

const getPeriod = (h: number): Period => {
  if (h >= 0 && h < 8) return "valle"
  if ((h >= 8 && h < 10) || (h >= 14 && h < 18) || h >= 22) return "llano"
  return "punta"
}

const period = {
  valle: { label: "Valle", color: "#248838", fill: "#e8f5e9", text: "#1b5e20", price: 0.10, hours: "00:00–08:00" },
  llano: { label: "Llano", color: "#77B732", fill: "#f1f8e9", text: "#558b2f", price: 0.15, hours: "08–10 · 14–18 · 22–24h" },
  punta: { label: "Punta", color: "#bf360c", fill: "#fbe9e7", text: "#bf360c", price: 0.20, hours: "10:00–14:00 · 18:00–22:00" },
}

const hourlyData = [220, 200, 195, 188, 192, 215, 285, 420, 590, 650, 830, 880, 865, 845, 630]
const CURRENT_HOUR = 14

export default function ConsumoPage() {
  const [selectedHour, setSelectedHour] = useState<number | null>(null)

  const vallekWh = hourlyData.slice(0, 8).reduce((a, b) => a + b, 0)
  const llanokWh = [hourlyData[8], hourlyData[9], hourlyData[14]].reduce((a, b) => a + b, 0)
  const puntakWh = hourlyData.slice(10, 14).reduce((a, b) => a + b, 0)
  const totalKwh = vallekWh + llanokWh + puntakWh
  const totalEur = (vallekWh * 0.10 + llanokWh * 0.15 + puntakWh * 0.20).toFixed(0)

  const currentPeriod = getPeriod(CURRENT_HOUR)
  const cfg = period[currentPeriod]
  const maxVal = Math.max(...hourlyData)
  const BAR_W = 11, BAR_GAP = 3, CHART_H = 88

  const kwhByPeriod = { valle: vallekWh, llano: llanokWh, punta: puntakWh }
  const eurByPeriod = {
    valle: (vallekWh * 0.10).toFixed(0),
    llano: (llanokWh * 0.15).toFixed(0),
    punta: (puntakWh * 0.20).toFixed(0),
  }

  const selP = selectedHour !== null ? getPeriod(selectedHour) : null

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Consumo Actual</h1>
        <p className="text-xs text-gray-400">Miércoles, 23 de Abril · Planta Lleida</p>
      </div>

      {/* Periodo activo */}
      <div className="rounded-2xl p-4" style={{ background: cfg.fill }}>
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5"
              style={{ background: cfg.color, color: "#fff" }}>
              Periodo {cfg.label}
            </span>
            <p className="text-3xl font-semibold" style={{ color: cfg.text }}>
              {hourlyData[CURRENT_HOUR].toLocaleString()} <span className="text-base font-normal">kW</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: cfg.text }}>
              {cfg.price.toFixed(2)} €/kWh · {cfg.hours}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500">Acumulado hoy</p>
            <p className="text-2xl font-semibold text-gray-900">{Number(totalEur).toLocaleString()} €</p>
            <p className="text-sm text-gray-500">{totalKwh.toLocaleString()} kWh</p>
          </div>
        </div>
        {currentPeriod === "llano" && (
          <p className="mt-2 text-xs font-medium" style={{ color: cfg.text }}>
            Próximo periodo Punta: 18:00–22:00. Considera adelantar paradas de producción.
          </p>
        )}
        {currentPeriod === "punta" && (
          <p className="mt-2 text-xs font-medium" style={{ color: cfg.text }}>
            Tarifa máxima activa. Reduce cargas no críticas hasta las 22:00.
          </p>
        )}
      </div>

      {/* Desglose periodos */}
      <div className="grid grid-cols-3 gap-2">
        {(["valle", "llano", "punta"] as Period[]).map((p) => {
          const c = period[p]
          const isActive = currentPeriod === p
          return (
            <div key={p} className="rounded-xl p-3" style={{ background: isActive ? c.fill : "#fff" }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: isActive ? c.color : "#9ca3af" }}>{c.label}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{kwhByPeriod[p].toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">kWh</p>
              <p className="text-xs font-semibold mt-1" style={{ color: c.color }}>{eurByPeriod[p]} €</p>
              <p className="text-[10px] text-gray-400">{c.price.toFixed(2)} €/kWh</p>
            </div>
          )
        })}
      </div>

      {/* Gráfico interactivo */}
      <div className="rounded-2xl bg-[#f4fbf4] p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900">Consumo por hora</p>
          <div className="flex gap-3">
            {(["valle", "llano", "punta"] as Period[]).map((p) => (
              <div key={p} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: period[p].color }} />
                <span className="text-[10px] text-gray-400">{period[p].label}</span>
              </div>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${24 * (BAR_W + BAR_GAP)} ${CHART_H + 20}`} className="w-full h-[110px]">
          {hourlyData.map((val, i) => {
            const barH = (val / maxVal) * CHART_H
            const x = i * (BAR_W + BAR_GAP)
            const y = CHART_H - barH
            const p = getPeriod(i)
            const isSelected = selectedHour === i
            const isCurrent = i === CURRENT_HOUR
            return (
              <g key={i} style={{ cursor: "pointer" }}
                onClick={() => setSelectedHour(selectedHour === i ? null : i)}>
                <rect x={x} y={y} width={BAR_W} height={barH}
                  fill={period[p].color}
                  opacity={isSelected ? 1 : isCurrent ? 0.85 : 0.5}
                  rx={2} />
                {(isSelected || isCurrent) && (
                  <rect x={x - 1} y={y - 4} width={BAR_W + 2} height={4}
                    fill={period[p].color} rx={1.5} />
                )}
                {i % 6 === 0 && (
                  <text x={x + BAR_W / 2} y={CHART_H + 13} textAnchor="middle"
                    fontSize="8" fill="#9ca3af">{i}h</text>
                )}
              </g>
            )
          })}
          {Array.from({ length: 24 - hourlyData.length }, (_, i) => {
            const h = hourlyData.length + i
            const x = h * (BAR_W + BAR_GAP)
            return <rect key={h} x={x} y={CHART_H - 3} width={BAR_W} height={3}
              fill={period[getPeriod(h)].color} opacity={0.12} rx={1} />
          })}
        </svg>

        {/* Panel de hora seleccionada */}
        {selectedHour !== null && selP !== null ? (
          <div className="mt-2 pt-3 border-t border-primary/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold" style={{ color: period[selP].color }}>
                {selectedHour}:00 – {selectedHour + 1}:00 · Periodo {period[selP].label}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {hourlyData[selectedHour].toLocaleString()} <span className="text-sm font-normal text-gray-400">kWh</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400">Coste hora</p>
              <p className="text-xl font-bold" style={{ color: period[selP].color }}>
                {(hourlyData[selectedHour] * period[selP].price).toFixed(0)} €
              </p>
              <p className="text-[10px] text-gray-400">{period[selP].price.toFixed(2)} €/kWh</p>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Pulsa una barra para ver el detalle de esa hora
          </p>
        )}
      </div>

      {/* Total */}
      <div className="rounded-2xl bg-primary/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">Total hoy</p>
          <p className="text-2xl font-semibold text-gray-900">
            {totalKwh.toLocaleString()} <span className="text-sm font-normal text-gray-400">kWh</span>
          </p>
          <p className="text-sm font-semibold text-primary">{totalEur} €</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">−18%</p>
          <p className="text-[10px] text-gray-400">vs ayer</p>
        </div>
      </div>
    </div>
  )
}
