const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicle')

router.post('/', vehicleController.createVehicle)
router.get('/', vehicleController.getAllVehicle)
router.get('/filter', vehicleController.getVehicleByCategory)
router.get('/:id', vehicleController.getVehicleById)
router.put('/:id', vehicleController.updateVehicle)
router.delete('/:id', vehicleController.deleteVehicle)

module.exports = router