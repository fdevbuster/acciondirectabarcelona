"use server"

import { db } from "@/lib/db"
import { aidRequest } from "@/lib/db/schema"

export async function submitRequest(formData: {
  name: string
  contact: string
  location: string
  items: string
  notes?: string
}) {
  const name = formData.name?.trim()
  const contact = formData.contact?.trim()
  const location = formData.location?.trim()
  const items = formData.items?.trim()
  const notes = formData.notes?.trim() || null

  if (!name || !contact || !location || !items) {
    return { ok: false as const, error: "missing_fields" }
  }

  try {
    await db.insert(aidRequest).values({
      name,
      contact,
      location,
      items,
      notes,
    })
    return { ok: true as const }
  } catch (e) {
    console.log("[v0] submitRequest error:", (e as Error).message)
    return { ok: false as const, error: "server_error" }
  }
}
