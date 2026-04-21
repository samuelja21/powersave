"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  TrendingUp,
  BarChart3,
  Zap,
  Lightbulb,
  Leaf,
  Battery,
  FileText,
  Settings,
  Cpu,
} from "lucide-react"

const mainNav = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Prediccion", href: "/dashboard/prediccion", icon: TrendingUp },
]

const features = [
  { name: "Consumo tiempo real", href: "/dashboard/consumo", icon: BarChart3 },
  { name: "Alertas", href: "/dashboard/alertas", icon: Zap, badge: 3 },
  { name: "Recomendaciones", href: "/dashboard/recomendaciones", icon: Lightbulb },
  { name: "Simulador solar", href: "/dashboard/solar", icon: Leaf },
  { name: "Hardware IoT", href: "/dashboard/hardware", icon: Cpu },
]

const system = [
  { name: "Informes ESG", href: "/dashboard/informes", icon: FileText },
  { name: "Ajustes", href: "/dashboard/ajustes", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 w-[220px] min-h-screen bg-card border-r border-border flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            PowerSave
          </span>
        </Link>
      </div>

      {/* Main Nav */}
      <div className="px-3 pt-4 pb-1">
        <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Principal
        </p>
        {mainNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors relative",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-[22%] bottom-[22%] w-[3px] rounded-r bg-primary" />
              )}
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="h-px bg-border mx-4 my-2" />

      {/* Features */}
      <div className="px-3 pt-2 pb-1">
        <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Funcionalidades
        </p>
        {features.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors relative",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-[22%] bottom-[22%] w-[3px] rounded-r bg-primary" />
              )}
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
              {item.badge && (
                <span className="ml-auto bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <div className="h-px bg-border mx-4 my-2" />

      {/* System */}
      <div className="px-3 pt-2 pb-1">
        <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Sistema
        </p>
        {system.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors relative",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-[22%] bottom-[22%] w-[3px] rounded-r bg-primary" />
              )}
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* User Card */}
      <div className="mt-auto p-3 border-t border-border">
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted border border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
            JG
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Jorge Garcia</p>
            <p className="text-[10px] text-muted-foreground">Taller Garcia S.L.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
