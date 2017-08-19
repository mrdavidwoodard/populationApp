//import loggerService as loggerService from "logger";
let express = require("express");
let mongodb = require("mongodb");
let Database = require("./db");
let app = express();
let router = express.Router();


app.set("view engine", "ejs");

router.post("/", (req, res) => {
  let state = req.body;
  state._id = new mongodb.ObjectId();
  Database.db.collection("states").save(state).then((result) => {
    res.send(result);
  });
})

router.get("/", function (req, res, next) {
  console.log ("request URL:", req.originalURL)
  next()
}, (req, res, next) => {
  //checking for securitykey
  let secret = req.query["secret"];
  if (secret !== "51") {
    res.status(401).send("Nothing to see here. Move along.");
  } else {
    next();
  }
}, (req, res) => {
  Database.db.collection("states").find().toArray().then((result) => {
    res.json(result);
  })
})

// attempt at filtering router.get to get req.body in statesdb
router.get("/:id", (req, res) => {
  let state = req.params["id"];
  Database.db.collection("states").find({"stateID": state}).toArray().then((result) => {
    res.json(result);
    console.log("new request for state = " + state);
    console.log("result = " + JSON.stringify(result));
  })
})

router.put("/", (req, res) => {
  let state = req.body;
  state._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection("states").save(state).then((result) => {
    res.send(result);
  })
})

router.delete("/:id", (req, res) => {
  let stateId = new mongodb.ObjectID(req.params["id"]);
  Database.db.collection("states").remove({_id: stateId}).then((result) => {
    res.send(result);
  })
})

module.exports = router;
