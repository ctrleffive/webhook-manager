const mongoose = require('mongoose')
const normalize = require('normalize-mongoose')
const Schema = mongoose.Schema

const modelSchema = new Schema(
  {
    uId: Schema.Types.String,
    method: Schema.Types.Number,
    headers: Schema.Types.String,
    payload: Schema.Types.String,
    eventName: Schema.Types.String,
  },
  { timestamps: true }
)
modelSchema.plugin(normalize)

module.exports = mongoose.model('Notification', modelSchema)
