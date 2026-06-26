import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RequestForm } from "@/components/request-form"
import { RequestHeading } from "@/components/request-heading"

export default function RequestPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
          <RequestHeading />
          <RequestForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
