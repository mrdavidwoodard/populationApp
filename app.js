let http = require("http");
let express = require("express");
let app = express();
let router = express.Router();
let bodyParser = require("body-parser");
let host = "localhost";
let port = 3000;
let states = require("./states");
let Database = require("./db");
Database.connect();

app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.use("/states", states);

app.listen(port, function () {
  console.log("server connected");
})
