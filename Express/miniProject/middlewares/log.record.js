import fs from "fs";
import path from "path"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logmiddleware = (req,res,next)=>{
    const Log = `[${new Date().toISOString()}] : ${req.method} ${req.url} \n`;
    fs.appendFile(path.join(__dirname , '../logs/Logs.txt'), Log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
    next();
}

export default logmiddleware;