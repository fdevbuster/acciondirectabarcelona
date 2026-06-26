"use client"

import Image from "next/image"
import Link from "next/link"
import { Globe, Menu, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { LANGS, type Lang } from "@/lib/i18n"
import { whatsappUrl } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/#puntos", label: t.nav.points },
    { href: "/#necesitamos", label: t.nav.needs },
    { href: "/#recursos", label: t.nav.resources },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Venezuela flag stripes */}
      <div className="flex h-1.5 w-full" aria-hidden>
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-destructive" />
      </div>
      <div className="border-b border-primary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-adb.png"
              alt="Acción Directa Barcelona"
              width={40}
              height={40}
              className="rounded-full bg-background"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-primary-foreground">Acción Directa</span>
              <span className="text-xs font-medium text-primary-foreground/75">Barcelona</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <MessageCircle className="size-4" />
              {t.whatsapp.nav}
            </a>
            <Link
              href="/solicitar"
              className="ml-1 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {t.nav.request}
            </Link>
            <LangSwitcher lang={lang} setLang={setLang} />
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <LangSwitcher lang={lang} setLang={setLang} />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-primary-foreground/20 px-4 py-2 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:bg-primary-foreground/15"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:bg-primary-foreground/15"
            >
              <MessageCircle className="size-4" />
              {t.whatsapp.join}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

function LangSwitcher({
  lang,
  setLang,
}: {
  lang: Lang
  setLang: (l: Lang) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-md border border-primary-foreground/40 px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/15">
        <Globe className="size-4" />
        <span className="uppercase">{lang}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className={l.code === lang ? "font-semibold" : ""}
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
