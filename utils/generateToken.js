const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (user) => jwt.sign({
  id: user.id,
  email: user.email,
  username: user.username
}, SECRET_KEY, { expiresIn: '1h' });
