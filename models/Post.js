const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
  author: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Post', postSchema);
