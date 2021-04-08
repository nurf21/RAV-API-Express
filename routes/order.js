const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')

router.post('/', orderController.createOrder)
router.get('/:id', orderController.getOrderHistory)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router