"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingDown, Leaf, BarChart3, Cpu, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

const carouselSlides = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=80",
    alt: "Dashboard de analítica",
    title: (
      <>
        Reduce tu factura eléctrica entre un{" "}
        <span className="text-primary-foreground underline decoration-primary">20% y 35%</span>
      </>
    ),
    description:
      "PowerSave combina sensores IoT con inteligencia artificial para analizar tu consumo en tiempo real. Solo pagas si hay ahorro real.",
  },
  {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1280&q=80",
    alt: "Planta industrial con energía",
    title: (
      <>
        Preparate para cumplir la{" "}
        <span className="text-primary-foreground underline decoration-primary">Directiva (UE) 2023/1791 </span>
      </>
    ),
    description:
      "PowerSave te ayuda a cumplir con la Directiva (UE) 2023/1791 sobre la transparencia y el cumplimiento de la información ambiental.",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&q=80",
    alt: "Gráficas de análisis",
    title: (
      <>
        Análisis Predictivo con{" "}
        <span className="text-primary-foreground underline decoration-primary">Inteligencia Artificial</span>
      </>
    ),
    description:
      "Nuestros algoritmos de IA detectan patrones de desperdicio y recomiendan acciones concretas para optimizar tu consumo.",
  },
  {
    src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=80",
    alt: "Energía solar y sostenibilidad",
    title: (
      <>
        Cumple tus objetivos de{" "}
        <span className="text-primary-foreground underline decoration-primary">Sostenibilidad ESG</span>
      </>
    ),
    description:
      "Genera reportes automáticos de huella de carbono y cumplimiento normativo para inversores y reguladores.",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTextVisible(false)
      setTimeout(() => {
        setCurrent((index + carouselSlides.length) % carouselSlides.length)
        setTextVisible(true)
        setIsTransitioning(false)
      }, 350)
    },
    [isTransitioning]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 4000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, next])

  const slide = carouselSlides[current]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselSlides.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
              <img src={s.src} alt={s.alt} className="w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20 w-full">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-primary-foreground">
            <Cpu className="h-4 w-4" />
            Plataforma SaaS B2B de Monitoreo Energético
          </div>

          {/* Dynamic text: fades between slides */}
          <div className="transition-opacity duration-300" style={{ opacity: textVisible ? 1 : 0 }}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              {slide.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-200 lg:text-xl text-pretty">
              {slide.description}
            </p>
          </div>

          {/* Static buttons — siempre visibles */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90" asChild>
              <Link href="#" target="_blank">
                Probar Demo Interactiva
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            >
              <Play className="h-4 w-4" />
              Ver cómo funciona
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <span>Revenue Sharing</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>IA en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span>Cumplimiento ESG</span>
            </div>
          </div>
        </div>

        {/* Stats con Glassmorphism */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
          {[
            { value: "20-35%", label: "Ahorro en factura" },
            { value: "73K", label: "Ahorro potencial/año" },
            { value: "<2", label: "Semanas instalación" },
            { value: "24/7", label: "Monitoreo IoT" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl bg-white/5 backdrop-blur-md p-6 text-center border border-white/10"
            >
              <span className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</span>
              <span className="mt-2 text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
