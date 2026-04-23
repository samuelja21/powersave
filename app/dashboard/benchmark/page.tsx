import { TrendingDown, TrendingUp } from "lucide-react"

const comparativa = [
  { label: "Tu empresa",       kwh: 28_000, pct: 57, color: "#248838", bgColor: "bg-primary" },
  { label: "Media del sector", kwh: 34_000, pct: 69, color: "#1565c0", bgColor: "bg-blue-500" },
  { label: "Top 10% sector",   kwh: 17_500, pct: 36, color: "#2e7d32", bgColor: "bg-green-600" },
]

export default function BenchmarkPage() {
  const gapSector = Math.round((34_000 - 28_000) / 34_000 * 100)
  const gapTop    = Math.round((28_000 - 17_500) / 28_000 * 100)
  const potencial = Math.round((28_000 - 17_500) * 180 * 0.152)  // 180 empleados × diferencia × precio

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Benchmark Sectorial</h1>
        <p className="text-sm text-gray-500 mt-0.5">Siderurgia y fabricación metálica · Cataluña</p>
      </div>

      {/* Percentil */}
      <div className="rounded-3xl bg-primary/10 p-5">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Tu posición</p>
        <p className="text-5xl font-semibold text-gray-900 mb-1">P62</p>
        <p className="text-sm text-gray-500 mb-4">Mejor que el 62% del sector en kWh/empleado/año</p>
        <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
          <div className="h-full w-[62%] bg-primary rounded-full" />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
          <span>Mayor consumo</span>
          <span>Mejor eficiencia</span>
        </div>
      </div>

      {/* Comparativa */}
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          kWh por empleado / año
        </p>
        <div className="space-y-4">
          {comparativa.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{item.kwh.toLocaleString()} kWh</p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={item.bgColor + " h-full rounded-full"} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brechas */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Análisis de brecha</p>
        <div className="space-y-2">
          <div className="rounded-2xl bg-white p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">vs Media del sector</p>
              <p className="text-xs text-gray-400">Consumes 6.000 kWh/empleado menos que la media</p>
            </div>
            <span className="text-sm font-bold text-primary">−{gapSector}%</span>
          </div>
          <div className="rounded-2xl bg-orange-50 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Potencial vs Top 10%</p>
              <p className="text-xs text-gray-400">
                Alcanzar el top 10% supondría {potencial.toLocaleString()} € adicionales/año
              </p>
            </div>
            <span className="text-sm font-bold text-orange-600">−{gapTop}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
