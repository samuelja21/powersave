"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Zap, TrendingUp, CreditCard, Lightbulb,
  AlertTriangle, Sun, Clock, FileText,
  Cpu, BarChart2, Settings,
} from "lucide-react"
import { PowerSaveLogo } from "@/components/logo"

const nav = [
  { name: "Consumo actual",    href: "/dashboard/consumo",         icon: Zap,           f: "F1" },
  { name: "Predicción",        href: "/dashboard/prediccion",      icon: TrendingUp,    f: "F2" },
  { name: "Plan contratado",   href: "/dashboard/plan",            icon: CreditCard,    f: "F3" },
  { name: "Recomendaciones",   href: "/dashboard/recomendaciones", icon: Lightbulb,     f: "F4" },
  { name: "Irregularidades",   href: "/dashboard/irregularidades", icon: AlertTriangle, f: "F5" },
  { name: "Simulador solar",   href: "/dashboard/solar",           icon: Sun,           f: "F6" },
  { name: "Historial mejoras", href: "/dashboard/historial",       icon: Clock,         f: "F7" },
  { name: "Informes",          href: "/dashboard/informes",        icon: FileText,      f: "F8" },
  { name: "Análisis sistemas", href: "/dashboard/sistemas",        icon: Cpu,           f: "F9" },
  { name: "Benchmark",         href: "/dashboard/benchmark",       icon: BarChart2,     f: "F10" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <PowerSaveLogo className="w-9 h-9" />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">PowerSave</span>
        </Link>
      </div>

      {/* User */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-[#f4f6f3]">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            JG
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Jorge Garcia</p>
            <p className="text-xs text-gray-500 truncate">ArcelorMittal Lleida</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Funcionalidades
        </p>
        {nav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-all mb-0.5",
                isActive
                  ? "bg-primary/12 text-primary font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive ? "text-primary" : "text-gray-400")} />
              <span className="flex-1 truncate">{item.name}</span>
              <span className={cn("text-[10px] font-bold tabular-nums", isActive ? "text-primary/70" : "text-gray-300")}>
                {item.f}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-2 border-t border-gray-100 mt-2">
        <Link
          href="/dashboard/ajustes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
        >
          <Settings className="w-[18px] h-[18px] text-gray-400" />
          Ajustes
        </Link>
      </div>
    </aside>
  )
}
