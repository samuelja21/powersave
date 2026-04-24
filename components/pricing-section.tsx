import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    tagline: "Descubre lo que podemos hacer",
    price: "0%",
    priceDescription: "Sin comision",
    description: "Acceso gratuito para descubrir el potencial de ahorro de tu empresa.",
    features: [
      "Datos de consumo en tiempo real",
      "Gestion inteligente basica",
      "Porcentajes de consumo por areas",
      "Recomendaciones a medida",
      "Deteccion de maquinas problematicas",
      "Hasta 5 maquinas + 1 subcuadro",
    ],
    popular: false,
    cta: "Empezar Gratis",
  },
  {
    name: "Grow",
    tagline: "Bienvenido al ahorro",
    price: "20%",
    priceDescription: "del ahorro generado",
    description: "Para PYMEs que quieren maximizar su eficiencia energetica.",
    features: [
      "Todo lo del plan Starter",
      "Hasta 20 maquinas monitorizadas",
      "Todos los subcuadros incluidos",
      "Acuerdo de colaboracion anual",
      "Soporte prioritario",
      "Hardware: 139,99 EUR/maquina (pago unico)",
    ],
    popular: true,
    cta: "Solicitar Demo",
    highlight: "Una PYME con 40.000 EUR/ano en energia recupera el ahorro desde el primer mes",
  },
  {
    name: "Pro",
    tagline: "Potencia todo tu arsenal",
    price: "30%",
    priceDescription: "del ahorro generado",
    description: "Cobertura total para plantas industriales y grandes empresas.",
    features: [
      "Todo lo del plan Grow",
      "100% de maquinas y zonas",
      "Hardware: 99,99 EUR/maquina (pago unico)",
    ],
    popular: false,
    cta: "Contactar Ventas",
    highlight: "Planta con 8.000 EUR/mes puede ahorrar 15.000-35.000 EUR/ano",
  },
]

export function PricingSection() {
  return (
    <section id="precios" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Modelo de Precios
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Revenue Sharing: Solo pagas si ahorras
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Sin cuotas fijas hasta que no exista ahorro real demostrado. 
            Alineamos nuestros incentivos con los tuyos.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl bg-card p-8 shadow-sm border",
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary"
                  : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recomendado
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  {plan.tagline}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{plan.priceDescription}</span>
              </div>

              <ul className="mb-8 space-y-3 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.highlight && (
                <p className="mb-4 text-xs text-primary bg-primary/5 p-3 rounded-lg">
                  {plan.highlight}
                </p>
              )}

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Hardware info */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Kit hardware referencia:</strong> Desde 4.667 EUR para nave mediana 
            (4 subcuadros, 12 maquinas industriales, 8 equipos pequenos). 
            Recuperacion en menos de 3 semanas con factura de 40.000 EUR/mes o superior.
          </p>
        </div>
      </div>
    </section>
  )
}
