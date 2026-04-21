import {
  Zap,
  BarChart3,
  Bell,
  Sun,
  FileText,
  Activity,
  Lightbulb,
  TrendingUp,
  Gauge,
} from "lucide-react"

const features = [
  {
    name: "Consumo en Tiempo Real",
    description:
      "Visualiza el consumo dividido en periodos tarifarios (Punta, Llano, Valle) para optimizar cuando usas mas energia.",
    icon: Activity,
  },
  {
    name: "Prediccion con IA",
    description:
      "Prediccion de consumo futuro (semanal, mensual) con analisis de tendencias y simulacion de mejoras sugeridas.",
    icon: TrendingUp,
  },
  {
    name: "Recomendaciones Inteligentes",
    description:
      "Quick Actions sin coste y acciones de mayor inversion, cada una con coste estimado e impacto en ahorro.",
    icon: Lightbulb,
  },
  {
    name: "Deteccion de Irregularidades",
    description:
      "Analisis de intervalos de 15 minutos para detectar penalizaciones por exceso o sobrecarga de potencia contratada.",
    icon: Bell,
  },
  {
    name: "Simulador Solar",
    description:
      "Calcula paneles necesarios, ahorro anual, ROI, ayudas disponibles y reduccion de CO2 con datos reales de tu empresa.",
    icon: Sun,
  },
  {
    name: "Analisis por Sistema",
    description:
      "Desglose de consumo por maquina, climatizacion, iluminacion. Identifica equipos degradados o con consumo excesivo.",
    icon: Gauge,
  },
  {
    name: "Benchmark Sectorial",
    description:
      "Compara tu consumo con empresas del mismo sector y tamano. Visualiza en que percentil te encuentras.",
    icon: BarChart3,
  },
  {
    name: "Informes ESG Automaticos",
    description:
      "Generacion de informes para CSRD, GRI, ISO 50001 y Directiva 2023/1791. Exportacion personalizable.",
    icon: FileText,
  },
  {
    name: "Hardware IoT Integrado",
    description:
      "Sensores Circutor y Shelly para cuadros generales, subcuadros y maquinas individuales. Gateway 4G industrial.",
    icon: Zap,
  },
]

export function FeaturesSection() {
  return (
    <section id="caracteristicas" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Funcionalidades
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Plataforma completa de optimizacion energetica
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Desde monitorizacion basica hasta analisis avanzado con IA. 
            Todo lo que necesitas para reducir costes y cumplir normativas ESG.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative rounded-2xl bg-card p-6 shadow-sm border border-border transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
