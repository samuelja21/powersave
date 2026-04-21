import { Cable, Brain, TrendingUp, Sparkles } from "lucide-react"

const steps = [
  {
    step: "01",
    name: "Instalacion de Sensores IoT",
    description:
      "Instalamos sensores Circutor y Shelly en cuadro general, subcuadros y maquinas. Gateway 4G industrial para conectividad continua. Proceso en menos de 2 semanas.",
    icon: Cable,
  },
  {
    step: "02",
    name: "Analisis con Inteligencia Artificial",
    description:
      "Nuestros modelos de IA (TensorFlow) analizan tus patrones de consumo, detectan anomalias, maquinas degradadas y oportunidades de ahorro inmediatas.",
    icon: Brain,
  },
  {
    step: "03",
    name: "Recomendaciones Priorizadas",
    description:
      "Recibes Quick Actions sin coste y acciones de mayor inversion. Cada recomendacion incluye por que se genera, coste e impacto estimado en ahorro.",
    icon: Sparkles,
  },
  {
    step: "04",
    name: "Ahorro Real y Verificable",
    description:
      "Visualiza el ahorro en tiempo real con graficos antes/despues. Informes automaticos para auditorias y cumplimiento ESG (CSRD, ISO 50001).",
    icon: TrendingUp,
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Como Funciona
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            De la instalacion al ahorro en 5 pasos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Onboarding guiado con instalacion de sensores y configuracion de plataforma 
            en menos de 2 semanas. Nuestro equipo te acompana en todo el proceso.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2 lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  className={`relative flex flex-col lg:flex-row lg:items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pl-20 lg:pl-0 ${
                      index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                    }`}
                  >
                    <div
                      className={`max-w-md ${
                        index % 2 === 0 ? "lg:ml-auto" : ""
                      }`}
                    >
                      <span className="text-sm font-bold text-primary">
                        Paso {step.step}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:relative lg:z-10">
                    <step.icon className="h-7 w-7" />
                  </div>

                  {/* Empty space for layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
