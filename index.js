require('dotenv').config()
const express = require('express')
const router = require('./routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', router)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('This is API for Rent A Vehicle')
})