"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { aidRequest, materialReceived, materialSent, user } from "@/lib/db/schema"
import { and, desc, eq, ne } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

type SessionUser = { id: string; role?: string }

async function getSessionUser(): Promise<SessionUser> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user as SessionUser
}

function isSuperAdmin(u: SessionUser) {
  return u.role === "superadmin"
}

function canAccessPanel(u: SessionUser) {
  return u.role === "volunteer" || u.role === "superadmin"
}

// ----- Requests (superadmin only) -----
export async function getRequests() {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  return db.select().from(aidRequest).orderBy(desc(aidRequest.createdAt))
}

export async function updateRequestStatus(id: number, status: string) {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  await db.update(aidRequest).set({ status }).where(eq(aidRequest.id, id))
  revalidatePath("/admin")
}

// ----- Materials received -----
export async function getReceived() {
  const u = await getSessionUser()
  if (!canAccessPanel(u)) throw new Error("Forbidden")
  if (isSuperAdmin(u)) {
    return db
      .select({
        id: materialReceived.id,
        itemName: materialReceived.itemName,
        quantity: materialReceived.quantity,
        collectionPoint: materialReceived.collectionPoint,
        donorName: materialReceived.donorName,
        notes: materialReceived.notes,
        imageUrl: materialReceived.imageUrl,
        receivedAt: materialReceived.receivedAt,
        userName: user.name,
      })
      .from(materialReceived)
      .leftJoin(user, eq(materialReceived.userId, user.id))
      .orderBy(desc(materialReceived.receivedAt))
  }
  return db
    .select()
    .from(materialReceived)
    .where(eq(materialReceived.userId, u.id))
    .orderBy(desc(materialReceived.receivedAt))
    .then((rows) => rows.map((r) => ({ ...r, userName: null })))
}

export async function addReceived(input: {
  itemName: string
  quantity: string
  collectionPoint: string
  donorName?: string
  notes?: string
  imageUrl?: string
}) {
  const u = await getSessionUser()
  if (!canAccessPanel(u)) throw new Error("Forbidden")
  await db.insert(materialReceived).values({
    userId: u.id,
    itemName: input.itemName.trim(),
    quantity: input.quantity.trim(),
    collectionPoint: input.collectionPoint.trim(),
    donorName: input.donorName?.trim() || null,
    notes: input.notes?.trim() || null,
    imageUrl: input.imageUrl || null,
  })
  revalidatePath("/admin")
}

export async function deleteReceived(id: number) {
  const u = await getSessionUser()
  if (!canAccessPanel(u)) throw new Error("Forbidden")
  const condition = isSuperAdmin(u)
    ? eq(materialReceived.id, id)
    : and(eq(materialReceived.id, id), eq(materialReceived.userId, u.id))
  await db.delete(materialReceived).where(condition)
  revalidatePath("/admin")
}

// ----- Materials sent (superadmin only) -----
export async function getSent() {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  return db
    .select({
      id: materialSent.id,
      itemName: materialSent.itemName,
      quantity: materialSent.quantity,
      destination: materialSent.destination,
      recipient: materialSent.recipient,
      notes: materialSent.notes,
      sentAt: materialSent.sentAt,
      userName: user.name,
    })
    .from(materialSent)
    .leftJoin(user, eq(materialSent.userId, user.id))
    .orderBy(desc(materialSent.sentAt))
}

export async function addSent(input: {
  itemName: string
  quantity: string
  destination: string
  recipient: string
  notes?: string
}) {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  await db.insert(materialSent).values({
    userId: u.id,
    itemName: input.itemName.trim(),
    quantity: input.quantity.trim(),
    destination: input.destination.trim(),
    recipient: input.recipient.trim(),
    notes: input.notes?.trim() || null,
  })
  revalidatePath("/admin")
}

export async function deleteSent(id: number) {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  await db.delete(materialSent).where(eq(materialSent.id, id))
  revalidatePath("/admin")
}

// ----- Users (superadmin only) -----
export async function getUsers() {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(ne(user.id, u.id))
    .orderBy(desc(user.createdAt))
}

export async function setUserRole(userId: string, role: "pending" | "volunteer" | "superadmin") {
  const u = await getSessionUser()
  if (!isSuperAdmin(u)) throw new Error("Forbidden")
  await db.update(user).set({ role }).where(eq(user.id, userId))
  revalidatePath("/admin")
}
