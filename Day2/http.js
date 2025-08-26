const http = require("http")
const fs = require("fs")

const PORT = 8080


const hitsServer = http.createServer((req , res)=>{

    const Log = `Request recorded on : ${Date.now()} , The request is coming from route : ${req.url} and the request status code is ${req.statusCode}.\n`
    fs.appendFileSync("./logs.txt" , Log ,(err)=>{
         if(err) console.log(err)
    })

    res.end("This server records the logs of users hitting it")
})

hitsServer.listen(PORT , ()=>{
    console.log(`The server is running at ${PORT}`)
})

//Description of this file : This file creates a simple HTTP server that logs incoming requests to a file.
//It uses the 'http' module to create the server and the 'fs' module to write logs to a file.
//The server listens on port 8080 and records the request details (timestamp, URL, status code) in a log file.
