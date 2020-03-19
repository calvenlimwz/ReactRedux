const mongoose = require('mongoose');
const UserSchema = require('./User');
const { Schema } = mongoose;

const answerSchema = new Schema({
  _byuser: UserSchema,
  body: String,
  upvote: { type: Number, default: 0 },
  upvotelist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvote: { type: Number, default: 0 },
  downvotelist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dateCreated: Date
})

module.exports = answerSchema;
