"use client"

import { useLanguage } from "@/components/language-provider"

export function RequestHeading() {
  const { t } = useLanguage()
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
        {t.request.title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
        {t.request.subtitle}
      </p>
    </div>
  )
}
