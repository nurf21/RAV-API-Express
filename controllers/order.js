const orderModel = require('../models/order')
const vehicleModel = require('../models/vehicle')

exports.createOrder = async (req, res) => {
  try {
    for (const i in req.body) {
      if (req.body[i] === '') {
        return res.status(400).json({
          success: false,
          message: 'Please enter all required fields'
        })
      }
    }
    const checkVehicle = await vehicleModel.getVehicleById(req.body.vehicle_id)
    if (!checkVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle id not found'
      })
    }
    const totalPrice = checkVehicle.vehicle_price * req.body.period
    const setData = {
      vehicle_id: req.body.vehicle_id,
      user_id: req.body.user_id,
      period: req.body.period,
      total_price: totalPrice,
      status: 1
    }
    const create = await orderModel.createNewOrder(setData)
    const minusStock = checkVehicle.stock - 1
    const updateStock = {stock: minusStock}
    await vehicleModel.updateVehicle(req.body.vehicle_id, updateStock)
    if (create.affectedRows > 0) {
      const newOrder = await orderModel.getOrderById(create.insertId);
      return res.json({
        success: true,
        message: 'Order created',
        result: newOrder
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.getOrderHistory = async (req, res) => {
  try {
    const id = req.params.id
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2
    const offset = limit * (page - 1)
    const order = req.query.order || 'ASC'
    const countHistory = await orderModel.getCountHistory(id)
    const totalItem = countHistory[0].total
    const totalPage = Math.ceil(totalItem / limit)
    if (totalPage >= page) {
      const orderHistory = await orderModel.getOrderHistory({
        id,
        limit,
        offset,
        order
      })
      return res.status(200).json({
        success: true,
        message: "Get Order History Success",
        result: {
          page,
          totalItem: totalItem,
          totalPage: totalPage,
          data: orderHistory,
        }
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id
    const update = await orderModel.updateOrder(id, req.body)
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedOrder = await orderModel.getOrderById(id)
        return res.json({
          success: true,
          message: 'Order Updated Successfully',
          result: updatedOrder,
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Data is not changed',
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to update order',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id
    const checkId = await orderModel.getOrderById(id)
    if (!checkId) {
      return res.status(400).json({
        success: false,
        message: 'Order id not found'
      })
    }
    await orderModel.deleteOrder(id)
    return res.json({
      success: true,
      message: 'History deleted',
      result: checkId
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}