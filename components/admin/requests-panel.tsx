"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { MapPin, Phone, Inbox } from "lucide-react"
import { updateRequestStatus } from "@/app/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Request = {
  id: number
  name: string
  contact: string
  location: string
  items: string
  notes: string | null
  status: string
  createdAt: Date
}

const STATUS = {
  pending: { label: "Pendiente", variant: "secondary" as const },
  in_progress: { label: "En curso", variant: "default" as const },
  fulfilled: { label: "Atendida", variant: "outline" as const },
}

function StatusSelect({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition()
  const [value, setValue] = useState(status)

  const onChange = (next: string | null) => {
    if (!next) return
    setValue(next)
    startTransition(async () => {
      await updateRequestStatus(id, next)
      toast.success("Estado actualizado")
    })
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={pending}>
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pendiente</SelectItem>
        <SelectItem value="in_progress">En curso</SelectItem>
        <SelectItem value="fulfilled">Atendida</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function RequestsPanel({ requests }: { requests: Request[] }) {
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">
            No hay solicitudes todavía. Aparecerán aquí cuando alguien las envíe desde
            Venezuela.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {requests.map((r) => {
        const meta = STATUS[r.status as keyof typeof STATUS] ?? STATUS.pending
        return (
          <Card key={r.id}>
            <CardContent className="py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{r.name}</h3>
                    <Badge variant={meta.variant}>{meta.label}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="size-3.5" />
                      {r.contact}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {r.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusSelect id={r.id} status={r.status} />
                  <span className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>
              <div className="mt-3 rounded-md bg-secondary/60 px-3 py-2 text-sm text-foreground">
                <span className="font-medium">Necesita: </span>
                {r.items}
              </div>
              {r.notes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">Notas: </span>
                  {r.notes}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
