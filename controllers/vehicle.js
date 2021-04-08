const vehicleModel = require('../models/vehicle')

exports.createVehicle = async (req, res) => {
  try {
    for (const i in req.body) {
      if (req.body[i] === '') {
        return res.status(400).json({
          success: false,
          message: 'Please enter all required fields'
        })
      }
    }
    const create = await vehicleModel.createNewVehicle(req.body)
    if (create.affectedRows > 0) {
      const newVehicle = await vehicleModel.getVehicleById(create.insertId);
      return res.json({
        success: true,
        message: 'Vehicle successfully added onto the lists.',
        result: newVehicle
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.getAllVehicle = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2
    const offset = limit * (page - 1)
    const search = req.query.search || ''
    const sort = req.query.sort || 'created_at'
    const order = req.query.order || 'ASC'

    const countVehicle = await vehicleModel.getCountVehicle(id)

    const totalItem = countVehicle[0].total
    const totalPage = Math.ceil(totalItem / limit)
    if (totalPage >= page) {
      const vehicles = await vehicleModel.getFilteredVehicle({
        limit,
        offset,
        search,
        sort,
        order
      })
      return res.json({
        success: true,
        message: 'Get all vehicle data success',
        result: {
          page,
          totalItem: totalItem,
          totalPage: totalPage,
          data: vehicles,
        },
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

exports.getVehicleById = async (req, res) => {
  try {
    const id = req.params.id
    const vehicleData = await vehicleModel.getVehicleById(id)
    if (!vehicleData) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle id not found'
      })
    }
    return res.json({
      success: true,
      message: `Get Vehicle Id : ${id} Success.`,
      result: vehicleData
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.updateVehicle = async (req, res) => {
  try {
    const id = req.params.id
    const checkId = await vehicleModel.getVehicleById(id)
    if (!checkId) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle id not found'
      })
    }
    for (const i in req.body) {
      if (req.body[i] === '') {
        return res.status(400).json({
          success: false,
          message: 'Please enter all required fields'
        })
      }
    }
    const update = await vehicleModel.updateVehicle(id, req.body)
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedVehicle = await vehicleModel.getVehicleById(id)
        return res.json({
          success: true,
          message: 'Vehicle Updated Successfully',
          result: updatedVehicle,
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Data is not changed',
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to update vehicle',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}

exports.deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id
    const checkId = await vehicleModel.getVehicleById(id)
    if (!checkId) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle id not found'
      })
    }
    await vehicleModel.deleteVehicle(id)
    return res.json({
      success: true,
      message: 'Vehicle deleted',
      result: checkId
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unknown error'
    })
  }
}