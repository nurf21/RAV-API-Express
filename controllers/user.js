const userModel = require('../models/user')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  try {
    const checkUser = await userModel.checkUser()
    const checkEmail = checkUser.find(item => item.email === req.body.email)
    const checkPhone = checkUser.find(item => item.mobile_phone === req.body.mobile_phone)
    for (const i in req.body) {
      if (req.body[i] === '') {
        return res.status(400).json({
          success: false,
          message: 'Please enter all required fields'
        })
      }
    }

    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: 'The email address you have entered is already registered'
      })
    } else if (checkPhone) {
      return res.status(400).json({
        success: false,
        message: 'The phone number you have entered is already registered'
      })
    }

    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (req.body.email.match(emailFormat)) {
      if (req.body.password.length < 8 || req.body.password.length > 16) {
        return res.status(400).json({
          success: false,
          message: 'Password must be 8-16 characters'
        })
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(req.body.password, salt)
      req.body['password'] = encryptPassword
      const create = await userModel.createNewUser(req.body)
      return res.json({
        success: true,
        message: 'Account successfully created.',
        result: create
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unknown error"
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id
    const userData = await userModel.getUserById(id)
    return res.json({
      success: true,
      message: `Get User Id : ${id} Success.`,
      result: userData
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unknown error"
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const checkId = await userModel.getUserById(id)
    if (!checkId) {
      return res.status(400).json({
        success: false,
        message: 'User id not found'
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
    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return res.status(400).json({
        success: false,
        message: 'Password must be 8-16 characters'
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(req.body.password, salt)
    req.body['password'] = encryptPassword
    const update = await userModel.updateUser(id, req.body)
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updatedUser = await userModel.getUserById(id);
        return res.json({
          success: true,
          message: "Profile updated successfully",
          result: updatedUser,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Profile is not changed',
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unknown error"
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const checkId = await userModel.getUserById(id)
    if (!checkId) {
      return res.status(400).json({
        success: false,
        message: 'User id not found'
      })
    }
    await userModel.deleteUser(id)
    return res.json({
      success: true,
      message: 'Account deleted successfully',
      result: checkId 
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unknown error"
    })
  }
}