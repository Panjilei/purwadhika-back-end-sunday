let albums = {}

albums.getAll = function (req, res) {
    console.log('GET', req.url)
    const result = req.db.get('albums').value()
    console.log(JSON.stringify(result))
    res.send(result)
}

module.exports = albums
