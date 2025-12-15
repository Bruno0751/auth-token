import mysql, { Pool, PoolConnection } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
})

export async function testConnection(): Promise<void> {
  let connection: PoolConnection | null = null

  try {
    connection = await pool.getConnection()
    console.log("Conectado ao banco de dados MySQL")
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao conectar ao banco de dados:", error.message)
    } else {
      console.error("Erro desconhecido ao conectar ao banco de dados")
    }
    throw error
  } finally {
    connection?.release()
  }
}

export default pool