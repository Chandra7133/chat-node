const { hashPassword, checkPassword } = require("@cs7player/scrap-node-lib").pbkdf
const { getObjectId, mongoHelper } = require("../mongoose")

exports.hashPassword = async (password) => {
 try {
  const hashedPassword = await hashPassword(password)
  return hashedPassword
 } catch (error) {
  throw error
 }
}

exports.checkPassword = async (password, hashedPassword) => {
 try {
  const isValid = await checkPassword(password, hashedPassword)
  return isValid
 } catch (error) {
  throw error
 }
}

exports.getObjectId = (id) => {
 try {
  const objectId = getObjectId(id)
  return objectId
 } catch (error) {
  throw error
 }
}

exports.dateToString = (key, format, timezone = TIMEZONE) => {
 return mongoHelper.dateToString(key, format, timezone)
}

exports.getCreatedInfo = (reqParams) => {
 try {
  return {
   created_date: new Date(),
   created_by: reqParams[TOKEN_USERNAME_KEY] || "System",
   created_by_userid: reqParams[TOKEN_USERID_KEY] || "",
  };
 } catch (error) {
  throw error;
 }
};

exports.getModifiedInfo = (reqParams) => {
 try {
  return {
   modified_date: new Date(),
   modified_by: reqParams[TOKEN_USERNAME_KEY] || "System",
   modified_by_userid: reqParams[TOKEN_USERID_KEY] || "",
  };
 } catch (error) {
  throw error;
 }
};
