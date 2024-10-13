import e from "express";
import { listUserController } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.get('/list', listUserController)
export default userRouter;