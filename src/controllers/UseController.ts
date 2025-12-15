import { Request, Response } from "express"
import UserModel from "../models/UserModel"

export default class UserController {

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = req.body as {
        login?: string
        password?: string
      };

      if (!login || !password) {
        return res.status(400).json({
          error: "login e password são obrigatórios"
        });
      }

      const insertId = await UserModel.create({
        login,
        password
      });

      return res.status(201).json({
        message: "Conta criada com sucesso",
        id: insertId
      });

    } catch (error) {
      console.error("Erro ao criar conta:", error)
      return res.status(500).json({
        error: "Erro ao criar conta"
      });
    }
  }
}