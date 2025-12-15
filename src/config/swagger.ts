import { Express } from "express"
import swaggerJSDoc, { Options } from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const PORT: number = Number(process.env.PORT) || 3000

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Filmes",
      version: "1.0.0",
      description: "Documentação da API Node + MySQL",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["src/routes/*.ts"], // 👈 ajustado para TS
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  console.log(
    `📚 Swagger rodando em: http://localhost:${PORT}/api-docs`
  )
}

export default swaggerDocs