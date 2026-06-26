import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { aidRequest, materialReceived, materialSent, user } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return ""
  const cols = Object.keys(rows[0])
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v)
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }
  const header = cols.join(",")
  const body = rows.map(r => cols.map(c => escape(r[c])).join(",")).join("\n")
  return header + "\n" + body
}

const TABLES = ["requests", "received", "sent"] as const
type Table = typeof TABLES[number]

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  const role = (session?.user as { role?: string })?.role
  if (!session?.user || role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const table = req.nextUrl.searchParams.get("table") as Table | null
  if (!table || !TABLES.includes(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 })
  }

  let rows: Record<string, unknown>[] = []
  let filename = ""

  if (table === "requests") {
    const data = await db.select().from(aidRequest).orderBy(desc(aidRequest.createdAt))
    rows = data.map(r => ({
      id: r.id,
      nombre: r.name,
      contacto: r.contact,
      ubicacion: r.location,
      materiales: r.items,
      notas: r.notes ?? "",
      estado: r.status,
      fecha: new Date(r.createdAt).toISOString(),
    }))
    filename = "solicitudes.csv"
  }

  if (table === "received") {
    const data = await db
      .select({
        id: materialReceived.id,
        material: materialReceived.itemName,
        cantidad: materialReceived.quantity,
        punto: materialReceived.collectionPoint,
        donante: materialReceived.donorName,
        notas: materialReceived.notes,
        foto: materialReceived.imageUrl,
        fecha_caducidad: materialReceived.expiresAt,
        fecha_recibido: materialReceived.receivedAt,
        voluntario: user.name,
        email_voluntario: user.email,
      })
      .from(materialReceived)
      .leftJoin(user, eq(materialReceived.userId, user.id))
      .orderBy(desc(materialReceived.receivedAt))
    rows = data.map(r => ({
      ...r,
      donante: r.donante ?? "",
      notas: r.notas ?? "",
      foto: r.foto ?? "",
      fecha_caducidad: r.fecha_caducidad ? new Date(r.fecha_caducidad).toISOString().split("T")[0] : "",
      voluntario: r.voluntario ?? "",
      email_voluntario: r.email_voluntario ?? "",
      fecha_recibido: new Date(r.fecha_recibido).toISOString(),
    }))
    filename = "material_recibido.csv"
  }

  if (table === "sent") {
    const data = await db
      .select({
        id: materialSent.id,
        material: materialSent.itemName,
        cantidad: materialSent.quantity,
        destino: materialSent.destination,
        destinatario: materialSent.recipient,
        notas: materialSent.notes,
        fecha_envio: materialSent.sentAt,
        registrado_por: user.name,
      })
      .from(materialSent)
      .leftJoin(user, eq(materialSent.userId, user.id))
      .orderBy(desc(materialSent.sentAt))
    rows = data.map(r => ({
      ...r,
      notas: r.notas ?? "",
      registrado_por: r.registrado_por ?? "",
      fecha_envio: new Date(r.fecha_envio).toISOString(),
    }))
    filename = "material_enviado.csv"
  }

  const csv = toCSV(rows)
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
