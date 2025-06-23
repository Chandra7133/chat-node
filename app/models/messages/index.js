const { mongoQuery, mongoObjId } = require("@cs7player/login-lib");

exports.messages = async (reqParams) => {
 try {
  const whr = {}
  const sender_id = mongoObjId(reqParams['sender_id']);
  const receiver_id = mongoObjId(reqParams['receiver_id']);
  const msg = reqParams.msg;
  const created_at = new Date();
  const result = await mongoQuery.insertOne(MESSAGES, {sender_id, receiver_id, msg, created_at})
  return result
 } catch (error) {
  throw error
 }
}