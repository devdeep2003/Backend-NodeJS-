const {Readable , Writable} = require("stream");

const readableStream = new Readable({
    read(){},
   // highWaterMark : 4
})

const writableStream = new Writable({
    write(chunk){
        console.log("Data chunk : " , chunk)
    }
})

readableStream.on("data" , (chunk)=>{
    console.log(chunk);
    writableStream.write(chunk);
})

console.log(readableStream.push("Hello World"))

//Notes : 
// The highWaterMark option is set to 12, which means that the internal buffer can hold up to 12 chunks of data before it stops reading from the source.
// If the buffer is full, the stream will stop reading from the source until there is space available in the buffer.
// The push() method is used to push data into the readable stream's internal buffer.   
// It returns true if the internal buffer is not full and false if it is full.
// If the push() method returns false, it means that the internal buffer is full and the stream is not able to accept any more data at the moment.
