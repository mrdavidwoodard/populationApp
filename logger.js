let morgan = require("morgan");
let winston = require("winston");
let moment = require("moment");

let instance = null;

export default class loggerService {
  get timeStamp(){return this._timeStamp}

  constructor() {
    if (!instance) {
      this._timeStamp = this.time;
      //Setup Logger to test whether we have singleton or not
      let time = () => {return moment().format("YYYY-MM-DD h:mm:ss a")}
      //set up winston
      let winlogger = new winston.Logger({
        transports: [
          new winston.transports.File({
            level: 'error',
            filename: 'app.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true,
            prettyprint:true
          }),
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
          })
        ],
        exitOnError: false
      });

      let logger = {
        timeStamp: this._timeStamp,
        time: time,
        log:(message,category = 'info')=>{ winlogger.log(category,message)},
        dev: morgan('dev')
      }
      instance = logger;
    }
    return instance;
  }
}

module.exports = loggerService;
