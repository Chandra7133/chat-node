const dbHelper = require("../../utils/db-helper")
const { checkPassword, hashPassword } = require("../../utils/helper")
const { generateToken } = require("../../utils/jwt")

exports.signUp = async (reqParams) => {
 try {
  let { username, email, password } = reqParams;
  let usernameDetails = await checkUsername(username);
  if (usernameDetails.length > 0) {
   return { 'status': DUPLICATE_ENTRY_CODE, 'msg': "Username already Exists!!!" };
  }
  let emailDetails = await checkEmail(email);
  if (emailDetails.length > 0) {
   return { 'status': DUPLICATE_ENTRY_CODE, 'msg': "Email alreadt Exists!!!" };
  }
  password = await hashPassword(password);
  created_at = new Date();
  const result = await dbHelper.insertOne(USERS, { username, email, password, created_at });
  return result;
 } catch (error) {
  throw error
 }
}

checkUsername = async (username) => {
 try {
  const result = await dbHelper.getDetails(USERS, [{ $match: { username } }]);
  return result;
 } catch (error) {
  throw error
 }
}

checkEmail = async (email) => {
 try {
  const result = await dbHelper.getDetails(USERS, [{ $match: { email } }]);
  return result;
 } catch (error) {
  throw error
 }
}

exports.forgetPassword = async (reqParams) => {
 try {
  let { email, password } = reqParams;
  let userData = await checkEmail(email);
  if (userData.length == 0) {
   return { 'status': NOT_FOUND_CODE, 'msg': "No account found!!!" };
  }
  let _id = userData[0]['_id'];
  password = await hashPassword(password);
  let result = await dbHelper.updateOne(USERS, { _id }, { password });
  return result;
 } catch (error) {
  throw error
 }
}

exports.login = async (reqParams) => {
 try {
  let { email, password } = reqParams;
  let userData = await checkEmail(email);
  if (userData.length == 0) {
   return { 'status': NOT_FOUND_CODE, 'msg': "No account found!!!" };
  }
  const userPwd = userData[0]["password"]
  const checkPwdStatus = await checkPassword(password, userPwd)
  if (checkPwdStatus == false) {
   return { "status": AUTH_ERROR_CODE, "msg": "Incorrect password" }
  }
  delete userData[0]["password"]
  const tokenRes = generateToken(userData[0])
  if (tokenRes.status) return { "msg": "Login successful", "data": userData[0], "token": tokenRes["token"] };
  else return { "msg": tokenRes['msg'], "status": tokenRes["status_code"] };
 } catch (error) {
  throw error
 }
}