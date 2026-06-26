"use client"

import dynamic from "next/dynamic"

const PointsMap = dynamic(() => import("@/components/points-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary/40 text-sm text-muted-foreground">
      …
    </div>
  ),
})

export function PointsMapSection() {
  return (
    <div className="h-80 w-full overflow-hidden rounded-xl border border-border md:h-96">
      <PointsMap />
    </div>
  )
}
