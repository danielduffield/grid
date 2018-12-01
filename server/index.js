require('dotenv').config()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const fs = require('fs-extra')
const path = require('path')
const { express, app, server } = require('./utils/serverApp')

const minutes = 60 * 1000

setInterval(() => {
  queue = updateQueue(queue)
}, 5 * minutes)

app.use(jsonParser)
app.use(express.static('server/public'))
app.use('/download', express.static('server/downloaded'))

server.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}...`))
