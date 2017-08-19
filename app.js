let http = require("http");
let express = require("express");
let app = express();
let logger = require("morgan");
//let logger = require("./logger.js");
//import {default as log} from "/logger";
let moment = require("moment");
let router = express.Router();
let bodyParser = require("body-parser");
let host = "localhost";
let port = 3000;
let states = require("./states");
let Database = require("./db");
let startMessage = require("./startMessage");
Database.connect();


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  //logger.log("invoking index page.")
  res.render("index");
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.use("/states", states);

app.listen(port, function () {
  console.log("server connected");
})
