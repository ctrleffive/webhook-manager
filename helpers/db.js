const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}

let conn = null

module.exports = async () => {
  if (conn) {
    return conn
  }
  conn = mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await conn

  // Define models
  const Outgoing = mongoose.model(
    'Outgoing',
    new Schema({
      eventName: String,
      schemaOptions,
    })
  )

  return {
    Outgoing,
  }
}
