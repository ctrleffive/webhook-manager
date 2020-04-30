const firebase = require('../helpers/firebase')
const dbConnection = require('../helpers/db')

module.exports = async (req, res) => {
  try {
    const body = JSON.parse(req.body)

    const admin = firebase()
    const decodedToken = await admin.auth().verifyIdToken(body.idToken)

    if (decodedToken.exp > Date.now()) throw Error('Token expired!')
    const uid = decodedToken.uid

    const db = await dbConnection()

    for (const outgoing of body.outgoings) {
      const id = outgoing.id
      if (outgoing.deleted) {
        await db.Outgoing.findByIdAndDelete(id)
      } else if (id) {
        await db.Outgoing.findByIdAndUpdate(id, outgoing)
      } else {
        outgoing.uid = uid
        await db.Outgoing.create(outgoing)
      }
    }

    for (const incoming of body.incomings) {
      const id = incoming.id
      if (incoming.deleted) {
        await db.Incoming.findByIdAndDelete(id)
      } else if (id) {
        await db.Incoming.findByIdAndUpdate(id, incoming)
      } else {
        incoming.uid = uid
        await db.Incoming.create(incoming)
      }
    }

    for (const notification of body.notifications) {
      if (notification.deleted) {
        await db.Incoming.findByIdAndDelete(notification.id)
      }
    }

    const syncTime = new Date()
    const outgoings = (
      await db.Outgoing.find({
        updatedAt: { $gte: new Date(body.lastSync) },
        uid,
      })
    ).filter((item) => {
      return !body.outgoings
        .map((innerItem) => innerItem.eventName)
        .includes(item.eventName)
    })

    const incomings = (
      await db.Incoming.find({
        updatedAt: { $gte: new Date(body.lastSync) },
        uid,
      })
    ).filter((item) => {
      return !body.incomings
        .map((innerItem) => innerItem.eventName)
        .includes(item.eventName)
    })

    const notifications = await db.Notification.find({
      updatedAt: { $gte: new Date(body.lastSync) },
      uid,
    })

    res.json({ syncTime, outgoings, incomings, notifications })
  } catch (error) {
    res.json({ error: error.message, code: error.code })
  }
}
