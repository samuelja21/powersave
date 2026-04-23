import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <DashboardSidebar />
      <main className="ml-64 min-h-screen">
        <div className="max-w-2xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
