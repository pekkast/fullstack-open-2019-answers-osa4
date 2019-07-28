const bcrypt = require('bcrypt');

const hash = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const validate = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hash, validate };
