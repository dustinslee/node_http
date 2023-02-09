const http = require("http");
const PORT = 3000;

http
  .createServer((req, res) => {
    const url = req.url;
    console.log("The url is:", url);
    const method = req.method;
    res.setHeader("Content-Type", "text/html");
    console.log("Request made with this method: ", req.method);
    const chunks = [];

    req.on("data", (chunk) => {
        console.log("Chunk", chunk);
        chunks.push(chunk);
    });

    req.on("end", () => {
      if (method == "POST" && chunks.length > 0){
          const body = JSON.parse(Buffer.concat(chunks).toString());
          const responseBody = { method, url, body};

          if (url == "/"){
              res.writeHead(200, "OK");
              res.write("<h1>Message Received</h1>");
          } else if (url == "/echo"){
              res.writeHead(200, "OK");
              res.write(JSON.stringify(responseBody));
          }
      }
      
      res.end();
    });

    if (url == "/"){
      if (method == "GET"){
          res.write("<h1>Home: Dustin's Place</h1>");
          res.statusCode = 200;
          res.end();
      }
    } else if (url == "/about"){
        res.statusCode = 200;
        res.write("About - I am Dustin");
        res.end();
    } else if (url == "/contact"){
        res.statusCode = 200;
        res.write("<h1>Contact Me: dustin@defnotgmail.com</h1>");
        res.end();
    }
  })
  .listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
  });