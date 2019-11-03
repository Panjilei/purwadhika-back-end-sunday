const express = require('express')

const Router = express.Router()

// import controller
const albumsController = require('../controller/albums')


// import controller in routes
Router.get('/albums', albumsController.getAll)
Router.get('/albums/:id', albumsController.getById)
Router.post('/albums',
    [albumsController.midValidate, albumsController.midUpload], 
    albumsController.insert) 
Router.delete('/albums/:id', albumsController.delete)

// All router here
module.exports = Router
