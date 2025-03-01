const express = require("express");
const fs = require("fs");

const { connectMongoDB } = require("./db_config");
const app = express();

const router = require("./routes/url");

const PORT = 8001;

// Mongoogse connnection
connectMongoDB() // add parameter here your mongodb url with database
  .then(() => console.log("Mongoose connected"))
  .catch((e) => console.log(e));

app.use("/", (req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} - ${req.ip} - ${req.method} - ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// Getting data in json
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use("/url", router);

app.listen(PORT, () => console.log("Server connected"));
