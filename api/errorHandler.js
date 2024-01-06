const ErrorHandler = (err, req, res, next) => {
 let message = `Server Error: ${err.message}`
 let errCode = 500
 if(err.code === 11000){
   duplicatedField = Object.keys(err.keyValue)[0]
   errCode = 409
   message = duplicatedField
 }
 res.status(errCode).send(message)
}

module.exports = {ErrorHandler}