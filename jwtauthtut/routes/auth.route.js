import { authMiddleware } from "../middleware/auth.middleware.js";
import { registerController , loginController } from "../controllers/auth.controller.js";

import { Router } from "express";

const router = Router();

//authMiddleware is in middlewares
//registerController is in controllers
router.post('/register' , registerController);
router.post('/login' ,  loginController);


export default router;