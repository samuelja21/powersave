"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Euro, 
  Leaf, 
  TrendingDown, 
  Clock, 
  Snowflake, 
  Lightbulb, 
  Battery,
  Check,
  ArrowRight
} from "lucide-react"

const periods = ["7 dias", "Mensual", "Trimestral", "Anual"]

const mejoras = [
  {
    id: 1,
    title: "Desplazamiento de horarios",
    description: "Mover procesos pesados a periodo Valle (00h-08h)",
    saving: 41,
    icon: Clock,
    iconBg: "bg-amber-50 text-amber-600",
    selected: true,
  },
  {
    id: 2,
    title: "Optimizacion de climatizacion",
    description: "Automatizar apagado en paradas y ajustar 2C en pico",
    saving: 28,
    icon: Snowflake,
    iconBg: "bg-primary/10 text-primary",
    selected: true,
  },
  {
    id: 3,
    title: "Iluminacion LED inteligente",
    description: "Sensores de presencia + regulacion por luz natural",
    saving: 18,
    icon: Lightbulb,
    iconBg: "bg-blue-50 text-blue-600",
    selected: false,
  },
  {
    id: 4,
    title: "Cambio de tarifa contratada",
    description: "Renegociar potencia contratada a tu perfil real",
    saving: 10,
    icon: Battery,
    iconBg: "bg-amber-50 text-amber-600",
    selected: false,
  },
]

