"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Plus, Trash2, Send } from "lucide-react"
import { addSent, deleteSent } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Sent = {
  id: number
  itemName: string
  quantity: string
  destination: string
  recipient: string
  notes: string | null
  sentAt: Date
}

const empty = {
  itemName: "",
  quantity: "",
  destination: "",
  recipient: "",
  notes: "",
}

export function SentPanel({ sent }: { sent: Sent[] }) {
  const [form, setForm] = useState(empty)
  const [pending, startTransition] = useTransition()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.itemName.trim() ||
      !form.quantity.trim() ||
      !form.destination.trim() ||
      !form.recipient.trim()
    ) {
      toast.error("Completa material, cantidad, destino y destinatario")
      return
    }
    startTransition(async () => {
      await addSent(form)
      setForm(empty)
      toast.success("Envío registrado")
    })
  }

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteSent(id)
      toast.success("Registro eliminado")
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Send className="size-4 text-primary" />
            Registrar envío a Venezuela
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-item">Material</Label>
              <Input
                id="s-item"
                value={form.itemName}
                onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                placeholder="Ej. Paracetamol"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-qty">Cantidad</Label>
              <Input
                id="s-qty"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Ej. 100 unidades"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-dest">Destino (dónde)</Label>
              <Input
                id="s-dest"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                placeholder="Ciudad / hospital / zona"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-recipient">Destinatario (a quién)</Label>
              <Input
                id="s-recipient"
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                placeholder="Persona u organización"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-notes">Notas (opcional)</Label>
              <Textarea
                id="s-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={pending} className="gap-2">
              <Plus className="size-4" />
              Añadir envío
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Material enviado ({sent.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {sent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aún no has registrado envíos a Venezuela.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Destinatario</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sent.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.itemName}</TableCell>
                      <TableCell>{s.quantity}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {s.destination}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {s.recipient}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(s.sentAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(s.id)}
                          disabled={pending}
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
