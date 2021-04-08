const db = require("../helper/db")

exports.createNewVehicle = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO vehicle (${Object.keys(data)}) VALUES (${Object.values(data).map(item => `"${item}"`)})`, (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM vehicle WHERE id = ${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result[0])
    })
  })
}

exports.getFilteredVehicle = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM vehicle WHERE vehicle_name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getVehicleByCategory = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM vehicle WHERE category_id = ${condition.category} ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getCountVehicle = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as total FROM vehicle WHERE vehicle_name LIKE "%${condition.search}%"`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getCountVehicleByCategory = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as total FROM vehicle WHERE category_id = ${condition.category}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.updateVehicle = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    db.query(`UPDATE vehicle SET ${keys.map((key, index) => `${key} = "${values[index]}"`)} WHERE id = ${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM vehicle WHERE id=${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}