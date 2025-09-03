const fs = require("fs");
const { pipeline ,Transform } = require("stream");
const http = require("http");

const transform = new Transform({
  transform(chunk, encoding, callback) {
    // Transform the chunk here
    const modifiedChunk = chunk
      .toString()
      .toUpperCase()
      .replace(/IPSUM/gi, "Deep Chakraborty");
    callback(null, modifiedChunk);
  },
});

const httpServer = http.createServer((req, res) => {
  const readStream = fs.createReadStream("./input.txt");
  const writeStream = fs.createWriteStream("./output.txt");

  pipeline(readStream, transform, writeStream, (err) => {
    if (err) {
      console.log("Error occurred during pipeline processing");
      res.statusCode = 500;
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Server is running and the modified chunk is being written");
    }
  });
});


httpServer.listen(8081, () => {
  console.log("HTTP Server running on port 8081");
});
