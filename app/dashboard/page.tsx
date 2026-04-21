import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Leaf,
  ArrowRight,
  BarChart3,
  Euro
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Buenos dias, Jorge
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen de tu consumo energetico - Noviembre 2024
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-5 shadow-sm border-border col-span-2 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Consumo este mes</p>
              <p className="text-3xl font-bold text-foreground">847 <span className="text-lg font-normal text-muted-foreground">kWh</span></p>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">-12% vs mes anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-sm border-border">
          <Euro className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="text-xl font-bold text-foreground">342</p>
          <p className="text-[11px] text-muted-foreground">Coste acumulado</p>
          <p className="text-[11px] font-semibold text-primary mt-1">-28 vs oct</p>
        </Card>

        <Card className="p-4 shadow-sm border-border">
          <Leaf className="w-5 h-5 text-secondary mb-2" />
          <p className="text-xl font-bold text-foreground">1.2t</p>
          <p className="text-[11px] text-muted-foreground">CO2 evitado</p>
          <p className="text-[11px] font-semibold text-secondary mt-1">+15% eficiencia</p>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="p-4 mb-6 border-amber-200 bg-amber-50/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">3 alertas activas</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pico de consumo detectado ayer a las 14:30 - Climatizacion funcionando fuera de horario
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100">
            Ver
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Acciones rapidas
      </p>
      
      <div className="space-y-2.5">
        <Link href="/dashboard/prediccion">
          <Card className="p-4 cursor-pointer transition-all hover:shadow-md hover:translate-y-[-1px] flex items-center gap-3.5 border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Prediccion de consumo</p>
              <p className="text-xs text-muted-foreground">Estima tu gasto y simula mejoras</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        </Link>

        <Link href="/dashboard/consumo">
          <Card className="p-4 cursor-pointer transition-all hover:shadow-md hover:translate-y-[-1px] flex items-center gap-3.5 border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Consumo en tiempo real</p>
              <p className="text-xs text-muted-foreground">Monitoriza tu energia al instante</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        </Link>

        <Link href="/dashboard/recomendaciones">
          <Card className="p-4 cursor-pointer transition-all hover:shadow-md hover:translate-y-[-1px] flex items-center gap-3.5 border-border">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Recomendaciones IA</p>
              <p className="text-xs text-muted-foreground">Optimiza con inteligencia artificial</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        </Link>
      </div>
    </div>
  )
}
