import { Clock, Snowflake, Lightbulb, Wrench, Cpu, ArrowRight } from "lucide-react"

const quickActions = [
  { icon: Clock,     title: "Adelantar parada de producción a 17:45",  desc: "Evita el pico de 18:00 en periodo Punta. Ahorro estimado sin coste operativo.",  saving: 420  },
  { icon: Snowflake, title: "Climatización: setpoint +2 °C en Punta",  desc: "El sistema de climatización consume 180 kW. Un ajuste de 2 °C reduce el consumo un 8%.", saving: 280 },
  { icon: Lightbulb, title: "Apagar alumbrado exterior a las 22:30",   desc: "Detectado funcionamiento hasta las 02:00 en zona de carga. Sin impacto operativo.", saving: 95  },
]

const costlyActions = [
  { icon: Wrench, title: "Variadores de frecuencia — Línea A",  desc: "Los motores de la línea A arrancan a plena potencia, generando picos de 120 kW. Los variadores eliminan este comportamiento.", saving: 1_800, cost: 28_000, roi: 16 },
  { icon: Cpu,    title: "Renovar compresor — Zona de prensas", desc: "Consumo actual: 340 kWh/h. Media sector para mismo equipo: 270 kWh/h. Degradación estimada del 26%.", saving:  980, cost: 15_500, roi: 16 },
]

export default function RecomendacionesPage() {
  const totalQuick  = quickActions.reduce((a, r) => a + r.saving, 0)
  const totalCostly = costlyActions.reduce((a, r) => a + r.saving, 0)

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Recomendaciones</h1>
        <p className="text-sm text-gray-500 mt-0.5">Acciones generadas por IA — Abril 2025</p>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Quick Actions</p>
          <span className="text-sm font-bold text-primary">−{totalQuick.toLocaleString()} €/mes</span>
        </div>
        <div className="space-y-2">
          {quickActions.map((r) => (
            <div key={r.title} className="rounded-2xl bg-white p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.desc}</p>
                <span className="inline-block mt-2 text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Sin inversión
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-primary">−{r.saving} €</p>
                <p className="text-[10px] text-gray-400">/mes</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones de inversión */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Acciones de inversión</p>
          <span className="text-sm font-bold text-primary">−{totalCostly.toLocaleString()} €/mes</span>
        </div>
        <div className="space-y-2">
          {costlyActions.map((r) => (
            <div key={r.title} className="rounded-2xl bg-white p-4">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <r.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-bold text-primary">−{r.saving.toLocaleString()} €</p>
                  <p className="text-[10px] text-gray-400">/mes</p>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400">Inversión</p>
                  <p className="text-sm font-semibold text-gray-900">{r.cost.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">ROI</p>
                  <p className="text-sm font-semibold text-gray-900">{r.roi} meses</p>
                </div>
                <button className="ml-auto flex items-center gap-1 text-xs text-primary font-semibold">
                  Ver detalle <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
