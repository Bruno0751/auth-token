import { Router } from "express"
import { Request, Response } from "express"
import AuthController from "../controllers/AuthController"

const router = Router()
const authEndpoint: string = process.env.END_POINT_AUTH || ""

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Autenticação de usuário
 *     description: Realiza login e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post(authEndpoint, (req: Request, res: Response) =>
    AuthController.login(req, res)
)

export default router