const { mongoQuery, mongoObjId } = require("@cs7player/login-lib");

exports.messages = async (reqParams) => {
 try {
  const sender_id = mongoObjId(reqParams['sender_id']);
  const receiver_id = mongoObjId(reqParams['receiver_id']);
  const msg = reqParams.msg;
  const is_seen = 0;
  const created_at = new Date();
  const result = await mongoQuery.insertOne(MESSAGES, { sender_id, receiver_id, msg, is_seen, created_at })
  return result
 } catch (error) {
  throw error
 }
}

exports.chat = async (reqParams) => {
 try {
  const user_id = mongoObjId(reqParams['user_id']);
  const friend_id = mongoObjId(reqParams['friend_id']);
  let pipeline = [
   {
    $match: {
     $or: [
      { $and: [{ "sender_id": user_id }, { "receiver_id": friend_id }] },
      { $and: [{ "receiver_id": user_id }, { "sender_id": friend_id }] },
     ]
    }
   },
   { $sort: { created_at: -1 } }
  ]
  const result = await mongoQuery.getDetails(MESSAGES, pipeline)
  return result
 } catch (error) {
  throw error
 }
}