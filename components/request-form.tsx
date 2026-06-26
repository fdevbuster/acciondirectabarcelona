"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, HeartHandshake } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"
import { submitRequest } from "@/app/actions/requests"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function RequestForm() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    items: "",
    notes: "",
  })

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await submitRequest(form)
    setLoading(false)
    if (res.ok) {
      setDone(true)
    } else {
      toast.error(t.request.error)
    }
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h2 className="text-xl font-bold text-foreground">{t.request.success}</h2>
          <p className="text-pretty text-muted-foreground">{t.request.successMsg}</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => {
                setForm({ name: "", contact: "", location: "", items: "", notes: "" })
                setDone(false)
              }}
            >
              {t.request.another}
            </Button>
            <Button render={<Link href="/" />} nativeButton={false}>
              {t.nav.home}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t.request.name}</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={update("name")}
              placeholder={t.request.namePh}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact">{t.request.contact}</Label>
            <Input
              id="contact"
              required
              value={form.contact}
              onChange={update("contact")}
              placeholder={t.request.contactPh}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">{t.request.location}</Label>
            <Input
              id="location"
              required
              value={form.location}
              onChange={update("location")}
              placeholder={t.request.locationPh}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="items">{t.request.items}</Label>
            <Textarea
              id="items"
              required
              rows={4}
              value={form.items}
              onChange={update("items")}
              placeholder={t.request.itemsPh}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">{t.request.notes}</Label>
            <Textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={update("notes")}
              placeholder={t.request.notesPh}
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="gap-2">
            <HeartHandshake className="size-4" />
            {loading ? t.request.submitting : t.request.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
