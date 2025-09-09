//Private Route Middleware

import Router from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/dashboard" , authMiddleware ,  (req,res)=>{
    res.status(200).send("Dashboard");
})

export default router;