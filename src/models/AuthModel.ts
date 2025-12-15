import pool from "../config/db"
import bcrypt from "bcryptjs"
import { RowDataPacket } from "mysql2"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

interface User extends RowDataPacket {
  id_user: number
  login: string
  password: string
  role: string
}