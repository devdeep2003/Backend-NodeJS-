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


//Notes :
// 1. We are using express.json() to parse incoming JSON requests.
// 2. We have two route configurations: public and private.
// 3. We have a middleware for logging requests.
// 4. The server listens on port 8080.
// 5. We create a 'logs' directory if it doesn't exist to store log files.
// 6. We are using ES6 modules, so we import modules using 'import' instead of 'require'.
// 7. We use fileURLToPath and path.dirname to get the current directory name in ES6 modules.
// 8. The routes and middleware are assumed to be defined in separate files.
// 9. We are using path module to handle file and directory paths.
// 10. The server responds with "Hello World" when the root URL is accessed.
// 11. Make sure to create the 'routes' and 'middlewares' directories with appropriate files for this code to work.