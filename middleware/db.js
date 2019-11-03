const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    albums: [],
    techStacks: []
}).write()

module.exports = function (req, res, next) {
    req.db = db
    next()
}