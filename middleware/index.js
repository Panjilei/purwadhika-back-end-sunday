// Middleware

module.exports = {
  bodyParser: require('body-parser'),
  cors: require('cors'),
  fileParser: require('express-fileupload'),
  notFound: require('./404'),
  db: require('./db'),
  reqIn: require('./reqIn'),
}
