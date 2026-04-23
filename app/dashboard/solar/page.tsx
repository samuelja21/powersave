"use client"

import { useState } from "react"
import { Sun, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SolarPage() {
  const [area, setArea] = useState(4000)

  const panels       = Math.floor(area / 4)                    // 400W panel, 4m² cada uno
  const annualGen    = Math.round(panels * 400 * 0.00175 * 1700) // 1700 h/año Lleida
  const annualSaving = Math.round(annualGen * 0.152)
  const installCost  = Math.round(panels * 320)
  const subsidy      = Math.round(installCost * 0.30)
  const netCost      = installCost - subsidy
  const roi          = (netCost / annualSaving).toFixed(1)
  const co2          = (annualGen * 0.000233 / 1000).toFixed(0)

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Simulador Solar</h1>
        <p className="text-sm text-gray-500 mt-0.5">Calcula si la fotovoltaica es rentable para tu planta</p>
      </div>

      {/* Input */}
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Parámetros</p>
        <div className="space-y-4">
          {[
            { label: "Ubicación",        value: "Lleida, España", fixed: true },
            { label: "Consumo anual",    value: "5.040.000 kWh",  fixed: true },
            { label: "Tarifa media",     value: "0,152 €/kWh",    fixed: true },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{f.label}</p>
              <p className="text-sm font-semibold text-gray-900">{f.value}</p>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Área de tejado disponible</p>
              <p className="text-sm font-bold text-gray-900">{area.toLocaleString()} m²</p>
            </div>
            <input
              type="range" min={500} max={8000} step={100} value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>500 m²</span><span>8.000 m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado principal */}
      <div className="rounded-3xl p-5 bg-primary/10">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-5 h-5 text-primary" />
          <p className="text-sm font-semibold text-primary">Resultados estimados</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Paneles (400W)",       value: panels.toLocaleString() },
            { label: "Generación anual",     value: `${(annualGen / 1000).toFixed(0)} MWh` },
            { label: "Ahorro anual",         value: `${annualSaving.toLocaleString()} €` },
            { label: "Recuperación",         value: `${roi} años` },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-xl font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inversión */}
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Inversión</p>
        <div className="space-y-2.5">
          {[
            { label: "Instalación bruta",      value: `${installCost.toLocaleString()} €` },
            { label: "Deducción IRPF 30%",     value: `−${subsidy.toLocaleString()} €`, highlight: true },
            { label: "Inversión neta",          value: `${netCost.toLocaleString()} €`, bold: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{row.label}</p>
              <p className={row.bold ? "text-base font-bold text-gray-900" : row.highlight ? "text-sm font-semibold text-primary" : "text-sm text-gray-700"}>
                {row.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-primary" />
          <p className="text-xs text-gray-500">
            CO₂ evitado: <span className="font-semibold text-gray-900">{co2} t/año</span>
          </p>
        </div>
      </div>

      <Button className="w-full rounded-full py-6 text-sm font-semibold">
        Solicitar presupuesto <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
