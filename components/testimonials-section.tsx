import { Building2, Factory, ShoppingBag, Truck, Hotel, Hospital } from "lucide-react"

const segments = [
  {
    name: "Industria",
    description: "Plantas con alto consumo energetico (>500 MWh/ano). Deteccion de maquinas degradadas y optimizacion de arranques.",
    icon: Factory,
    savings: "2.000-6.000 EUR/mes",
  },
  {
    name: "Retail",
    description: "Superficies comerciales con climatizacion intensiva. Optimizacion de iluminacion y HVAC.",
    icon: ShoppingBag,
    savings: "1.500-3.500 EUR/mes",
  },
  {
    name: "Hosteleria",
    description: "Hoteles y restaurantes con consumo variable. Gestion de picos y valles tarifarios.",
    icon: Hotel,
    savings: "1.000-2.500 EUR/mes",
  },
  {
    name: "Logistica",
    description: "Centros de distribucion y almacenes. Control de camaras frigorificas y equipos de carga.",
    icon: Truck,
    savings: "1.200-3.000 EUR/mes",
  },
  {
    name: "Salud",
    description: "Hospitales privados y clinicas. Cumplimiento normativo y eficiencia 24/7.",
    icon: Hospital,
    savings: "1.500-4.000 EUR/mes",
  },
  {
    name: "Corporativo",
    description: "Parques empresariales y edificios de oficinas. Reporting ESG automatizado.",
    icon: Building2,
    savings: "800-2.000 EUR/mes",
  },
]

const partners = [
  "Honeywell",
  "Schneider Electric",
  "Siemens",
  "Microsoft Azure",
  "AWS",
  "Endesa X",
]

export function TestimonialsSection() {
  return (
    <section id="sectores" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Sectores
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Soluciones para cada industria
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Empresas con factura electrica mensual superior a 5.000 EUR, 
            maquinaria industrial o climatizacion intensiva.
          </p>
        </div>

        {/* Sectors grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className="flex flex-col rounded-2xl bg-card p-6 shadow-sm border border-border transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <segment.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {segment.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-grow">
                {segment.description}
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Ahorro tipico: </span>
                <span className="text-sm font-semibold text-primary">{segment.savings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="mx-auto mt-20 max-w-4xl">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Socios tecnologicos y de hardware
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-lg font-semibold text-muted-foreground/60 hover:text-primary transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Target criteria */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8">
            <h3 className="text-lg font-semibold text-foreground text-center mb-6">
              Criterios de segmentacion
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground">Factura electrica mensual superior a 5.000 EUR</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground">Maquinaria industrial o climatizacion intensiva</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground">Objetivos ESG o compromisos de descarbonizacion</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground">Consumo entre 50 y 500+ MWh/ano</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
