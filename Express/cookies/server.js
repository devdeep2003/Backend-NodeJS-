import cookieParser, { signedCookie } from "cookie-parser"
import express from "express"

const app = express()
let PORT = 8080

app.use(express.json())
app.use(cookieParser("secret"))


app.get("/" , (req,res)=>{
    res.cookie("userID" , "user123" , { signed: true })
    console.log(req.signedCookies);
    res.status(200).send("Hello World")
})

app.get("/api/products",(req,res)=>{
    if(req.signedCookies.userID){
        res.status(200).send("Products List")
    }else{
        res.status(403).send("Unauthorized request")
    }
})

app.listen(PORT , ()=>{
    console.log(`Server listening at ${PORT}`)
})


// Notes :
// 1. cookie-parser middleware is used to parse cookies in incoming requests.
// 2. In the root route ("/"), a signed cookie named "userID" is set with the value "user123".
// 3. The signed option ensures that the cookie is signed with a secret key, providing integrity and authenticity.
// 4. In the "/api/products" route, we check for the presence of the signed cookie "userID".
// 5. If the cookie is present and valid, we respond with a list of products; otherwise, we return a 403 Unauthorized status.