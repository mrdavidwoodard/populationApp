let mongodb = require("mongodb");

class Database {
  static connect() {
    return mongodb.MongoClient.connect("mongodb://mrdavidwoodard:dw5177dw@ds129003.mlab.com:29003/statesdb").then((db) => {
      console.log("statesdb connected");
      this.db = db;
    })
  }
  constructor(db) { }
}

module.exports = Database;
