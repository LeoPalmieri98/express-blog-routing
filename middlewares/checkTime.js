function checkTime(req, res, next) {

    const time = new Date().toLocaleString();
    console.log("Richiesta ricevuta", time);

    if (new Date().getHours() > 23) {
        return res.send("Siamo chiusi");
    }

    next();
}

module.exports = checkTime;