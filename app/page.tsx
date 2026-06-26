export const dynamic = "force-dynamic"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomeContent } from "@/components/home-content"
import { getCollectionPoints, getNeededItems, getPartners, getSiteConfig } from "@/app/actions/cms"

export default async function HomePage() {
  const [collectionPoints, neededItems, partners, config] = await Promise.all([
    getCollectionPoints(),
    getNeededItems(),
    getPartners(),
    getSiteConfig(),
  ])

  const activePoints = collectionPoints.filter(p => p.active)
  const activeItems = neededItems.filter(i => i.active)
  const activePartners = partners.filter(p => p.active)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HomeContent
          collectionPoints={activePoints}
          neededItems={activeItems}
          partners={activePartners}
          collectionDate={config.collection_date ?? null}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
