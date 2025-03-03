const express = require('express')
const { createTelefuncCaller } = require('telefunc')

const isProduction = process.env.NODE_ENV === 'production'
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  app.use(express.static(`${root}/dist`))

  const callTelefunc = await createTelefuncCaller({ isProduction, root })
  app.use(express.text())
  app.all('/_telefunc', async (req, res, next) => {
    const { originalUrl: url, method, body } = req
    const result = await callTelefunc({ url, method, body })
    if (!result) return next()
    res.status(result.statusCode).type(result.contentType).send(result.body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
