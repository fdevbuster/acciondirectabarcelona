"use client"

import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { whatsappUrl } from "@/lib/site-data"

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center">
        <p className="text-base font-semibold text-foreground text-balance">
          {t.footer.tagline}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="size-4" />
          {t.whatsapp.join}
        </a>
        <p className="text-sm text-muted-foreground">
          &copy; {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
