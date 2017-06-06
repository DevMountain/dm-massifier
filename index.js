const massive = require('massive');
const EventEmitter = require('events');

let db;


module.exports = function(connectionString) {
  let db;

  const dbEmitter = new EventEmitter()
  massive(connectionString)
    .then(_db => {
      db = _db
      dbEmitter.emit('dbReady')
    })
    .catch(err => {
      throw err
    })

  return {
    get: function(cb) {
      return new Promise((resolve, reject) => {
        if (!db) {
          dbEmitter.on('dbReady', () => {
            if (typeof cb === 'function') {
              return cb(db);
            }
            resolve(db);
          })
        } else {
          if (typeof cb === 'function') {
            return cb(db);
          }
          resolve(db);
        }
      })
    }
  }
}