export default function PrediccionPage() {
  const [activePeriod, setActivePeriod] = useState("Mensual")
  const [showActual, setShowActual] = useState(true)
  const [showMejoras, setShowMejoras] = useState(true)
  const [selectedMejoras, setSelectedMejoras] = useState<number[]>([1, 2])

  const toggleMejora = (id: number) => {
    setSelectedMejoras((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const totalSaving = mejoras
    .filter((m) => selectedMejoras.includes(m.id))
    .reduce((acc, m) => acc + m.saving, 0)

  const costoActual = 486
  const costoConMejoras = costoActual - totalSaving
  const porcentajeReduccion = Math.round((totalSaving / costoActual) * 100)

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Prediccion de Consumo
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Estimacion basada en tu historial + IA
        </p>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-1.5 bg-muted rounded-xl p-1 mb-5">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
              activePeriod === period
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Scenario Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Escenario visible
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => setShowActual(!showActual)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border",
              showActual
                ? "bg-foreground text-background border-foreground"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            Actual
          </button>
          <button
            onClick={() => setShowMejoras(!showMejoras)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border",
              showMejoras
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-primary/10 text-primary border-primary/20"
            )}
          >
            Con mejoras
          </button>
        </div>
      </div>

      {/* Chart Card */}
      <Card className="p-5 mb-4 shadow-md border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[11px] text-muted-foreground font-medium mb-1">
              Consumo estimado - Noviembre
            </p>
            <p className="text-3xl font-bold text-foreground">
              1.247 <span className="text-sm font-normal text-muted-foreground">kWh</span>
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            -12% vs Oct
          </span>
        </div>

        {/* SVG Chart */}
        <svg className="w-full h-[180px] overflow-visible" viewBox="0 0 360 160">
          <defs>
            <linearGradient id="aG1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="aG2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="40" x2="360" y2="40" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="0" y1="80" x2="360" y2="80" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="0" y1="120" x2="360" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
          
          {/* Y-axis labels */}
          <text x="2" y="38" fill="hsl(var(--muted-foreground))" fontSize="9">60kWh</text>
          <text x="2" y="78" fill="hsl(var(--muted-foreground))" fontSize="9">40kWh</text>
          <text x="2" y="118" fill="hsl(var(--muted-foreground))" fontSize="9">20kWh</text>
          
          {/* Today line */}
          <line x1="228" y1="20" x2="228" y2="140" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3,3" />
          <text x="232" y="30" fill="hsl(var(--muted-foreground))" fontSize="9">Hoy</text>
          
          {/* Actual line */}
          {showActual && (
            <>
              <path d="M28,115 C60,95 92,88 124,85 C156,78 172,58 204,55 C236,48 268,34 300,32 C332,28 344,30 352,28 L352,140 L28,140 Z" fill="url(#aG1)" />
              <path d="M28,115 C60,95 92,88 124,85 C156,78 172,58 204,55 C236,48 268,34 300,32 C332,28 344,30 352,28" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
          
          {/* Mejoras line */}
          {showMejoras && (
            <>
              <path d="M28,118 C60,100 92,95 124,93 C156,88 172,70 204,66 C236,59 268,42 300,40 C332,36 344,38 352,35 L352,140 L28,140 Z" fill="url(#aG2)" opacity="0.8" />
              <path d="M28,118 C60,100 92,95 124,93 C156,88 172,70 204,66 C236,59 268,42 300,40 C332,36 344,38 352,35" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6,3" />
            </>
          )}
          
          {/* Current point */}
          {showActual && (
            <>
              <circle cx="228" cy="55" r="9" fill="hsl(var(--primary))" opacity="0.12" />
              <circle cx="228" cy="55" r="5" fill="hsl(var(--primary))" />
            </>
          )}
          
          {/* X-axis labels */}
          <text x="28" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">1</text>
          <text x="84" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">7</text>
          <text x="140" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">13</text>
          <text x="196" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">18</text>
          <text x="252" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">23</text>
          <text x="308" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">28</text>
          <text x="352" y="155" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">30</text>
        </svg>

        {/* Legend */}
        <div className="flex gap-4 mt-3.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
            <div className="w-5 h-0.5 rounded bg-primary" />
            Configuracion actual
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
            <div className="w-5 h-0.5 rounded bg-secondary" style={{ background: "repeating-linear-gradient(90deg, hsl(var(--secondary)) 0, hsl(var(--secondary)) 4px, transparent 4px, transparent 8px)" }} />
            Con mejoras aplicadas
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <Card className="p-4 shadow-sm border-border">
          <Zap className="w-5 h-5 text-primary mb-2" />
          <p className="text-xl font-bold text-foreground">1.247</p>
          <p className="text-[11px] text-muted-foreground">kWh estimados</p>
          <p className="text-[11px] font-semibold text-red-500 mt-1.5">+3% vs media</p>
        </Card>
        <Card className="p-4 shadow-sm border-border">
          <Euro className="w-5 h-5 text-primary mb-2" />
          <p className="text-xl font-bold text-foreground">{costoActual}</p>
          <p className="text-[11px] text-muted-foreground">Coste estimado</p>
          <p className="text-[11px] font-semibold text-red-500 mt-1.5">+18 vs oct</p>
        </Card>
        <Card className="p-4 shadow-sm border-border">
          <Leaf className="w-5 h-5 text-secondary mb-2" />
          <p className="text-xl font-bold text-foreground">{costoConMejoras}</p>
          <p className="text-[11px] text-muted-foreground">Con mejoras</p>
          <p className="text-[11px] font-semibold text-primary mt-1.5">-{totalSaving} ahorro</p>
        </Card>
        <Card className="p-4 shadow-sm border-border">
          <TrendingDown className="w-5 h-5 text-secondary mb-2" />
          <p className="text-xl font-bold text-foreground">-{porcentajeReduccion}%</p>
          <p className="text-[11px] text-muted-foreground">Reduccion posible</p>
          <p className="text-[11px] font-semibold text-primary mt-1.5">Potencial maximo</p>
        </Card>
      </div>

      {/* Projection Box */}
      <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-2xl p-5 mb-4 text-background relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-background/5" />
        
        <p className="text-[11px] font-semibold uppercase tracking-wider text-background/70 mb-2.5">
          Resumen del mes - Noviembre 2024
        </p>
        
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex-1">
            <p className="text-xs text-background/70 mb-1">Sin optimizar</p>
            <p className="text-2xl font-bold">{costoActual}</p>
          </div>
          <span className="text-xs text-background/70 px-2.5">→</span>
          <div className="flex-1">
            <p className="text-xs text-background/70 mb-1">Con mejoras</p>
            <p className="text-2xl font-bold">{costoConMejoras}</p>
          </div>
          <div className="bg-secondary rounded-xl px-3.5 py-2.5 text-center min-w-[90px]">
            <p className="text-lg font-extrabold text-secondary-foreground">{totalSaving}</p>
            <p className="text-[10px] text-secondary-foreground/80">ahorro est.</p>
          </div>
        </div>
        
        <div className="flex justify-between text-[10px] text-background/70 mb-1.5">
          <span>0%</span>
          <span>Reduccion posible: {porcentajeReduccion}%</span>
          <span>100%</span>
        </div>
        <div className="h-1.5 bg-background/10 rounded-full">
          <div 
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${porcentajeReduccion}%` }}
          />
        </div>
      </div>

      {/* Mejoras Header */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Mejoras disponibles
        </p>
        <p className="text-[11px] text-muted-foreground">Selecciona para simular</p>
      </div>

      {/* Mejoras Cards */}
      <div className="space-y-2.5 mb-4">
        {mejoras.map((mejora) => {
          const isSelected = selectedMejoras.includes(mejora.id)
          return (
            <Card
              key={mejora.id}
              onClick={() => toggleMejora(mejora.id)}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md flex items-start gap-3.5 relative overflow-hidden border",
                isSelected
                  ? "border-secondary bg-primary/5"
                  : "border-border hover:translate-y-[-1px]"
              )}
            >
              {isSelected && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-r" />
              )}
              
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mb-1.5",
                    isSelected
                      ? "bg-secondary border-secondary text-secondary-foreground"
                      : "border-border"
                  )}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>
              
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", mejora.iconBg)}>
                <mejora.icon className="w-[18px] h-[18px]" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{mejora.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{mejora.description}</p>
              </div>
              
              <div className="text-right flex-shrink-0">
                <p className="text-[15px] font-bold text-primary">-{mejora.saving}</p>
                <p className="text-[10px] text-muted-foreground">/mes est.</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Divider & CTA */}
      <div className="h-px bg-border mb-4" />
      <Button className="w-full py-6 text-[15px] font-semibold shadow-lg">
        <Zap className="w-4 h-4 mr-2" />
        Ver plan de accion completo
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
