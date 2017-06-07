const massive = require('massive');
const EventEmitter = require('events');
const DB_READY = 'dbReady';

const dbEvents = new EventEmitter();

let db;

let massifier = {};

massifier.set = function(_db) {
  db = _db;
}

massifier.middleware = function() {
  return function(req, res, next) {
    req.db = db;
    next();
  }
}

massifier.init = function(cb) {
  if (!db) {
    dbEvents.on(DB_READY, () => {
      cb(db);
    })
  } else {
    cb(db);
  }
}


massifier.get = function() {
  return new Promise((resolve, reject) => {
    if (!db) {
      dbEvents.on(DB_READY, () => {
        resolve(db);
      })
    } else {
      resolve(db);
    }
  })
}

module.exports = function(connectionString) {
  massive(connectionString).then(_db => {
    db = _db;
    dbEvents.emit(DB_READY);
  })

  return massifier
}