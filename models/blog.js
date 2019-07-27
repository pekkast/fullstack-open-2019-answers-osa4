const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number
});

blogSchema.set('toJSON', {
  transform: doc => ({
    // eslint-disable-next-line no-underscore-dangle
    id: doc._id.toString(),
    title: doc.title,
    author: doc.author,
    url: doc.url,
    likes: doc.likes,
  }),
});

module.exports = mongoose.model('Blog', blogSchema);
