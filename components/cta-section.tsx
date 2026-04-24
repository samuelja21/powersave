import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="contacto" className="py-20 lg:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
            Objetivo: 1M EUR de facturacion en el primer ano
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
            Prueba nuestra demo interactiva y descubre cuanto puedes ahorrar. 
            Modelo revenue sharing: solo pagas si hay ahorro real demostrado.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto gap-2"
              asChild
            >
              <Link href="https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2" target="_blank">
                Ver Demo en Figma
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Solicitar Piloto Gratuito
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { label: "Onboarding", value: "<2 semanas" },
              { label: "Prueba piloto", value: "Gratis" },
              { label: "ROI hardware", value: "4-8 semanas" },
              { label: "Soporte", value: "24/7" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">{item.value}</div>
                <div className="text-sm text-primary-foreground/70">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-primary-foreground/60">
            Proyecto del Master en Ingenieria Informatica 2026
          </p>
        </div>
      </div>
    </section>
  )
}
