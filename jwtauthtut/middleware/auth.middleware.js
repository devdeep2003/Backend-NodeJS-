import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.json({
      success: false,
      message: "Access Denied || Unauthorized Access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    return res.json({
      success: false,
      message: "Error verifying the token",
    });
  }

  next();
};
