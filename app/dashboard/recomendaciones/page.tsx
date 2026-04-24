"use client"

import { useState } from "react"
import { Clock, Snowflake, Lightbulb, Wrench, Cpu, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const quickActions = [
  { id: 1, icon: Clock,     title: "Adelantar parada de producción a 17:45",  desc: "Evita el pico de 18:00 en periodo Punta. Ahorro estimado sin coste operativo.", saving: 420 },
  { id: 2, icon: Snowflake, title: "Climatización: setpoint +2 °C en Punta",  desc: "El sistema de climatización consume 180 kW. Un ajuste de 2 °C reduce el consumo un 8%.", saving: 280 },
  { id: 3, icon: Lightbulb, title: "Apagar alumbrado exterior a las 22:30",   desc: "Detectado funcionamiento hasta las 02:00 en zona de carga. Sin impacto operativo.", saving: 95 },
]

const costlyActions = [
  { id: 4, icon: Wrench, title: "Variadores de frecuencia — Línea A",   desc: "Los motores de la línea A arrancan a plena potencia, generando picos de 120 kW. Los variadores eliminan este comportamiento.", saving: 1_800, cost: 28_000, roi: 16 },
  { id: 5, icon: Cpu,    title: "Renovar compresor — Zona de prensas", desc: "Consumo actual: 340 kWh/h. Media sector para mismo equipo: 270 kWh/h. Degradación estimada del 26%.", saving: 980, cost: 15_500, roi: 16 },
]

export default function RecomendacionesPage() {
  const [applied, setApplied] = useState<number[]>([])

  const toggle = (id: number) =>
    setApplied((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id])

  const totalSaving = [...quickActions, ...costlyActions]
    .filter((a) => applied.includes(a.id))
    .reduce((sum, a) => sum + a.saving, 0)

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Recomendaciones</h1>
        <p className="text-xs text-gray-400">Acciones generadas por IA · Abril 2025</p>
      </div>

      {/* Ahorro simulado — solo visible cuando hay selección */}
      {applied.length > 0 && (
        <div className="rounded-2xl bg-primary/10 p-4 flex items-center justify-between animate-in fade-in duration-200">
          <div>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">Ahorro simulado</p>
            <p className="text-2xl font-semibold text-gray-900">
              −{totalSaving.toLocaleString()} €<span className="text-sm font-normal text-gray-400">/mes</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400">{applied.length} acción{applied.length > 1 ? "es" : ""} seleccionada{applied.length > 1 ? "s" : ""}</p>
            <p className="text-sm font-semibold text-primary">−{Math.round(totalSaving / 70_000 * 100)}% factura</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Quick Actions · Sin inversión</p>
          <span className="text-xs font-bold text-primary">−{quickActions.reduce((a, r) => a + r.saving, 0)} €/mes</span>
        </div>
        <div className="space-y-2">
          {quickActions.map((r) => {
            const isApplied = applied.includes(r.id)
            return (
              <div key={r.id} className={cn("rounded-2xl p-4 flex items-start gap-3 transition-all", isApplied ? "bg-primary/10" : "bg-white")}>
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", isApplied ? "bg-primary/20" : "bg-primary/10")}>
                  <r.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-sm font-bold text-primary">−{r.saving} €</p>
                  <button
                    onClick={() => toggle(r.id)}
                    className={cn(
                      "flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all",
                      isApplied ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {isApplied ? <><Check className="w-3 h-3" />Aplicada</> : "Aplicar"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Acciones de inversión */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Acciones de inversión</p>
          <span className="text-xs font-bold text-primary">−{costlyActions.reduce((a, r) => a + r.saving, 0).toLocaleString()} €/mes</span>
        </div>
        <div className="space-y-2">
          {costlyActions.map((r) => {
            const isApplied = applied.includes(r.id)
            return (
              <div key={r.id} className={cn("rounded-2xl p-4 transition-all", isApplied ? "bg-primary/10" : "bg-white")}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", isApplied ? "bg-primary/20" : "bg-primary/10")}>
                    <r.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary">−{r.saving.toLocaleString()} €</p>
                    <p className="text-[10px] text-gray-400">/mes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2.5 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400">Inversión</p>
                    <p className="text-sm font-semibold text-gray-900">{r.cost.toLocaleString()} €</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">ROI</p>
                    <p className="text-sm font-semibold text-gray-900">{r.roi} meses</p>
                  </div>
                  <button
                    onClick={() => toggle(r.id)}
                    className={cn(
                      "ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all",
                      isApplied ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {isApplied ? <><Check className="w-3 h-3" />Planificada</> : "Planificar"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
