const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/dishes", dishRouter);

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

app.get("dishes", (req, res, next) => {
  res.end("Will send dishes to you!");
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operations not supported on /dishes");
});

app.delete("diehes", (req, res, next) => {
  res.end("Deleting all dishes!! (careful)");
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type;, 'text/html");
  res.end("<html></body><h1>This is an express server!</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
