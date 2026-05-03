"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const historial = [
  { fecha: "Abr 2025", year: 2025, accion: "Renegociación tarifa eléctrica · reducción de potencia contratada de 800 a 620 kW", ahorro: 3_200 },
  { fecha: "Abr 2025", year: 2025, accion: "Optimizaciones básicas de consumo · ajuste de cargas y horarios no críticos",        ahorro:   480 },
]

const filters = ["Todos", "2025"] as const
type Filter = typeof filters[number]

export default function HistorialPage() {
  const [filter, setFilter] = useState<Filter>("Todos")

  const filtered       = historial.filter((h) => filter === "Todos" || h.year === Number(filter))
  const total          = historial.reduce((a, h) => a + h.ahorro, 0)
  const filteredTotal  = filtered.reduce((a, h) => a + h.ahorro, 0)

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Historial de Mejoras</h1>
        <p className="text-xs text-gray-400">Acciones implementadas · Mes de prueba Abril 2025</p>
      </div>

      {/* KPI */}
      <div className="rounded-2xl bg-primary/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">Ahorro acumulado</p>
          <p className="text-3xl font-semibold text-gray-900">
            {total.toLocaleString()} <span className="text-base font-normal text-gray-500">€/mes</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">primer mes del Plan Starter · Freedom Frozen Foods</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">−{Math.round(total / 70_000 * 100)}%</p>
          <p className="text-xs text-gray-500">sobre factura base</p>
        </div>
      </div>

      {/* Filtros año */}
      <div className="flex gap-1 bg-primary/10 rounded-full p-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all",
              filter === f ? "bg-primary text-white shadow-sm" : "text-primary/60 hover:text-primary"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Implementado en el mes de prueba</p>
          {filter !== "Todos" && (
            <span className="text-xs font-bold text-primary">−{filteredTotal.toLocaleString()} €/mes</span>
          )}
        </div>
        <div className="relative">
          <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gray-200" />
          <div className="space-y-2">
            {filtered.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 rounded-2xl bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">{item.fecha}</p>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{item.accion}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary">−{item.ahorro.toLocaleString()} €</p>
                      <p className="text-[10px] text-gray-400">/mes</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No hay acciones para este periodo</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
