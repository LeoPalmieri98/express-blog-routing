function notFound(req, res, next) {
    console.error(req.method, req.originalUrl)
    res.status(404).json({ error: "Page not Found" });
};

module.exports = notFound;