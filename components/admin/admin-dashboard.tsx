"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LogOut, Inbox, PackageCheck, Send, ExternalLink } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestsPanel } from "@/components/admin/requests-panel"
import { ReceivedPanel } from "@/components/admin/received-panel"
import { SentPanel } from "@/components/admin/sent-panel"

type Request = {
  id: number
  name: string
  contact: string
  location: string
  items: string
  notes: string | null
  status: string
  createdAt: Date
}
type Received = {
  id: number
  itemName: string
  quantity: string
  collectionPoint: string
  donorName: string | null
  notes: string | null
  receivedAt: Date
}
type Sent = {
  id: number
  itemName: string
  quantity: string
  destination: string
  recipient: string
  notes: string | null
  sentAt: Date
}

export function AdminDashboard({
  userName,
  requests,
  received,
  sent,
}: {
  userName: string
  requests: Request[]
  received: Received[]
  sent: Sent[]
}) {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length

  const stats = [
    { label: "Solicitudes pendientes", value: pendingCount, icon: Inbox },
    { label: "Registros recibidos", value: received.length, icon: PackageCheck },
    { label: "Registros enviados", value: sent.length, icon: Send },
  ]

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-adb.png"
              alt="Acción Directa Barcelona"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-sm font-bold text-foreground">
              Panel de administración
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              render={<Link href="/" target="_blank" />}
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <ExternalLink className="size-4" />
              <span className="hidden sm:inline">Ver web</span>
            </Button>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userName}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 py-5">
                <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <s.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="requests">
          <TabsList className="mb-4">
            <TabsTrigger value="requests" className="gap-1.5">
              <Inbox className="size-4" />
              Solicitudes
            </TabsTrigger>
            <TabsTrigger value="received" className="gap-1.5">
              <PackageCheck className="size-4" />
              Recibido
            </TabsTrigger>
            <TabsTrigger value="sent" className="gap-1.5">
              <Send className="size-4" />
              Enviado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <RequestsPanel requests={requests} />
          </TabsContent>
          <TabsContent value="received">
            <ReceivedPanel received={received} />
          </TabsContent>
          <TabsContent value="sent">
            <SentPanel sent={sent} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
