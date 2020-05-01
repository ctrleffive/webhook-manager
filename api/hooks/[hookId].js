const firebase = require('../../helpers/firebase')
const dbConnection = require('../../helpers/db')

const methods = ['get', 'put', 'post', 'patch', 'delete', 'option']

module.exports = async (req, res) => {
  try {
    const admin = firebase()
    const db = await dbConnection()

    const incomingData = await db.Incoming.findOne({ hookId: req.query.hookId })

    if (!incomingData) throw Error('No event found!')

    const data = await db.Notification.create({
      uid: incomingData.uid,
      eventName: incomingData.eventName,
      method: methods.indexOf(req.method.toLowerCase()),
      payload: JSON.stringify(req.body),
      headers: JSON.stringify(req.headers),
    })

    const device = await db.Device.find({ uid: incomingData.uid })

    if (device) {
      await admin.messaging().sendMulticast({
        token: device.token,
        data: { notification: JSON.stringify(data) },
        notification: {
          title: `Webhook ${incomingData.eventName} called!`,
          body: `Webhook called with a ${req.method.toUpperCase()} request. Open app for more details.`,
        },
      })
    }

    res.json({ success: true })
  } catch (error) {
    res.json({ error: error.message, code: error.code })
  }
}
