import Link from "next/link"
import { Zap, Linkedin, ExternalLink } from "lucide-react"

const footerLinks = {
  producto: [
    { name: "Funcionalidades", href: "#caracteristicas" },
    { name: "Precios", href: "#precios" },
    { name: "Demo Figma", href: "https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2", external: true },
  ],
  sectores: [
    { name: "Industria", href: "#sectores" },
    { name: "Retail", href: "#sectores" },
    { name: "Hosteleria", href: "#sectores" },
    { name: "Logistica", href: "#sectores" },
  ],
  normativo: [
    { name: "ISO 50001", href: "#" },
    { name: "CSRD", href: "#" },
    { name: "GRI", href: "#" },
    { name: "Directiva 2023/1791", href: "#" },
  ],
  equipo: [
    { name: "Edgard", href: "#" },
    { name: "Abel", href: "#" },
    { name: "Adria", href: "#" },
    { name: "Samuel", href: "#" },
    { name: "Brandon", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PowerSave</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-background/70 leading-relaxed">
              Plataforma SaaS B2B de monitoreo y optimizacion energetica. 
              Sensores IoT + IA para reducir entre 20-35% tu factura electrica.
            </p>
            <p className="mt-4 text-xs text-background/50">
              Proyecto Master en Ingenieria Informatica 2025
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="text-background/60 transition-colors hover:text-background"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold">Producto</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    className="text-sm text-background/60 transition-colors hover:text-background inline-flex items-center gap-1"
                  >
                    {link.name}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Sectores</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.sectores.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Cumplimiento</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.normativo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Equipo</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.equipo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-12 border-t border-background/10 pt-8">
          <p className="text-xs text-background/40 text-center">
            Stack: React + Node.js + Python | IA: TensorFlow | Cloud: Azure + AWS | Hardware: Circutor + Shelly
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} PowerSave. Todos los derechos reservados.
          </p>
          <p className="text-xs text-background/40">
            powersave.io
          </p>
        </div>
      </div>
    </footer>
  )
}
