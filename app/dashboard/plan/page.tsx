"use client"

import { useState } from "react"
import { TrendingDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const facturas = [
  {
    mes: "Abril 2025", importe: 66_320, ahorro: 3_680, estado: "En curso",
    desglose: [
      { label: "Energía consumida (420.000 kWh)", value: "38.000 €" },
      { label: "Potencia contratada (620 kW)",    value: "14.800 €" },
      { label: "Impuestos y peajes",               value: "14.000 €" },
      { label: "Descuento PowerSave",              value: "−480 €",  green: true },
    ],
  },
]

export default function PlanPage() {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>("Abril 2025")
  const ahorroBasico        = 480
  const ahorroRenegociacion = 3_200
  const ahorroMes           = ahorroBasico + ahorroRenegociacion
  const comisionPS          = 0
  const ahorroNeto          = ahorroMes - comisionPS

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Plan Contratado</h1>
        <p className="text-xs text-gray-400">Tarifa activa y ahorro generado · Freedom Frozen Foods</p>
      </div>

      {/* Tarifa */}
      <div className="rounded-2xl bg-white p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Tarifa eléctrica</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Modalidad",           value: "6.1TD — Gran industrial" },
            { label: "Potencia contratada", value: "620 kW (renegociada)" },
            { label: "Comercializadora",    value: "Endesa Industrial" },
            { label: "Factura media/mes",   value: "70.000 €" },
            { label: "Precio energía",      value: "0,152 €/kWh" },
            { label: "Precio potencia",     value: "44,50 €/kW·año" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl bg-[#f4f6f3] px-3 py-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{f.label}</p>
              <p className="text-sm font-semibold text-gray-900">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan PowerSave */}
      <div className="rounded-2xl p-4 bg-primary/10">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Plan Starter activo</span>
        <p className="text-xs text-gray-500 mt-0.5 mb-3">Sin comisión · Descubres el ahorro sin ningún coste</p>
        <div className="space-y-2.5">
          {[
            { label: "Optimizaciones básicas",    value: `${ahorroBasico.toLocaleString()} €`,        main: true },
            { label: "Renegociación de potencia", value: `${ahorroRenegociacion.toLocaleString()} €`, main: true },
            { label: "Ahorro total este mes",     value: `${ahorroMes.toLocaleString()} €`,           bold: true },
            { label: "Comisión PowerSave (0%)",   value: "0 €",                                        sub:  true },
            { label: "Tu ahorro neto",            value: `${ahorroNeto.toLocaleString()} €`,           bold: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{row.label}</p>
              <p className={row.bold ? "text-base font-bold text-primary" : row.sub ? "text-sm text-gray-400" : "text-sm font-semibold text-gray-900"}>
                {row.value}
              </p>
            </div>
          ))}
          <div className="h-px bg-primary/20" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Reducción sobre factura base</p>
            <div className="flex items-center gap-1 text-primary font-bold">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">−5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facturas */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Últimas facturas · pulsa para ver desglose</p>
        <div className="space-y-2">
          {facturas.map((f) => {
            const isOpen = expandedInvoice === f.mes
            return (
              <div key={f.mes} className={cn("rounded-2xl overflow-hidden transition-shadow", isOpen ? "shadow-sm" : "")}>
                <button
                  className="w-full bg-white p-4 flex items-center gap-3 text-left"
                  onClick={() => setExpandedInvoice(isOpen ? null : f.mes)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{f.mes}</p>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        f.estado === "En curso" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"
                      )}>
                        {f.estado}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{f.importe.toLocaleString()} € facturado</p>
                  </div>
                  {f.ahorro > 0 && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary">−{f.ahorro.toLocaleString()} €</p>
                      <p className="text-[10px] text-gray-400">ahorro</p>
                    </div>
                  )}
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="bg-white border-t border-gray-100 px-4 pb-4 space-y-2 pt-3">
                    {f.desglose.map((d) => (
                      <div key={d.label} className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{d.label}</p>
                        <p className={cn("text-xs font-semibold", d.green ? "text-primary" : "text-gray-900")}>{d.value}</p>
                      </div>
                    ))}
                    <div className="h-px bg-gray-100 my-1" />
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-700">Total facturado</p>
                      <p className="text-sm font-bold text-gray-900">{f.importe.toLocaleString()} €</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
