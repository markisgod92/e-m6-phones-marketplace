const genericErrorHandler = (err, req, res, next) => {
    const errorStatus = err.statusCode || 500
    const errorMessage = err.message || 'got_error'

    res.status(errorStatus)
        .send({
            statusCode: errorStatus,
            message: errorMessage,
            stack: err.stack
        })
}

module.exports = genericErrorHandler