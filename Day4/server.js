const http = require("http")
const fs = require("fs")


const PORT = 8080;

const httpServer = http.createServer((req,res)=>{
    
    // 1----> Handling big data in a bad way ❌
    // const file = fs.readFileSync("input.txt");
    // res.end(file);
    //Eventually when tested the page crashed due to out of memory

    // 2---> Handling big data in an efficient way (streams)
    // const readFileStream = fs.createReadStream("input.txt");
    // readFileStream.pipe(res);
    // res.end();

    // 3--> Copying large contents in a bad way
    // const readStream = fs.readFileSync("input.txt");
    // fs.writeFileSync("./output.txt", readStream);
    // res.end("File Copied");

    // 4--> Copying Large contents in an efficient way
    const readStream = fs.createReadStream("input.txt");
    const writeStream = fs.createWriteStream("./output.txt");
    readStream.on("data" , (chunk)=>{
        console.log(chunk);
        writeStream.write(chunk);
    })
    res.end("File copied via streams");
})

httpServer.listen(PORT , (err)=>{
    if(err){
        console.error("Error starting server:", err);
        return;
    }
    console.log(`Server is listening on port ${PORT}`);
})


//Theory on streams:

// 1. Streams are objects that let you read data from a source or write data to a destination in a continuous manner.
// 2. They are particularly useful for handling large amounts of data, as they allow you to process the data in chunks rather than loading it all into memory at once.
// 3. Node.js provides several built-in stream types, including Readable, Writable, Duplex, and Transform streams.
// 4. The 'pipe' method is a convenient way to connect the output of a readable stream to the input of a writable stream.
