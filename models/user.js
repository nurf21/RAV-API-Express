const db = require("../helper/db")

exports.checkUser = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT email, mobile_phone FROM user', (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.createNewUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO user (${Object.keys(data)}) VALUES (${Object.values(data).map(item => `"${item}"`)})`, (err, result, field) => {
      if(err) {
        return reject(err)
      }

      return resolve(result)
    })
  })
}

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user WHERE id = ${id}`, (err, result) => {
      if(err) {
        return reject(err)
      }
      if (result[0]) {
        delete result[0].password
      }
      return resolve(result[0])
    })
  })
}

exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    db.query(`UPDATE user SET ${keys.map((key, index) => `${key} = "${values[index]}"`)} WHERE id = ${id}`,
    (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM user WHERE id=${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}