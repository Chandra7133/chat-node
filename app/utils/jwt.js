const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_default_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_TIME || '1h';

const generateToken = (payload) => {
 try {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { status: true, token };
 } catch (err) {
  return { status: false, msg: err.message, status_code: SERVER_ERROR_CODE };
 }
}

const verifyToken = (token) => {
 try {
  const decoded = jwt.verify(token, JWT_SECRET);
  return { status: true, decoded };
 } catch (err) {
  return { status: false, msg: err.message, status_code: AUTH_ERROR_CODE };
 }
}

module.exports = {
 generateToken,
 verifyToken
}
