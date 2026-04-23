import { CheckCircle } from "lucide-react"

const historial = [
  { fecha: "Mar 2025", accion: "Instalación variadores de frecuencia — Línea B", ahorro: 1_650 },
  { fecha: "Feb 2025", accion: "Automatización parada climatización industrial 17:45", ahorro: 840 },
  { fecha: "Ene 2025", accion: "Renegociación tarifa: reducción potencia de 1.000 a 800 kW", ahorro: 3_200 },
  { fecha: "Nov 2024", accion: "Sustitución iluminación nave principal y zona prensas — LED", ahorro: 620 },
  { fecha: "Sep 2024", accion: "Configuración apagado automático compresores auxiliares nocturnos", ahorro: 480 },
]

export default function HistorialPage() {
  const total = historial.reduce((a, h) => a + h.ahorro, 0)

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Historial de Mejoras</h1>
        <p className="text-sm text-gray-500 mt-0.5">Acciones implementadas y ahorro acumulado</p>
      </div>

      {/* Total */}
      <div className="rounded-3xl bg-primary/10 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Ahorro acumulado</p>
          <p className="text-4xl font-semibold text-gray-900">{total.toLocaleString()} <span className="text-lg font-normal text-gray-500">€/mes</span></p>
          <p className="text-xs text-gray-500 mt-1">
            {(total * 12).toLocaleString()} € ahorrados este año
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">−{Math.round(total / 70_000 * 100)}%</p>
          <p className="text-xs text-gray-500">sobre factura base</p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Acciones implementadas</p>
        <div className="relative">
          <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gray-200" />
          <div className="space-y-3">
            {historial.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 rounded-2xl bg-white p-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
