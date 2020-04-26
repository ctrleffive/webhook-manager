// const dbConnection = require('../helpers/db')
const firebase = require('../helpers/firebase')

module.exports = async (req, res) => {
  const admin = firebase()
  // const db = await dbConnection()

  console.log((await admin).SDK_VERSION)

  res.status(200).json({})
  // const collection = await db.collection('outgoings')
  // const users = await collection.find({}).toArray()
}
