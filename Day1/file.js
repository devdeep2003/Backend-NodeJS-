const fs = require("fs")

fs.writeFileSync("test.txt" , "Hello this command writes into a file")
//The fs.writeFileSync() method is used to write data to a file synchronously.
//The above one is used to write file in a file synchronously 
//Alternatively . There is a asynchronous method fs.writeFile() which is used to write data to a file asynchronously.

fs.writeFile("test2.txt" , "This command is used to write data into a file asynchronously", (err)=>{
    if(err) console.log(err)
})


//Similarly There are 2 functions to read files fs.readFileSync() and fs.readFile()
//The fs.readFileSync() method is used to read the contents of a file synchronously.
//The fs.readFile() method is used to read the contents of a file asynchronously.
 fs.readFile("test.txt" , "utf-8" , (err,res)=>{
     if(err) console.log(err)
         else console.log(res)
 })

//console.log(fs.readFileSync("test2.txt" , "utf-8"))



//Similarly There are 2 functions to append files fs.appendFileSync() and fs.appendFile()
//The fs.appendFileSync() method is used to append data to a file synchronously.
//The fs.appendFile() method is used to append data to a file asynchronously.
fs.appendFile("test.txt" , "\nThis is the appended text , Hello ji" , (err)=>{
    if(err) console.log(err)
})

//fs.appendFileSync("test2.txt" , "\nThis is the appended text , Hello ji")   

//Similarly There are 2 functions to delete files fs.unlinkSync() and fs.unlink()

fs.unlink("test.txt", (err)=>{
    if(err) console.log(err)
        else console.log("test.txt deleted")
})

//fs.unlinkSync("test2.txt")