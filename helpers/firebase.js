const admin = require('firebase-admin')
const serviceAccount = require('../firebase.json')

let firebaseInitialized = false

module.exports = async () => {
  if (!firebaseInitialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://webhook-manager.firebaseio.com',
    })
    firebaseInitialized = true
  }
  return admin
}
