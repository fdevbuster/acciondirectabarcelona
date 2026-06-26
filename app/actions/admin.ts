"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { aidRequest, materialReceived, materialSent } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

// ----- Requests -----
export async function getRequests() {
  await getUserId()
  return db.select().from(aidRequest).orderBy(desc(aidRequest.createdAt))
}

export async function updateRequestStatus(id: number, status: string) {
  await getUserId()
  await db.update(aidRequest).set({ status }).where(eq(aidRequest.id, id))
  revalidatePath("/admin")
}

// ----- Materials received -----
export async function getReceived() {
  const userId = await getUserId()
  return db
    .select()
    .from(materialReceived)
    .where(eq(materialReceived.userId, userId))
    .orderBy(desc(materialReceived.receivedAt))
}

export async function addReceived(input: {
  itemName: string
  quantity: string
  collectionPoint: string
  donorName?: string
  notes?: string
}) {
  const userId = await getUserId()
  await db.insert(materialReceived).values({
    userId,
    itemName: input.itemName.trim(),
    quantity: input.quantity.trim(),
    collectionPoint: input.collectionPoint.trim(),
    donorName: input.donorName?.trim() || null,
    notes: input.notes?.trim() || null,
  })
  revalidatePath("/admin")
}

export async function deleteReceived(id: number) {
  const userId = await getUserId()
  await db
    .delete(materialReceived)
    .where(and(eq(materialReceived.id, id), eq(materialReceived.userId, userId)))
  revalidatePath("/admin")
}

// ----- Materials sent -----
export async function getSent() {
  const userId = await getUserId()
  return db
    .select()
    .from(materialSent)
    .where(eq(materialSent.userId, userId))
    .orderBy(desc(materialSent.sentAt))
}

export async function addSent(input: {
  itemName: string
  quantity: string
  destination: string
  recipient: string
  notes?: string
}) {
  const userId = await getUserId()
  await db.insert(materialSent).values({
    userId,
    itemName: input.itemName.trim(),
    quantity: input.quantity.trim(),
    destination: input.destination.trim(),
    recipient: input.recipient.trim(),
    notes: input.notes?.trim() || null,
  })
  revalidatePath("/admin")
}

export async function deleteSent(id: number) {
  const userId = await getUserId()
  await db
    .delete(materialSent)
    .where(and(eq(materialSent.id, id), eq(materialSent.userId, userId)))
  revalidatePath("/admin")
}
