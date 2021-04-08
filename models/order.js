const db = require("../helper/db")

exports.createNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO order_history (${Object.keys(data)}) VALUES (${Object.values(data).map(item => `"${item}"`)})`, (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM order_history WHERE id = ${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result[0])
    })
  })
}

exports.getOrderHistory = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM order_history WHERE user_id = ${condition.id} ORDER BY created_at ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.getCountHistory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as total FROM order_history WHERE user_id = ${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.updateOrder = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    db.query(`UPDATE order_history SET ${keys.map((key, index) => `${key} = "${values[index]}"`)} WHERE id = ${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM order_history WHERE id=${id}`, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}