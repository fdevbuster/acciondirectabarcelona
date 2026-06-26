import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
} from "drizzle-orm/pg-core"

// ---------------------------------------------------------------------------
// Better Auth tables (column names must stay camelCase to match Better Auth)
// ---------------------------------------------------------------------------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// ---------------------------------------------------------------------------
// App tables
// ---------------------------------------------------------------------------

// Supply requests submitted by people in Venezuela (public form, no auth)
export const aidRequest = pgTable("aid_request", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  location: text("location").notNull(),
  items: text("items").notNull(),
  notes: text("notes"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Materials received at collection points (admin only)
export const materialReceived = pgTable("material_received", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  itemName: text("itemName").notNull(),
  quantity: text("quantity").notNull(),
  collectionPoint: text("collectionPoint").notNull(),
  donorName: text("donorName"),
  notes: text("notes"),
  quantityPerUnit: text("quantityPerUnit"),
  collectionDate: timestamp("collectionDate"),
  imageUrl: text("imageUrl"),
  expiresAt: timestamp("expiresAt"),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Generic key-value config (managed from admin panel)
export const siteConfig = pgTable("site_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// CMS tables (managed from admin panel)
export const collectionPoint = pgTable("collection_point", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  lat: text("lat"),
  lng: text("lng"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const neededItem = pgTable("needed_item", {
  id: serial("id").primaryKey(),
  es: text("es").notNull(),
  ca: text("ca").notNull(),
  en: text("en").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const partner = pgTable("partner", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  logoUrl: text("logoUrl"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Materials sent to Venezuela: where and to whom (admin only)
export const materialSent = pgTable("material_sent", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  itemName: text("itemName").notNull(),
  quantity: text("quantity").notNull(),
  destination: text("destination").notNull(),
  recipient: text("recipient").notNull(),
  requestId: integer("requestId"),
  notes: text("notes"),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})
