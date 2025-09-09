//Public Route Middleware

import Router from "express";
import {generateToken} from "../utils/token.utils.js";

const router = Router();

router.get("/general-token", (req, res) => {
  const token = generateToken();
  res.status(200).send({
    message: "General Token",
    token: token,
  });
});

export default router;
