const firebase = require('../helpers/firebase')
const dbConnection = require('../helpers/db')

module.exports = async (req, res) => {
  try {
    const { body } = req

    const admin = firebase()
    const decodedToken = await admin.auth().verifyIdToken(body.idToken)

    const now = Date.now()
    if (decodedToken.exp > Date.now()) throw Error('Token expired!')

    const db = await dbConnection()

    const outgoings = await db.Outgoing.find()

    res.json({ syncTime: now, outgoings })
  } catch (error) {
    res.json({ error: error.message, code: error.code })
  }
}
