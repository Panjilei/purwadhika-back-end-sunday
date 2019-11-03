module.exports = function (req, res, next) {
    console.log(req.method, req.url)
    if(req.body) {
        console.log('BODY:', JSON.stringify(req.body))
    }
    next()
}
