import express, { Express } from "express"
import { testConnection } from "./config/db"
import cors from "cors"
import dotenv from "dotenv"
import swaggerDocs from "./config/swagger"
import authRouter from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config()
const app: Express = express()
const PORT: number = Number(process.env.PORT_API) || 3000

app.use(express.json())


app.use(userRoutes)
app.use(authRouter)

async function startServer(): Promise<void> {
  try {
    await testConnection()

    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor rodando http://127.0.0.1:${PORT} http://localhost:${PORT}`
      )
      swaggerDocs(app)
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error("Erro desconhecido ao iniciar o servidor")
    }
    process.exit(1)
  }
}

startServer()