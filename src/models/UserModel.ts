import pool from "../config/db"
import bcrypt from "bcryptjs"
import { ResultSetHeader } from "mysql2"

interface CreateUserDTO {
  login: string
  password: string
}

export default class UserModel {

  static async create(user: CreateUserDTO): Promise<number> {
    const { login, password } = user

    const hash = await bcrypt.hash(password, 10)

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO api_auth.user (id_user, login, password) VALUES (null, ?, ?)",
      [login, hash]
    );

    return result.insertId
  }
}