"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, MapPin, Package, HeartHandshake, Check, X, ToggleLeft, ToggleRight, CalendarDays } from "lucide-react"
import {
  upsertCollectionPoint, deleteCollectionPoint,
  upsertNeededItem, deleteNeededItem,
  upsertPartner, deletePartner,
  setSiteConfig,
} from "@/app/actions/cms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type CollectionPoint = { id: number; name: string; address: string; lat: string | null; lng: string | null; active: boolean }
type NeededItem = { id: number; es: string; ca: string; en: string; active: boolean }
type Partner = { id: number; name: string; description: string; url: string; logoUrl: string | null; active: boolean }

// ─── Collection Points ───────────────────────────────────────────────────────

function emptyCP(): Omit<CollectionPoint, "id"> { return { name: "", address: "", lat: "", lng: "", active: true } }

function CollectionPointsEditor({ initial }: { initial: CollectionPoint[] }) {
  const [items, setItems] = useState(initial)
  const [editing, setEditing] = useState<CollectionPoint | Omit<CollectionPoint, "id"> | null>(null)
  const [pending, start] = useTransition()

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    const data = editing as CollectionPoint
    start(async () => {
      await upsertCollectionPoint({
        id: "id" in data ? data.id : undefined,
        name: data.name, address: data.address,
        lat: data.lat || undefined, lng: data.lng || undefined,
        active: data.active,
      })
      const refreshed = await fetch("/api/cms/collection-points").then(r => r.json()).catch(() => null)
      if (refreshed) setItems(refreshed)
      else setItems(prev => {
        if ("id" in data) return prev.map(p => p.id === data.id ? data : p)
        return [...prev, { ...data, id: Date.now() }]
      })
      setEditing(null)
      toast.success("Guardado")
    })
  }

  const remove = (id: number) => {
    start(async () => {
      await deleteCollectionPoint(id)
      setItems(prev => prev.filter(p => p.id !== id))
      toast.success("Eliminado")
    })
  }

  const toggle = (item: CollectionPoint) => {
    start(async () => {
      await upsertCollectionPoint({ ...item, active: !item.active })
      setItems(prev => prev.map(p => p.id === item.id ? { ...p, active: !p.active } : p))
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} puntos registrados</p>
        <Button size="sm" className="gap-1.5" onClick={() => setEditing(emptyCP())}>
          <Plus className="size-4" /> Añadir punto
        </Button>
      </div>

      {editing !== null && (
        <Card className="border-primary/40">
          <CardContent className="pt-5">
            <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label>Nombre</Label>
                <Input value={(editing as CollectionPoint).name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Rest. Tío Papelón" />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label>Dirección</Label>
                <Input value={(editing as CollectionPoint).address} onChange={e => setEditing({ ...editing, address: e.target.value })} placeholder="Carrer Sicilia 247" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Latitud (opcional)</Label>
                <Input value={(editing as CollectionPoint).lat ?? ""} onChange={e => setEditing({ ...editing, lat: e.target.value })} placeholder="41.4027923" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Longitud (opcional)</Label>
                <Input value={(editing as CollectionPoint).lng ?? ""} onChange={e => setEditing({ ...editing, lng: e.target.value })} placeholder="2.171687" />
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input type="checkbox" id="cp-active" checked={(editing as CollectionPoint).active} onChange={e => setEditing({ ...editing, active: e.target.checked })} className="size-4" />
                <Label htmlFor="cp-active">Activo (visible en la web)</Label>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" size="sm" disabled={pending} className="gap-1.5"><Check className="size-4" /> Guardar</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(null)} className="gap-1.5"><X className="size-4" /> Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {items.map(item => (
          <Card key={item.id} className={item.active ? "" : "opacity-60"}>
            <CardContent className="flex items-start justify-between gap-3 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{item.name}</span>
                  {!item.active && <Badge variant="secondary">Inactivo</Badge>}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />{item.address}
                  {item.lat && <span className="ml-2 text-xs">📍 {item.lat}, {item.lng}</span>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="size-8" onClick={() => toggle(item)} disabled={pending} title={item.active ? "Desactivar" : "Activar"}>
                  {item.active ? <ToggleRight className="size-4 text-primary" /> : <ToggleLeft className="size-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => setEditing({ ...item })} disabled={pending}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={() => remove(item.id)} disabled={pending}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Needed Items ─────────────────────────────────────────────────────────────

function emptyNI(): Omit<NeededItem, "id"> { return { es: "", ca: "", en: "", active: true } }

function NeededItemsEditor({ initial }: { initial: NeededItem[] }) {
  const [items, setItems] = useState(initial)
  const [editing, setEditing] = useState<NeededItem | Omit<NeededItem, "id"> | null>(null)
  const [pending, start] = useTransition()

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    const data = editing as NeededItem
    start(async () => {
      await upsertNeededItem({ id: "id" in data ? data.id : undefined, es: data.es, ca: data.ca, en: data.en, active: data.active })
      setItems(prev => {
        if ("id" in data) return prev.map(p => p.id === data.id ? data : p)
        return [...prev, { ...data, id: Date.now() }]
      })
      setEditing(null)
      toast.success("Guardado")
    })
  }

  const remove = (id: number) => {
    start(async () => {
      await deleteNeededItem(id)
      setItems(prev => prev.filter(p => p.id !== id))
      toast.success("Eliminado")
    })
  }

  const toggle = (item: NeededItem) => {
    start(async () => {
      await upsertNeededItem({ ...item, active: !item.active })
      setItems(prev => prev.map(p => p.id === item.id ? { ...p, active: !p.active } : p))
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.filter(i => i.active).length} activos · {items.length} total</p>
        <Button size="sm" className="gap-1.5" onClick={() => setEditing(emptyNI())}>
          <Plus className="size-4" /> Añadir material
        </Button>
      </div>

      {editing !== null && (
        <Card className="border-primary/40">
          <CardContent className="pt-5">
            <form onSubmit={save} className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label>Español</Label>
                <Input value={(editing as NeededItem).es} onChange={e => setEditing({ ...editing, es: e.target.value })} placeholder="Gasas estériles" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Català</Label>
                <Input value={(editing as NeededItem).ca} onChange={e => setEditing({ ...editing, ca: e.target.value })} placeholder="Gases estèrils" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>English</Label>
                <Input value={(editing as NeededItem).en} onChange={e => setEditing({ ...editing, en: e.target.value })} placeholder="Sterile gauze" />
              </div>
              <div className="flex items-center gap-2 sm:col-span-3">
                <input type="checkbox" id="ni-active" checked={(editing as NeededItem).active} onChange={e => setEditing({ ...editing, active: e.target.checked })} className="size-4" />
                <Label htmlFor="ni-active">Activo (visible en la web)</Label>
              </div>
              <div className="flex gap-2 sm:col-span-3">
                <Button type="submit" size="sm" disabled={pending} className="gap-1.5"><Check className="size-4" /> Guardar</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(null)} className="gap-1.5"><X className="size-4" /> Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {items.map(item => (
          <Card key={item.id} className={item.active ? "" : "opacity-60"}>
            <CardContent className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-medium text-foreground">{item.es}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{item.ca} · {item.en}</span>
                  {!item.active && <Badge variant="secondary" className="ml-2">Inactivo</Badge>}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="size-8" onClick={() => toggle(item)} disabled={pending} title={item.active ? "Desactivar" : "Activar"}>
                  {item.active ? <ToggleRight className="size-4 text-primary" /> : <ToggleLeft className="size-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => setEditing({ ...item })} disabled={pending}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={() => remove(item.id)} disabled={pending}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Partners ─────────────────────────────────────────────────────────────────

function emptyPartner(): Omit<Partner, "id"> { return { name: "", description: "", url: "", logoUrl: "", active: true } }

function PartnersEditor({ initial }: { initial: Partner[] }) {
  const [items, setItems] = useState(initial)
  const [editing, setEditing] = useState<Partner | Omit<Partner, "id"> | null>(null)
  const [pending, start] = useTransition()

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    const data = editing as Partner
    start(async () => {
      await upsertPartner({
        id: "id" in data ? data.id : undefined,
        name: data.name, description: data.description,
        url: data.url, logoUrl: data.logoUrl || undefined, active: data.active,
      })
      setItems(prev => {
        if ("id" in data) return prev.map(p => p.id === data.id ? data : p)
        return [...prev, { ...data, id: Date.now() }]
      })
      setEditing(null)
      toast.success("Guardado")
    })
  }

  const remove = (id: number) => {
    start(async () => {
      await deletePartner(id)
      setItems(prev => prev.filter(p => p.id !== id))
      toast.success("Eliminado")
    })
  }

  const toggle = (item: Partner) => {
    start(async () => {
      await upsertPartner({ ...item, active: !item.active })
      setItems(prev => prev.map(p => p.id === item.id ? { ...p, active: !p.active } : p))
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} aliados registrados</p>
        <Button size="sm" className="gap-1.5" onClick={() => setEditing(emptyPartner())}>
          <Plus className="size-4" /> Añadir aliado
        </Button>
      </div>

      {editing !== null && (
        <Card className="border-primary/40">
          <CardContent className="pt-5">
            <form onSubmit={save} className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label>Nombre</Label>
                  <Input value={(editing as Partner).name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Meals4Hope" />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>URL</Label>
                  <Input value={(editing as Partner).url} onChange={e => setEditing({ ...editing, url: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Descripción</Label>
                <Textarea rows={3} value={(editing as Partner).description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Descripción del aliado y su trayectoria..." />
              </div>
              <div className="flex flex-col gap-1">
                <Label>URL del logo (opcional)</Label>
                <Input value={(editing as Partner).logoUrl ?? ""} onChange={e => setEditing({ ...editing, logoUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pt-active" checked={(editing as Partner).active} onChange={e => setEditing({ ...editing, active: e.target.checked })} className="size-4" />
                <Label htmlFor="pt-active">Activo (visible en la web)</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={pending} className="gap-1.5"><Check className="size-4" /> Guardar</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(null)} className="gap-1.5"><X className="size-4" /> Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <Card key={item.id} className={item.active ? "" : "opacity-60"}>
            <CardContent className="flex items-start justify-between gap-3 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  {!item.active && <Badge variant="secondary">Inactivo</Badge>}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{item.url}</a>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="size-8" onClick={() => toggle(item)} disabled={pending} title={item.active ? "Desactivar" : "Activar"}>
                  {item.active ? <ToggleRight className="size-4 text-primary" /> : <ToggleLeft className="size-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => setEditing({ ...item })} disabled={pending}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={() => remove(item.id)} disabled={pending}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Site Config ─────────────────────────────────────────────────────────────

function SiteConfigEditor({ collectionDate }: { collectionDate: string }) {
  const [date, setDate] = useState(collectionDate)
  const [saved, setSaved] = useState(collectionDate)
  const [pending, start] = useTransition()

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    start(async () => {
      await setSiteConfig("collection_date", date)
      setSaved(date)
      toast.success("Fecha actualizada")
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarDays className="size-4 text-primary" /> Fecha de recogida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={save} className="flex items-end gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="collection-date">Fecha</Label>
            <Input
              id="collection-date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-44"
            />
          </div>
          <Button type="submit" size="sm" disabled={pending || date === saved} className="gap-1.5">
            <Check className="size-4" /> Guardar
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Se muestra como banner en la homepage. Déjala en blanco para ocultarla.
        </p>
      </CardContent>
    </Card>
  )
}

// ─── Main CMS Panel ───────────────────────────────────────────────────────────

export function CmsPanel({
  collectionPoints,
  neededItems,
  partners,
  collectionDate,
}: {
  collectionPoints: CollectionPoint[]
  neededItems: NeededItem[]
  partners: Partner[]
  collectionDate: string
}) {
  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-4">
        <TabsTrigger value="general" className="gap-1.5">
          <CalendarDays className="size-4" /> General
        </TabsTrigger>
        <TabsTrigger value="items" className="gap-1.5">
          <Package className="size-4" /> Materiales
        </TabsTrigger>
        <TabsTrigger value="points" className="gap-1.5">
          <MapPin className="size-4" /> Puntos de recogida
        </TabsTrigger>
        <TabsTrigger value="partners" className="gap-1.5">
          <HeartHandshake className="size-4" /> Aliados Venezuela
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <SiteConfigEditor collectionDate={collectionDate} />
      </TabsContent>
      <TabsContent value="items">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="size-4 text-primary" /> Materiales e insumos necesarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NeededItemsEditor initial={neededItems} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="points">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Puntos de recogida en Barcelona
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CollectionPointsEditor initial={collectionPoints} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="partners">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HeartHandshake className="size-4 text-primary" /> Aliados en Venezuela
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PartnersEditor initial={partners} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
