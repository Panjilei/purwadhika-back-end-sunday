const express = require('express')

const Router = express.Router()

// import controller
const albumsController = require('../controller/albums')


// import controller in routes
Router.get('/albums', albumsController.getAll)
Router.get('/albums/:id', albumsController.getById)

// All router here
module.exports = Router
