const express = require("express")

const app = express()
app.use(express.static(__dirname))

const data = require("./data.json")
app.get("/api/img", (req, res) => {
    const start = Math.floor(Math.random() * (data.length - 20))
    res.json(data.slice(start, start + 20))
})
app.listen(3000)