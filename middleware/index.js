// Middleware

module.exports = {
  bodyParser: require('body-parser'),
  cors: require('cors'),
  notFound: require('./404'),
  db: require('./db'),
}
