import express from "express";
import publicRouteConfig from "./routes/public.route.js";
import privateRouteConfig from "./routes/private.route.js";
import fs from "fs";
import path from "path"
import { fileURLToPath } from "url";
import logmiddleware from "./middlewares/log.record.js";




const app = express();
const PORT = 8080;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Create logs directory if it doesn't exist
if(!fs.existsSync(path.join(__dirname,'logs'))){
    fs.mkdirSync(path.join(__dirname,'logs'));
    console.log(__dirname);
}

app.use(express.json());
app.use(logmiddleware);
app.use("/api/public",publicRouteConfig);
app.use("/api/private" , privateRouteConfig);


app.get("/" , (req,res)=>{
    res.status(200).send("Hello World");
})

app.listen(PORT , ()=>{
    console.log(`Server live at ${PORT}`);
})
