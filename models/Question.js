const mongoose = require('mongoose');
const { Schema } = mongoose;
const AnswerSchema = require('./Answer');
const TagSchema = require('./Tag');
const UserSchema = require('./User');
const questionSchema = new Schema({
  title: String,
  tags: [String],
  answers: [AnswerSchema],
  _byuser: UserSchema,
  selectedanswer: { type: Schema.Types.ObjectId},
  answered: { type: Boolean, default: false },
  answerno: { type: Number, default: 0},
  upvote: { type: Number, default: 0 },
  upvotelist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvote: { type: Number, default: 0 },
  downvotelist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0},
  dateCreated: Date,
  lastResponded: Date
});

mongoose.model('questions', questionSchema);
