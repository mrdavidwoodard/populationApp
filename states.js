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

router.get("/", (req, res) => {
  Database.db.collection("states").find().toArray().then((result) => {
    res.json(result);
  })
})

router.put("/", (req, res) => {
  let state = req.body;
  state._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection("states").save(state).then((result) => {
    res.send(result);
  })
})

// attempt at filtering router.get
router.get("/:id", (req, res) => {
  //let state = new mongodb.ObjectID(req.params["id"]);
  Database.db.collection("states").find({"stateID": "CA"}).toArray().then((result) => {
    res.json(result);
  })
})

router.delete("/:id", (req, res) => {
  let stateId = new mongodb.ObjectID(req.params["id"]);
  Database.db.collection("states").remove({_id: stateId}).then((result) => {
    res.send(result);
  })
})

module.exports = router;
