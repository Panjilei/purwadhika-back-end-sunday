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

module.exports = albums
