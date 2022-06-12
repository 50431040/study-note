const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")

    if (req.method.toLowerCase() === "options") {
        return res.end()
    }

    next()
})

app.use(bodyParser.json())

app.get("/user", (req, res) => {
    setTimeout(() => res.json({
        name: "jlq",
        age: 25
    }), 500)
})

app.post("/login", (req, res) => {
    const { username } = req.body

    if (username === "admin") {
        res.json({
            code: 0,
            username,
            token: jwt.sign({
                username
            }, "jlq", {
                expiresIn: 20
            })
        })
    } else {
        res.json({
            code: 1,
            data: "用户名不存在"
        })
    }
})

app.listen(3000)