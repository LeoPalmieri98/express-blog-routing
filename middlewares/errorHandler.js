function errorHandler(err, req, res, next) {
    console.error(req.method, req.originalUrl, err.message)
    res.status(500).json({ error: err.message });
}
module.exports = errorHandler;