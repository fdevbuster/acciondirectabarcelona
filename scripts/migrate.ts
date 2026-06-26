import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    // Add role to user table
    await client.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS "role" text NOT NULL DEFAULT 'pending'
    `)

    // Add imageUrl to material_received
    await client.query(`
      ALTER TABLE "material_received"
      ADD COLUMN IF NOT EXISTS "imageUrl" text
    `)

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
