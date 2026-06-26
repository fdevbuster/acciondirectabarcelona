"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const EXPORTS = [
  { label: "Solicitudes", table: "requests", file: "solicitudes.csv" },
  { label: "Material recibido", table: "received", file: "material_recibido.csv" },
  { label: "Material enviado", table: "sent", file: "material_enviado.csv" },
]

export function ExportButtons() {
  const [loading, setLoading] = useState<string | null>(null)

  const download = async (table: string, file: string) => {
    setLoading(table)
    try {
      const res = await fetch(`/api/export?table=${table}`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Error al exportar")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {EXPORTS.map(({ label, table, file }) => (
        <Button
          key={table}
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={loading !== null}
          onClick={() => download(table, file)}
        >
          <Download className="size-4" />
          {loading === table ? "Exportando..." : label}
        </Button>
      ))}
    </div>
  )
}
