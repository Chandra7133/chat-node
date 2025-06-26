const { mongoQuery, mongoObjId } = require("@cs7player/login-lib")

exports.msg = async (reqParams) => {
 try {
  const group_id = reqParams["group_id"];
  const msg = reqParams["msg"];
  const texted_by = mongoObjId(reqParams["user_id"]);
  const seen_by = [texted_by];
  const created_at = new Date();
  const result = await mongoQuery.insertOne(GROUPS_MSG, { group_id, msg, texted_by, seen_by, created_at })
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.chat = async (reqParams) => {
 try {
  const group_id = reqParams["group_id"];
  const user_id = mongoObjId(reqParams["user_id"]);
  let pipeline = [
   { $match: { group_id } },
   {
    $lookup: {
     from: USERS,
     localField: "texted_by",
     foreignField: "_id",
     as: "joinedData"
    }
   },
   { $unwind: "$joinedData" },
   { $addFields: { "username": "$joinedData.username" } },
   { $project: { msg: 1, texted_by: 1, username: 1, created_at: 1 } },
   { $sort: { created_at: -1 } }
  ]
  const result = await mongoQuery.getDetails(GROUPS_MSG, pipeline)
  const filter = { group_id, seen_by: { $nin: [user_id] } }
  const update = { $addToSet: { seen_by: user_id } }
  await mongoQuery.updateMany(GROUPS_MSG, filter, update, 0)
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.dashboard = async (reqParams) => {
 try {
  const user_id = mongoObjId(reqParams["user_id"]);
  let pipeline = [
   { $match: { members: user_id } },
  ]
  const result = await mongoQuery.getDetails(GROUPS, pipeline)
  return result || [];
 } catch (error) {
  throw error
 }
}