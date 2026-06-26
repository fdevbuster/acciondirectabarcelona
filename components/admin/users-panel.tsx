"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Users, CheckCircle, XCircle, ShieldCheck } from "lucide-react"
import { setUserRole } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

const ROLE_BADGE: Record<string, { label: string; variant: "secondary" | "default" | "outline" | "destructive" }> = {
  pending: { label: "Pendiente", variant: "secondary" },
  volunteer: { label: "Voluntario", variant: "default" },
  superadmin: { label: "Super Admin", variant: "outline" },
}

function RoleActions({ user }: { user: User }) {
  const [pending, startTransition] = useTransition()

  const approve = () => {
    startTransition(async () => {
      await setUserRole(user.id, "volunteer")
      toast.success(`${user.name} aprobado como voluntario`)
    })
  }

  const reject = () => {
    startTransition(async () => {
      await setUserRole(user.id, "pending")
      toast.success(`${user.name} devuelto a pendiente`)
    })
  }

  const promote = () => {
    startTransition(async () => {
      await setUserRole(user.id, "superadmin")
      toast.success(`${user.name} ascendido a super admin`)
    })
  }

  return (
    <div className="flex items-center gap-1">
      {user.role === "pending" && (
        <Button size="sm" className="gap-1.5 h-7 text-xs" onClick={approve} disabled={pending}>
          <CheckCircle className="size-3.5" />
          Aprobar
        </Button>
      )}
      {user.role === "volunteer" && (
        <>
          <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs" onClick={reject} disabled={pending}>
            <XCircle className="size-3.5" />
            Revocar
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 h-7 text-xs" onClick={promote} disabled={pending}>
            <ShieldCheck className="size-3.5" />
            Admin
          </Button>
        </>
      )}
      {user.role === "superadmin" && (
        <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs" onClick={reject} disabled={pending}>
          <XCircle className="size-3.5" />
          Revocar
        </Button>
      )}
    </div>
  )
}

export function UsersPanel({ users }: { users: User[] }) {
  const pending = users.filter((u) => u.role === "pending")
  const rest = users.filter((u) => u.role !== "pending")

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <Users className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">No hay otros usuarios registrados todavía.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 && (
        <Card className="border-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="size-4 text-primary" />
              Pendientes de aprobación ({pending.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <RoleActions user={u} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {rest.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-primary" />
              Usuarios activos ({rest.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((u) => {
                    const badge = ROLE_BADGE[u.role] ?? ROLE_BADGE.pending
                    return (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell className="text-muted-foreground">{u.email}</TableCell>
                        <TableCell>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <RoleActions user={u} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
