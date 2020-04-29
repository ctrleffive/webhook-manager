const mongoose = require('mongoose')
const normalize = require('normalize-mongoose')
const Schema = mongoose.Schema

const modelSchema = new Schema(
  {
    uId: Schema.Types.String,
    url: Schema.Types.String,
    eventName: Schema.Types.String,
  },
  { timestamps: true }
)
modelSchema.plugin(normalize)

module.exports = mongoose.model('Incoming', modelSchema)
