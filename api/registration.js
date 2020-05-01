const firebase = require('../helpers/firebase')
const dbConnection = require('../helpers/db')

module.exports = async (req, res) => {
  try {
    const body = JSON.parse(req.body)

    const admin = firebase()
    const decodedToken = await admin.auth().verifyIdToken(body.idToken)

    if (decodedToken.exp > Date.now()) throw Error('Token expired!')
    const uid = decodedToken.uid
    const token = body.token

    const db = await dbConnection()
    const existingItem = await db.Device.findOneAndUpdate({ uid }, { token })
    if (!existingItem) await db.Device.create({ uid, token })

    res.json({ success: true })
  } catch (error) {
    res.json({ error: error.message, code: error.code })
  }
}
