"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Plus, Trash2, PackageCheck } from "lucide-react"
import { addReceived, deleteReceived } from "@/app/actions/admin"
import { collectionPoints } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Received = {
  id: number
  itemName: string
  quantity: string
  collectionPoint: string
  donorName: string | null
  notes: string | null
  receivedAt: Date
}

const empty = {
  itemName: "",
  quantity: "",
  collectionPoint: collectionPoints[0].name,
  donorName: "",
  notes: "",
}

export function ReceivedPanel({ received }: { received: Received[] }) {
  const [form, setForm] = useState(empty)
  const [pending, startTransition] = useTransition()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.itemName.trim() || !form.quantity.trim()) {
      toast.error("Indica el material y la cantidad")
      return
    }
    startTransition(async () => {
      await addReceived(form)
      setForm(empty)
      toast.success("Material registrado")
    })
  }

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteReceived(id)
      toast.success("Registro eliminado")
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PackageCheck className="size-4 text-primary" />
            Registrar material recibido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="r-item">Material</Label>
              <Input
                id="r-item"
                value={form.itemName}
                onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                placeholder="Ej. Gasas estériles"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="r-qty">Cantidad</Label>
              <Input
                id="r-qty"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Ej. 20 cajas"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Punto de recogida</Label>
              <Select
                value={form.collectionPoint}
                onValueChange={(v) => setForm({ ...form, collectionPoint: v ?? form.collectionPoint })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {collectionPoints.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="r-donor">Donante (opcional)</Label>
              <Input
                id="r-donor"
                value={form.donorName}
                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                placeholder="Nombre del donante"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="r-notes">Notas (opcional)</Label>
              <Textarea
                id="r-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={pending} className="gap-2">
              <Plus className="size-4" />
              Añadir registro
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Material recibido ({received.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {received.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aún no has registrado material recibido.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Punto</TableHead>
                    <TableHead>Donante</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {received.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.itemName}</TableCell>
                      <TableCell>{r.quantity}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.collectionPoint}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.donorName || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(r.receivedAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(r.id)}
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
