const Koa = require("koa")
const KoaRouter = require("@koa/router")
const mysql = require("mysql")

const databaseConfig = require("./config")

const dataPool = mysql.createPool(databaseConfig)

function invokeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    dataPool.getConnection(function (err, connection) {
      if (err) {
        return reject(err)
      }

      connection.query(sql, values, (err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res)
      })
    });
  })
}


const app = new Koa()

const router = new KoaRouter()
router.prefix("/api")

router.get("/trace", async (ctx, next) => {
  const {
    msg
  } = ctx.request.query
  const {
    filename,
    message
  } = JSON.parse(msg)

  await invokeQuery(`INSERT INTO trace (filename, message) VALUES ("${filename}", "${message}")`)
  ctx.body = {
    success: "ok"
  }
})

router.get("/logs", (ctx) => {
  ctx.body = [{
    message: "Uncaught ReferenceError: asdf is not defined"
  }]
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3001)