const mongoose = require('mongoose')

// Models
const Device = require('../models/device')
const Outgoing = require('../models/outgoing')
const Incoming = require('../models/incoming')
const Notification = require('../models/notification')

let conn = null

module.exports = async () => {
  if (!conn) {
    conn = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  await conn

  return { Device, Outgoing, Incoming, Notification }
}
