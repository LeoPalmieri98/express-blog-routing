const express = require('express')
const postsRouter = require("./routers/posts.js")
const checkTime = require("./middlewares/checkTime.js")
const errorHandler = require('./middlewares/errorHandler.js')


const app = express()
const port = 3000



app.use(express.static("img"));
app.use(express.json());
//app.use(checkTime);

app.get('/', (req, res) => {
    res.send('Server del mio blog')
})
app.use("/bacheca", checkTime, postsRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
