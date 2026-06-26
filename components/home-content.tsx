"use client"

import Link from "next/link"
import {
  Clock,
  MapPin,
  Navigation,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { resourceLinks, whatsappUrl } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PointsMapSection } from "@/components/points-map-section"

type CollectionPoint = { id: number; name: string; address: string; lat: string | null; lng: string | null; active: boolean }
type NeededItem = { id: number; es: string; ca: string; en: string; active: boolean }
type Partner = { id: number; name: string; description: string; url: string; logoUrl: string | null; active: boolean }

export function HomeContent({
  collectionPoints,
  neededItems,
  partners,
}: {
  collectionPoints: CollectionPoint[]
  neededItems: NeededItem[]
  partners: Partner[]
}) {
  const { lang, t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center md:pt-28">
          <Badge variant="secondary" className="mb-5 gap-1.5 text-sm">
            <HeartHandshake className="size-4" />
            {t.hero.badge}
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button render={<Link href="#puntos" />} nativeButton={false} size="lg">
              {t.hero.ctaPoints}
            </Button>
            <Button render={<Link href="/solicitar" />} nativeButton={false} size="lg" variant="outline">
              {t.hero.ctaRequest}
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Clock className="size-4" />
            {t.hero.schedule}
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm">
            <MessageCircle className="size-5 shrink-0 text-primary" />
            <p className="text-pretty text-left text-muted-foreground">{t.whatsapp.cta}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.whatsapp.nav}
            </a>
          </div>
        </div>
      </section>

      {/* Collection points */}
      <section id="puntos" className="scroll-mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              {t.points.title}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">{t.points.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collectionPoints.map((point) => (
              <Card key={point.id} className="flex flex-col">
                <CardHeader>
                  <Badge variant="secondary" className="mb-2 w-fit gap-1">
                    <Clock className="size-3" />
                    {t.points.schedule}
                  </Badge>
                  <CardTitle className="text-lg">{point.name}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {point.address}
                  </p>
                  <Button
                    render={
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.address + ", Barcelona")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    nativeButton={false}
                    variant="link"
                    className="mt-2 h-auto gap-1 p-0 text-sm"
                  >
                    <Navigation className="size-3.5" />
                    {t.points.directions}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="sr-only">{t.points.mapTitle}</h3>
            <PointsMapSection collectionPoints={collectionPoints.map(p => ({
              name: p.name,
              address: p.address,
              coords: p.lat && p.lng ? { lat: parseFloat(p.lat), lng: parseFloat(p.lng) } : undefined,
            }))} />
          </div>
        </div>
      </section>

      {/* What we need */}
      <section id="necesitamos" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              {t.needs.title}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">{t.needs.subtitle}</p>
          </div>
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-accent/50 bg-accent/15 px-4 py-3 text-center text-sm font-medium text-accent-foreground">
            {t.needs.note}
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {neededItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-card-foreground"
              >
                <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                {item[lang as "es" | "ca" | "en"]}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button render={<Link href="/solicitar" />} nativeButton={false} size="lg" variant="outline" className="gap-2">
              {t.hero.ctaRequest}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Partners / Distribution */}
      {partners.length > 0 && (
        <section className="scroll-mt-20 border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                {t.distribution.title}
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">{t.distribution.body}</p>
            </div>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
              {partners.map((p) => (
                <div key={p.id} className="mx-auto w-full max-w-xl rounded-xl border border-border bg-background p-6 flex flex-col items-center gap-4 text-center shadow-sm">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <HeartHandshake className="size-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{p.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <ExternalLink className="size-4" />
                    {t.distribution.visit}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other important resources */}
      <section id="recursos" className="scroll-mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              {t.resources.title}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">{t.resources.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceLinks.map((r) => (
              <a
                key={r.domain}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary hover:bg-secondary/40"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">{r.domain}</span>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.desc[lang as "es" | "ca" | "en"]}
                </span>
                <span className="mt-3 text-sm font-medium text-primary">{t.resources.visit}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer sign-up */}
      <section className="border-t border-border bg-primary">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground text-balance">
            {t.volunteer.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/80">
            {t.volunteer.body}
          </p>
          <a
            href="https://forms.gle/U4ekvY78DwGUF3Rm8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t.volunteer.cta}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            {t.about.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.about.body}
          </p>
        </div>
      </section>
    </>
  )
}
