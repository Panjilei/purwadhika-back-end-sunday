module.exports = function (req, res, next) {
    req.currentHost = req.protocol + '://' + req.headers.host
    console.log(req.method, req.currentHost + req.url)
    if (Object.keys(req.body).length) {
        console.log('BODY:', JSON.stringify(req.body))
    }
    next()
}
