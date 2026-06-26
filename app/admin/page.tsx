import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getRequests, getReceived, getSent } from "@/app/actions/admin"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  const [requests, received, sent] = await Promise.all([
    getRequests(),
    getReceived(),
    getSent(),
  ])

  return (
    <AdminDashboard
      userName={session.user.name || session.user.email}
      requests={requests}
      received={received}
      sent={sent}
    />
  )
}
