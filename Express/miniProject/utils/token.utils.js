
import crypto from "crypto";

export const generateToken = () =>{
    return crypto.randomBytes(16).toString("hex");
}

export const validateToken = (authtoken) =>{
    return authtoken.length === 32;
}

