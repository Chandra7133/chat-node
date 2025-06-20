const { verifyToken } = require("../utils/jwt");

exports.authCheck = async (req, res, next) => {
 try {
  const method = req.method.toUpperCase();
  const path = req.path.replace(/\/+$/, ''); // Trim trailing slashes
  const pathSegments = path.split('/').filter(Boolean);
  // Skip for login or registration routes
  if (pathSegments.includes('health-check')) return next();
  if (pathSegments.includes('login')) return next();
  // Extract token from Authorization header
  let token = req.header('Authorization');
  if (!token) return res.status(AUTH_ERROR_CODE).send('Access denied. No token provided.');
  // Handle "Bearer <token>" format
  if (token.startsWith('Bearer ')) token = token.slice(7).trim();
  // Verify token
  const tokenRes = verifyToken(token);
  if (!tokenRes.status) return res.status(AUTH_ERROR_CODE).send(tokenRes.msg);
  const decoded = tokenRes.decoded;
  // Attach decoded user info to request body
  req.body[TOKEN_USER_DATA_KEY] = decoded;
  req.body[TOKEN_USERID_KEY] = decoded[USER_ID_KEY] || null;
  req.body[TOKEN_USERNAME_KEY] = decoded[USER_NAME_KEY] || null;
  next();
 } catch (error) {
  console.error("Auth Middleware Error:", error);
  res.status(SERVER_ERROR_CODE).send("Internal Server Error");
 }
};
