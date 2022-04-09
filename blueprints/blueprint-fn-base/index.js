const express = require('express')
const handler = require('./src/index.js')

const app = express()

const appName = process.env.npm_package_name
const appVersion = process.env.npm_package_version
const appPort = process.env.npm_package_config_port

app.get('/health', (req, res) => {
  res.send({
    "status": "ok"
  })
})

app.get('/version', (req, res) => {
  res.send({
    "name": appName,
    "version": appVersion 
  })
})

app.use('/', handler)

app.listen(appPort, () => {
  console.log(`${appName} service listening on port ${appPort}`)
})
