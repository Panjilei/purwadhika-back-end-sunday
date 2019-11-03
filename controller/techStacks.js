const shortid = require('shortid') 

let techStacks = {}

techStacks.getAll = function (req, res) {
    console.log(req.method, req.url)
    const result = req.db.get('techStacks').value()
    console.log('RESULT', JSON.stringify(result))
    res.send(result)
}

techStacks.getById = function (req, res) {
    console.log('GET', req.url)

    const result = req.db
        .get('techStacks')
        .find({ id: req.params.id })
        .value()
    
    console.log('RESULT', JSON.stringify(result))
    
    if (result) {
        res.send(result)
    } else {
        res.status(404).send('<pre>404 not found</pre>')
    }
}

techStacks.insert = function (req, res) {
    console.log(req.method, req.url)

    const data = {
        id: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
    }

    const result = req.db
        .get('techStacks')
        .push(data)
        .write()

    if (result) {        
        console.log('RESULT', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre>500 General Request</pre>')    
    }
}

techStacks.midValidate = function (req, res, next) {
    let { title, description, url } = req.body

    if (!title || !description || !url) {
        res.status(400).send('<pre>400 Bad Request</pre>')
    } else {
        next()
    }
}

techStacks.midUpload = function (req, res, next) {
    req.body.image = ''

    if (req.files && req.files.image) {
        let photo = req.files.image
        let photoName = photo.name
        photo.mv('./public/' + photoName, function(err){
            if(err){
                console.log('Err upload file:', err.message)
            } else {
                req.body.image = '/public/' + photoName
            }
            next()
        })
    }   else {
        next()
    }
}

techStacks.delete = function (req, res) {
    console.log(req.method, req.url)

    const result = req.db
        .get('techStacks')
        .remove({ id: req.params.id })
        .write()

    if (result) {        
        console.log('RESULT', JSON.stringify(result[0]))
        res.send(result[0])
    } else {
        res.status(500).send('<pre>500 General Error</pre>')    
    }
}

techStacks.patch = function (req, res) {
    console.log(req.method, req.url)
    
    const data = {}
    if (req.body.title) data.title = req.body.title
    if (req.body.desription) data.description = req.body.description
    if (req.body.url) data.url = req.body.url    

    const result = req.db
        .get('techStacks')
        .find({ id: req.params.id })
        .assign(data)
        .write()

    if (result) {        
        console.log('RESULT', JSON.stringify(result))
        res.send(result)
    } else {
        res.status(500).send('<pre>500 General Error</pre>')    
    }
}

techStacks.put = function (req, res) {
    console.log('GET', req.url)

    const data = {
        title: req.body.title,
        artist: req.body.artist,
        url: req.body.url,
    }

    const result = req.db
        .get('techStacks')
        .find({ id: req.params.id })
        .assign(data)
        .write()

    if (result) {        
        console.log('RESULT', JSON.stringify(result))
        res.send(result)
    } else {
        res.status(500).send('<pre>500 General Error</pre>')    
    }
}

techStacks.midIsExist = function (req, res, next) {
    const data = req.db
        .get('techStacks')
        .find({ id: req.params.id })
        .value()
    if (data) {
        next()
    } else {
        res.status(404).send('<pre>404 not found</pre>')
    }
}    

module.exports = techStacks
