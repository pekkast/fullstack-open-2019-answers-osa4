const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, minlength: 3 },
  passwordHash: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: doc => ({
    // eslint-disable-next-line no-underscore-dangle
    id: doc._id.toString(),
    name: doc.name,
    username: doc.username,
  }),
});

module.exports = mongoose.model('User', userSchema);
