"use client"

import { useState, useTransition, useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Plus, Trash2, PackageCheck, Camera, X } from "lucide-react"
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
  quantityPerUnit: string | null
  collectionPoint: string
  collectionDate: Date | null
  donorName: string | null
  notes: string | null
  imageUrl: string | null
  expiresAt: Date | null
  receivedAt: Date
  userName?: string | null
}

const empty = {
  itemName: "",
  quantity: "",
  quantityPerUnit: "",
  collectionPoint: collectionPoints[0].name,
  collectionDate: "",
  donorName: "",
  notes: "",
  expiresAt: "",
}

export function ReceivedPanel({ received, isSuperAdmin = false }: { received: Received[]; isSuperAdmin?: boolean }) {
  const [form, setForm] = useState(empty)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [uploading, setUploading] = useState(false)
  const [pending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setImageUrl(data.url)
      toast.success("Foto subida")
    } catch {
      toast.error("Error al subir la foto")
    } finally {
      setUploading(false)
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.itemName.trim() || !form.quantity.trim()) {
      toast.error("Indica el material y la cantidad")
      return
    }
    startTransition(async () => {
      await addReceived({ ...form, imageUrl: imageUrl ?? undefined, expiresAt: form.expiresAt || undefined })
      setForm(empty)
      setImageUrl(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
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
              <Label htmlFor="r-coldate">Fecha de recogida</Label>
              <Input
                id="r-coldate"
                type="date"
                value={form.collectionDate}
                onChange={(e) => setForm({ ...form, collectionDate: e.target.value })}
              />
            </div>
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
              <Label htmlFor="r-qpu">Cantidad por envase (opcional)</Label>
              <Input
                id="r-qpu"
                value={form.quantityPerUnit}
                onChange={(e) => setForm({ ...form, quantityPerUnit: e.target.value })}
                placeholder="Ej. 500 mg, 10 unidades"
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
              <Label htmlFor="r-expires">Fecha de caducidad (opcional)</Label>
              <Input
                id="r-expires"
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
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

            {/* Photo upload */}
            <div className="flex flex-col gap-2">
              <Label>Foto del material (opcional)</Label>
              {imageUrl ? (
                <div className="relative w-full overflow-hidden rounded-lg border border-border">
                  <Image src={imageUrl} alt="Material" width={300} height={180} className="w-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 size-7"
                    onClick={() => {
                      setImageUrl(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-5 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-secondary/60 disabled:opacity-50"
                >
                  <Camera className="size-4" />
                  {uploading ? "Subiendo..." : "Añadir foto"}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <Button type="submit" disabled={pending || uploading} className="gap-2">
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
              Aún no hay material registrado.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14">Foto</TableHead>
                    <TableHead>F. recogida</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Cant./envase</TableHead>
                    <TableHead>Punto</TableHead>
                    <TableHead>Donante</TableHead>
                    {isSuperAdmin && <TableHead>Voluntario</TableHead>}
                    <TableHead>Caducidad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {received.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {r.collectionDate ? new Date(r.collectionDate).toLocaleDateString("es-ES") : "—"}
                      </TableCell>
                      <TableCell>
                        {r.imageUrl ? (
                          <a href={r.imageUrl} target="_blank" rel="noopener noreferrer">
                            <Image
                              src={r.imageUrl}
                              alt={r.itemName}
                              width={44}
                              height={44}
                              className="rounded-md object-cover"
                            />
                          </a>
                        ) : (
                          <div className="flex size-11 items-center justify-center rounded-md bg-secondary">
                            <Camera className="size-4 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{r.itemName}</TableCell>
                      <TableCell>{r.quantity}</TableCell>
                      <TableCell className="text-muted-foreground">{r.quantityPerUnit || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{r.collectionPoint}</TableCell>
                      <TableCell className="text-muted-foreground">{r.donorName || "—"}</TableCell>
                      {isSuperAdmin && (
                        <TableCell className="text-muted-foreground">{r.userName || "—"}</TableCell>
                      )}
                      <TableCell className={r.expiresAt && new Date(r.expiresAt) < new Date() ? "font-medium text-destructive" : "text-muted-foreground"}>
                        {r.expiresAt ? new Date(r.expiresAt).toLocaleDateString("es-ES") : "—"}
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
