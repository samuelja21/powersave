import { cn } from "@/lib/utils"

const sistemas = [
  { nombre: "Línea de producción A",   kw: 320, pct: 35, estado: "Mejorable" },
  { nombre: "Compresores — Zona prensas", kw: 285, pct: 31, estado: "Crítico"  },
  { nombre: "Climatización industrial",  kw: 180, pct: 20, estado: "Óptimo"   },
  { nombre: "Iluminación nave y ext.",   kw:  75, pct:  8, estado: "Mejorable" },
  { nombre: "Oficinas y servicios",      kw:  55, pct:  6, estado: "Óptimo"   },
]

const estadoColor: Record<string, { bg: string; text: string; bar: string }> = {
  "Óptimo":    { bg: "bg-green-50",  text: "text-green-800",  bar: "bg-primary" },
  "Mejorable": { bg: "bg-orange-50", text: "text-orange-800", bar: "bg-orange-400" },
  "Crítico":   { bg: "bg-red-50",    text: "text-red-800",    bar: "bg-red-500" },
}

export default function SistemasPage() {
  const total = sistemas.reduce((a, s) => a + s.kw, 0)

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Análisis de Sistemas</h1>
        <p className="text-sm text-gray-500 mt-0.5">Consumo individualizado por equipo</p>
      </div>

      {/* Total */}
      <div className="rounded-3xl bg-primary/10 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Consumo total ahora</p>
          <p className="text-4xl font-semibold text-gray-900">
            {total} <span className="text-lg font-normal text-gray-500">kW</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Potencia contratada</p>
          <p className="text-2xl font-semibold text-gray-400">800 kW</p>
          <p className="text-xs text-primary font-semibold mt-0.5">{Math.round(total / 800 * 100)}% de uso</p>
        </div>
      </div>

      {/* Sistemas */}
      <div className="space-y-2">
        {sistemas.map((s) => {
          const c = estadoColor[s.estado]
          return (
            <div key={s.nombre} className="rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{s.nombre}</p>
                  <p className="text-xs text-gray-400">{s.kw} kW · {s.pct}% del total</p>
                </div>
                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", c.bg, c.text)}>
                  {s.estado}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", c.bar)} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
