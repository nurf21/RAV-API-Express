const express = require('express')

const userRouter = require('./user')
const vehicleRouter = require('./vehicle')

const route = express.Router()

route.get('/', (req, res, next) => {
  res.json({success: true, message: 'This is API for Rent A Vehicle'})
})

route.use('/user', userRouter)
route.use('/vehicle', vehicleRouter)

route.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Wrong url.'
  })
})

module.exports = route