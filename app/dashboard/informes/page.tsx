"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const tipos    = ["Energético", "ESG / CSRD", "ISO 50001", "Directiva 2023/1791"]
const periodos = ["Mensual", "Trimestral", "Anual"]

const recientes = [
  { nombre: "Informe Energético — Marzo 2025",  tipo: "Energético", fecha: "01 Abr 2025", size: "2.1 MB" },
  { nombre: "Reporte ESG / CSRD — Q1 2025",     tipo: "ESG",        fecha: "03 Abr 2025", size: "4.8 MB" },
  { nombre: "Informe Energético — Feb 2025",    tipo: "Energético", fecha: "01 Mar 2025", size: "2.0 MB" },
  { nombre: "Auditoría ISO 50001 — 2024",       tipo: "ISO 50001",  fecha: "15 Ene 2025", size: "6.3 MB" },
]

export default function InformesPage() {
  const [tipo,       setTipo]       = useState("Energético")
  const [periodo,    setPeriodo]    = useState("Mensual")
  const [generating, setGenerating] = useState(false)
  const [generated,  setGenerated]  = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 1800)
  }

  const handleTypeChange = (t: string) => { setTipo(t); setGenerated(false) }
  const handlePeriodChange = (p: string) => { setPeriodo(p); setGenerated(false) }

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Generador de Informes</h1>
        <p className="text-xs text-gray-400">Reportes energéticos, ESG y de cumplimiento normativo</p>
      </div>

      {/* Configurador */}
      <div className="rounded-2xl bg-white p-4 space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">Tipo de informe</p>
          <div className="flex flex-wrap gap-1.5">
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  tipo === t ? "bg-primary text-white" : "bg-[#f4f6f3] text-gray-600 hover:bg-primary/10"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">Periodo</p>
          <div className="flex gap-1.5">
            {periodos.map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={cn(
                  "flex-1 py-1.5 rounded-full text-xs font-semibold transition-all",
                  periodo === p ? "bg-primary text-white" : "bg-[#f4f6f3] text-gray-600 hover:bg-primary/10"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {generated ? (
          <div className="rounded-xl bg-primary/10 p-3 flex items-center gap-3 animate-in fade-in duration-200">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Informe listo</p>
              <p className="text-xs text-gray-400">{tipo} — {periodo} · Generado ahora</p>
            </div>
            <button className="text-primary hover:text-primary/70 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Button className="w-full rounded-full font-semibold" onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generando…
              </span>
            ) : (
              <><FileText className="w-4 h-4 mr-2" />Generar {tipo} — {periodo}</>
            )}
          </Button>
        )}
      </div>

      {/* Recientes */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Informes recientes</p>
        <div className="space-y-2">
          {recientes.map((r) => (
            <div key={r.nombre} className="rounded-2xl bg-white p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{r.nombre}</p>
                <p className="text-[10px] text-gray-400">{r.fecha} · {r.size}</p>
              </div>
              <button className="text-primary hover:text-primary/70 transition-colors flex-shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
