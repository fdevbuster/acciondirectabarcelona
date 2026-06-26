"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function PendingApproval({ userName }: { userName: string }) {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-adb.png" alt="Acción Directa Barcelona" width={36} height={36} className="rounded-full" />
            <span className="text-sm font-bold text-foreground">Panel de voluntarios</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">{userName}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary">
            <Clock className="size-8 text-primary" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-foreground">Cuenta pendiente de aprobación</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tu cuenta ha sido creada correctamente. Un administrador la revisará y te dará acceso en breve.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Si tienes dudas, contacta con el equipo por WhatsApp.
          </p>
        </div>
      </main>
    </div>
  )
}
