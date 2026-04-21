"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"

const navigation = [
  { name: "Funcionalidades", href: "#caracteristicas" },
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "Precios", href: "#precios" },
  { name: "Sectores", href: "#sectores" },
  { name: "Contacto", href: "#contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PowerSave</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Abrir menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" asChild>
            <Link href="https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2" target="_blank">
              Ver Demo
            </Link>
          </Button>
          <Button>Solicitar Piloto</Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-6 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-center" asChild>
                <Link href="https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2" target="_blank">
                  Ver Demo
                </Link>
              </Button>
              <Button className="w-full justify-center">Solicitar Piloto</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
