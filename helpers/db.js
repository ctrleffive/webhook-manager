const mongoose = require('mongoose')

// Models
const Outgoing = require('../models/outgoing')
const Incoming = require('../models/incoming')
const Notification = require('../models/notification')

module.exports = async () => {
  const conn = mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await conn

  return { Outgoing, Incoming, Notification }
}
