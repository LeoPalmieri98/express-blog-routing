const express = require('express')
const postsRouter = require("./routers/posts.js")
const app = express()
const port = 3000



app.use(express.static("img"))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server del mio blog')
})
app.use("/bacheca", postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
