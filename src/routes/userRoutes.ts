import { Router } from "express"
import { Request, Response } from "express"
import UserController from "../controllers/UseController"

const router = Router()
const userEndpoint: string = process.env.END_POINT_ACCOUNT || ""

router.post(userEndpoint, (req: Request, res: Response) =>
    UserController.create(req, res)
)

export default router