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
Router.delete('/albums/:id', 
    albumsController.midIsExist,    
    albumsController.delete)
Router.patch('/albums/:id',
    [albumsController.midIsExist, albumsController.midUpload],
    albumsController.patch)
Router.put('/albums/:id',
    [albumsController.midIsExist, albumsController.midValidate, albumsController.midUpload],
    albumsController.put)

Router.get('/tech-stacks', techStacksController.getAll)
Router.get('/tech-stacks/:id', techStacksController.getById)
Router.post('/tech-stacks',
    techStacksController.midValidate, 
    techStacksController.insert) 
Router.delete('/tech-stacks/:id',
    techStacksController.midIsExist,
    techStacksController.delete)
Router.patch('/tech-stacks', 
    techStacksController.midIsExist,
    techStacksController.patch)
Router.put('/tech-stacks/:id',
    [
        techStacksController.midIsExist,
        techStacksController.midValidate
    ],
    techStacksController.put)

// All router here
module.exports = Router
