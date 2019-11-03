const express = require('express')

const Router = express.Router()

// import controller
const albumsController = require('../controller/albums')
const techStacksController = require('../controller/techStacks')


// import controller in routes
Router.get('/albums', albumsController.getAll)
Router.get('/albums/:id', albumsController.getById)
Router.post('/albums',
    [albumsController.midValidate, albumsController.midUpload], 
    albumsController.insert) 
Router.delete('/albums/:id', albumsController.delete)
Router.patch('/albums/:id',
    albumsController.midUpload,
    albumsController.patch)
Router.put('/albums/:id',
    [albumsController.midValidate, albumsController.midUpload],
    albumsController.put)

Router.get('/tech-stacks', techStacksController.getAll)
Router.get('/tech-stacks/:id', techStacksController.getById)
Router.post('/tech-stacks',
    techStacksController.midValidate, 
    techStacksController.insert) 
Router.delete('/tech-stacks/:id', techStacksController.delete)
Router.patch('/tech-stacks', techStacksController.patch)
Router.put('/tech-stacks/:id',
    techStacksController.midValidate,
    techStacksController.put)

// All router here
module.exports = Router
