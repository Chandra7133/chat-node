const { mongoQuery, mongoObjId } = require("@cs7player/login-lib");

exports.getUsers = async (reqParams) => {
 try {
  const whr = {}
  if ("user_id" in reqParams) whr["_id"] = mongoObjId(reqParams["user_id"])
  if ("email" in reqParams) whr["email"] = reqParams["email"]
  const isNeedPwd = reqParams["is_need_password"] || 0

  const pipeline = [
   { $match: whr },
   { $addFields: { user_id: "$_id" } },
   {
    $project: {
     _id: 0,
     password: 0
    }
   }
  ]
  const result = await mongoQuery.getDetails(USERS, pipeline)
  return result
 } catch (error) {
  throw error
 }
}
exports.paging = async (reqParams) => {
 try {
  const { page = 1, limit = 10, username, isPassword = true } = reqParams;
  const skip = (page - 1) * limit;
  const pipeline = [
   { $skip: skip },
   { $limit: limit }
  ];
  if (!isPassword) {
   pipeline.push({
    $project: {
     password: 0
    }
   });
  }
  const result = await mongoQuery.getDetails(USERS, pipeline);
  return { "data": result, "count": result.length };
 } catch (error) {
  throw error;
 }
}