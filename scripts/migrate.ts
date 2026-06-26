import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // v1: role + imageUrl
    await client.query(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" text NOT NULL DEFAULT 'pending'`)
    await client.query(`ALTER TABLE "material_received" ADD COLUMN IF NOT EXISTS "imageUrl" text`)

    // v2: site_config
    await client.query(`
      CREATE TABLE IF NOT EXISTS "site_config" (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)
    // Seed collection date
    await client.query(`
      INSERT INTO "site_config" (key, value)
      VALUES ('collection_date', '2026-06-27')
      ON CONFLICT (key) DO NOTHING
    `)

    // v3: CMS tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS "collection_point" (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        lat TEXT,
        lng TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS "needed_item" (
        id SERIAL PRIMARY KEY,
        es TEXT NOT NULL,
        ca TEXT NOT NULL,
        en TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS "partner" (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        "logoUrl" TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    // Seed collection points (only if empty)
    const cpCount = await client.query(`SELECT COUNT(*) FROM "collection_point"`)
    if (cpCount.rows[0].count === "0") {
      const points = [
        { name: "Academia Odontología", address: "Carrer de Juan Sada 55", lat: null, lng: null },
        { name: "Rest. Tío Papelón", address: "Carrer Sicilia 247", lat: "41.4027923", lng: "2.171687" },
        { name: "Rest. El Tequeñón", address: "Carrer del Pantá de Tremp 47", lat: "41.4259226", lng: "2.1530438" },
        { name: "Rest. Rincón de la Abuela", address: "Carrer Mallorca 470", lat: "41.4058359", lng: "2.1788147" },
        { name: "Rest. Los Panas", address: "Carrer Aragó 40", lat: "41.3810298", lng: "2.1503986" },
      ]
      for (const p of points) {
        await client.query(
          `INSERT INTO "collection_point" (name, address, lat, lng) VALUES ($1, $2, $3, $4)`,
          [p.name, p.address, p.lat, p.lng]
        )
      }
      console.log("Seeded collection points")
    }

    // Seed needed items (only if empty)
    const niCount = await client.query(`SELECT COUNT(*) FROM "needed_item"`)
    if (niCount.rows[0].count === "0") {
      const items = [
        { es: "Agua oxigenada", ca: "Aigua oxigenada", en: "Hydrogen peroxide" },
        { es: "Alcohol", ca: "Alcohol", en: "Alcohol" },
        { es: "Guantes descartables", ca: "Guants d'un sol ús", en: "Disposable gloves" },
        { es: "Guantes estériles", ca: "Guants estèrils", en: "Sterile gloves" },
        { es: "Gasas estériles", ca: "Gases estèrils", en: "Sterile gauze" },
        { es: "Equipos de infusión", ca: "Equips d'infusió", en: "Infusion sets" },
        { es: "Micro goteros", ca: "Microgoters", en: "Micro drip sets" },
        { es: "Macro goteros", ca: "Macrogoters", en: "Macro drip sets" },
        { es: "Paracetamol", ca: "Paracetamol", en: "Paracetamol" },
        { es: "Ibuprofeno", ca: "Ibuprofèn", en: "Ibuprofen" },
        { es: "Mascarillas", ca: "Mascaretes", en: "Face masks" },
        { es: "Solución salina", ca: "Solució salina", en: "Saline solution" },
        { es: "Termómetros", ca: "Termòmetres", en: "Thermometers" },
        { es: "Inyectadoras", ca: "Xeringues", en: "Syringes" },
        { es: "Vitamina K", ca: "Vitamina K", en: "Vitamin K" },
      ]
      for (const item of items) {
        await client.query(
          `INSERT INTO "needed_item" (es, ca, en) VALUES ($1, $2, $3)`,
          [item.es, item.ca, item.en]
        )
      }
      console.log("Seeded needed items")
    }

    // Seed partners (only if empty)
    const ptCount = await client.query(`SELECT COUNT(*) FROM "partner"`)
    if (ptCount.rows[0].count === "0") {
      await client.query(
        `INSERT INTO "partner" (name, description, url) VALUES ($1, $2, $3)`,
        [
          "Meals4Hope",
          "Llevan años trabajando con envíos humanitarios a Venezuela. Gente de nuestro equipo les conoce de hace tiempo y responden impecablemente. Nos garantizan que los insumos llegan a quienes los necesitan.",
          "https://www.meals4hope.org/es/",
        ]
      )
      console.log("Seeded partners")
    }

    await client.query("COMMIT")
    console.log("Migration completed successfully")
  } catch (err) {
    await client.query("ROLLBACK")
    console.error("Migration failed:", err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
