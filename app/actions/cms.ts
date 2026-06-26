"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { collectionPoint, neededItem, partner, siteConfig } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function requireSuperAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  const role = (session?.user as { role?: string })?.role
  if (!session?.user || role !== "superadmin") throw new Error("Forbidden")
}

// ---- Site config ----
export async function getSiteConfig(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteConfig)
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}

export async function setSiteConfig(key: string, value: string) {
  await requireSuperAdmin()
  await db.insert(siteConfig).values({ key, value }).onConflictDoUpdate({
    target: siteConfig.key,
    set: { value, updatedAt: new Date() },
  })
  revalidatePath("/")
  revalidatePath("/admin")
}

// ---- Collection points ---- (public read, auth required for write)
export async function getCollectionPoints() {
  return db.select().from(collectionPoint).orderBy(asc(collectionPoint.createdAt))
}

export async function upsertCollectionPoint(data: {
  id?: number
  name: string
  address: string
  lat?: string
  lng?: string
  active: boolean
}) {
  await requireSuperAdmin()
  if (data.id) {
    await db.update(collectionPoint).set({
      name: data.name,
      address: data.address,
      lat: data.lat || null,
      lng: data.lng || null,
      active: data.active,
    }).where(eq(collectionPoint.id, data.id))
  } else {
    await db.insert(collectionPoint).values({
      name: data.name,
      address: data.address,
      lat: data.lat || null,
      lng: data.lng || null,
      active: data.active,
    })
  }
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteCollectionPoint(id: number) {
  await requireSuperAdmin()
  await db.delete(collectionPoint).where(eq(collectionPoint.id, id))
  revalidatePath("/")
  revalidatePath("/admin")
}

// ---- Needed items ----
export async function getNeededItems() {
  return db.select().from(neededItem).orderBy(asc(neededItem.createdAt))
}

export async function upsertNeededItem(data: {
  id?: number
  es: string
  ca: string
  en: string
  active: boolean
}) {
  await requireSuperAdmin()
  if (data.id) {
    await db.update(neededItem).set({
      es: data.es, ca: data.ca, en: data.en, active: data.active,
    }).where(eq(neededItem.id, data.id))
  } else {
    await db.insert(neededItem).values({ es: data.es, ca: data.ca, en: data.en, active: data.active })
  }
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteNeededItem(id: number) {
  await requireSuperAdmin()
  await db.delete(neededItem).where(eq(neededItem.id, id))
  revalidatePath("/")
  revalidatePath("/admin")
}

// ---- Partners ----
export async function getPartners() {
  return db.select().from(partner).orderBy(asc(partner.createdAt))
}

export async function upsertPartner(data: {
  id?: number
  name: string
  description: string
  url: string
  logoUrl?: string
  active: boolean
}) {
  await requireSuperAdmin()
  if (data.id) {
    await db.update(partner).set({
      name: data.name,
      description: data.description,
      url: data.url,
      logoUrl: data.logoUrl || null,
      active: data.active,
    }).where(eq(partner.id, data.id))
  } else {
    await db.insert(partner).values({
      name: data.name,
      description: data.description,
      url: data.url,
      logoUrl: data.logoUrl || null,
      active: data.active,
    })
  }
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deletePartner(id: number) {
  await requireSuperAdmin()
  await db.delete(partner).where(eq(partner.id, id))
  revalidatePath("/")
  revalidatePath("/admin")
}
