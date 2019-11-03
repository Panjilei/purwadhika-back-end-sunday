const shortid = require('shortid') 

let albums = {}

albums.getAll = function (req, res) {
    console.log('GET', req.url)
    const result = req.db.get('albums').value()
    console.log(JSON.stringify(result))
    res.send(result)
}

albums.getById = function (req, res) {
    console.log('GET', req.url)

    const result = req.db
        .get('albums')
        .find({ id: req.params.id })
        .value()
    
    console.log('RESULT', JSON.stringify(result))
    
    if (result) {
        res.send(result)
    } else {
        res.status(404).send('<pre>404 not found</pre>')
    }
}

albums.insert = function (req, res) {
    console.log('GET', req.url)

    const data = {
        id: shortid.generate(),
        title: req.body.title,
        artist: req.body.artist,
        url: req.body.url,
        image: req.body.image
    }

    const result = req.db
        .get('albums')
        .push(data)
        .write()

    if (result) {        
        console.log('RESULT', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre>500 General Request</pre>')    
    }
}

albums.midValidate = function (req, res, next) {
    let { title, artist, url } = req.body
    if (!title || !artist || !url) {
        res.status(400).send('<pre>400 Bad Request</pre>')
    } else {
        next()
    }
}

albums.midUpload = function (req, res, next) {
    req.body.image = ''

    if (req.files.image) {
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

module.exports = albums
