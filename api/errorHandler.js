function errorHandler (err, req, res) {
 message = `Server Error: ${err.message}`
 console.log(`res: ${err}`)
 res.status(err.statusCode || 500).send(message)
}

module.exports = {errorHandler}