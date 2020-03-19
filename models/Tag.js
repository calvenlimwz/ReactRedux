const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  _qid: {type: Schema.Types.ObjectId, ref: 'Question'},
  tag: String
})

module.exports = tagSchema;
