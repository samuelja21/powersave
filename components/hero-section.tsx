import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingDown, Leaf, BarChart3, Cpu } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Cpu className="h-4 w-4" />
            Plataforma SaaS B2B de Monitoreo Energetico
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Reduce tu factura electrica entre un{" "}
            <span className="text-primary">20% y 35%</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl text-pretty">
            PowerSave combina sensores IoT con inteligencia artificial para analizar 
            tu consumo en tiempo real y generar recomendaciones accionables. 
            Solo pagas si hay ahorro real.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <Link href="https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2" target="_blank">
                Probar Demo Interactiva
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              <Play className="h-4 w-4" />
              Ver como funciona
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <span>Revenue Sharing: Pagas solo si ahorras</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Analisis con IA en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span>Cumplimiento ESG y normativo</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
          {[
            { value: "20-35%", label: "Ahorro en factura electrica" },
            { value: "73K", label: "Euros de ahorro potencial/ano" },
            { value: "<2", label: "Semanas de instalacion" },
            { value: "24/7", label: "Monitoreo continuo con IoT" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm border border-border"
            >
              <span className="text-3xl font-bold text-primary lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
