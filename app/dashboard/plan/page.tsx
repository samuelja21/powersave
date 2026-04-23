import { TrendingDown } from "lucide-react"

const facturas = [
  { mes: "Abril 2025",   importe: 57_800, ahorro: 12_200, estado: "En curso" },
  { mes: "Marzo 2025",   importe: 54_200, ahorro: 15_800, estado: "Cerrada" },
  { mes: "Febrero 2025", importe: 56_100, ahorro: 13_900, estado: "Cerrada" },
]

export default function PlanPage() {
  const ahorroMes = 17_500
  const comisionPS = Math.round(ahorroMes * 0.30)  // Plan PRO
  const ahorroNeto = ahorroMes - comisionPS

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Plan Contratado</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tarifa activa y ahorro generado</p>
      </div>

      {/* Tarifa */}
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Tarifa eléctrica</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Modalidad",          value: "6.1TD — Gran industrial" },
            { label: "Potencia contratada", value: "800 kW" },
            { label: "Comercializadora",   value: "Endesa Industrial" },
            { label: "Factura media/mes",  value: "70.000 €" },
            { label: "Precio energía",     value: "0,152 €/kWh" },
            { label: "Precio potencia",    value: "44,50 €/kW·año" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl bg-[#f4f6f3] px-4 py-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{f.label}</p>
              <p className="text-sm font-semibold text-gray-900">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan PowerSave */}
      <div className="rounded-3xl p-5 bg-primary/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Plan PRO activo</span>
        </div>
        <p className="text-xs text-gray-500 mb-5">PowerSave cobra el 30% del ahorro real demostrado</p>

        <div className="space-y-3">
          {[
            { label: "Ahorro bruto este mes", value: `${ahorroMes.toLocaleString()} €`, main: true },
            { label: "Comisión PowerSave (30%)", value: `−${comisionPS.toLocaleString()} €`, sub: true },
            { label: "Tu ahorro neto",           value: `${ahorroNeto.toLocaleString()} €`, bold: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{row.label}</p>
              <p className={row.bold ? "text-base font-bold text-primary" : row.sub ? "text-sm text-gray-400" : "text-sm font-semibold text-gray-900"}>
                {row.value}
              </p>
            </div>
          ))}
          <div className="h-px bg-primary/20 my-1" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Reducción sobre factura base</p>
            <div className="flex items-center gap-1 text-primary font-bold">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">−25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facturas recientes */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Últimas facturas</p>
        <div className="space-y-2">
          {facturas.map((f) => (
            <div key={f.mes} className="rounded-2xl bg-white p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{f.mes}</p>
                <p className="text-xs text-gray-400">{f.importe.toLocaleString()} € facturado · {f.estado}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">−{f.ahorro.toLocaleString()} €</p>
                <p className="text-[10px] text-gray-400">ahorro PowerSave</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
