import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getRequests, getReceived, getSent, getUsers } from "@/app/actions/admin"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { PendingApproval } from "@/components/admin/pending-approval"

type SessionUser = { id: string; name?: string | null; email?: string | null; role?: string }

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  const u = session.user as SessionUser
  const role = u.role ?? "pending"
  const userName = u.name || u.email || ""

  if (role === "pending") {
    return <PendingApproval userName={userName} />
  }

  const isSuperAdmin = role === "superadmin"

  const [received, requests, sent, users] = await Promise.all([
    getReceived(),
    isSuperAdmin ? getRequests() : Promise.resolve([]),
    isSuperAdmin ? getSent() : Promise.resolve([]),
    isSuperAdmin ? getUsers() : Promise.resolve([]),
  ])

  return (
    <AdminDashboard
      userName={userName}
      role={role}
      requests={requests}
      received={received}
      sent={sent}
      users={users}
    />
  )
}
