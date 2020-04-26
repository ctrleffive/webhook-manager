// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

let cachedDb = null

module.exports = async () => {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  const db = await client.db(url.parse(uri).pathname.substr(1))

  cachedDb = db
  return db
}
