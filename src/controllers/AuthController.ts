import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import pool from "../config/db"
import { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
  id_user: number
  login: string
  password: string
  role: string
}

export default class AuthController {

  static async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    try {
      const [rows] = await pool.query<User[]>(
        "SELECT * FROM api_auth.user WHERE login = ?",
        [login]
      )
      if (rows.length === 0) {
        res.status(401).json({ message: "Credenciais inválidas" })
        return;
      }
      const user = rows[0];
      const senhaValida = await bcrypt.compare(password, user.password)
      if (!senhaValida) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não está definido no .env")
      }
      const token = jwt.sign(
        {
          id: user.id_user,
          login: user.login,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

}