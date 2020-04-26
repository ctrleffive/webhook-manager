const dbConnection = require('../helpers/db')

module.exports = async (req, res) => {
  const db = await dbConnection()

  const collection = await db.collection('users')

  const users = await collection.find({}).toArray()

  res.status(200).json({ users })
}
