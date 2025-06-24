const { mongoQuery, mongoObjId } = require("@cs7player/login-lib")

exports.updateUser = async (reqParams) => {
 try {
  const updateObj = {}
  if ("username" in reqParams) updateObj["username"] = reqParams["username"]
  if ("gender_id" in reqParams) updateObj["gender_id"] = reqParams["gender_id"]
  if ("gender_name" in reqParams) updateObj["gender_name"] = reqParams["gender_name"]
  if ("about" in reqParams) updateObj["about"] = reqParams["about"]
  if ("is_verified" in reqParams) updateObj["is_verified"] = reqParams["is_verified"]
  updateObj["updated_at"] = new Date()
  const whr = { "_id": mongoObjId(reqParams["user_id"]) }
  const result = await mongoQuery.updateOne(USERS, whr, updateObj)
  return result
 } catch (error) {
  throw error
 }
}

exports.getUsers = async (reqParams) => {
 try {
  const whr = {}
  if ("user_id" in reqParams) whr["_id"] = mongoObjId(reqParams["user_id"])
  if ("email" in reqParams) whr["email"] = reqParams["email"]
  let searchKey = "";
  if ("username" in reqParams) searchKey = reqParams['username'].trim();
  if (searchKey !== "") {
   whr['username'] = new RegExp(searchKey, "i")
  }
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
  const { page = 1, limit = 10, username, isNeedPwd = true } = reqParams
  const skip = (page - 1) * limit
  let searchKey = "";
  if ("username" in reqParams) searchKey = reqParams['username'].trim();
  if (searchKey !== "") {
   whr['username'] = new RegExp(searchKey, "i")
  }
  const pipeline = [
   { $skip: skip },
   { $limit: limit }
  ]
  if (!isNeedPwd) {
   pipeline.push({
    $project: {
     password: 0
    }
   })
  }
  const result = await mongoQuery.getDetails(USERS, pipeline)
  return { "data": result, "count": result.length }
 } catch (error) {
  throw error
 }
}

exports.others = async (reqParams) => {
 try {
  let user_id = mongoObjId(reqParams['user_id']);
  let username = reqParams['search_text'] || "";
  const userData = await mongoQuery.getDetails(FRIENDS, [{ $match: { user_id } }]);
  const friends_list = userData[0]['friends']
  friends_list.push(user_id);
  let pipeline = [
   {
    $match: {
     _id: { $nin: friends_list },
     username: { $regex: username, $options: "i" }
    }
   },
   {
    $project: {
     password: 0,
     is_verified: 0
    }
   },
   {
    $sort: { username: 1 }
   }
  ]
  const result = await mongoQuery.getDetails(USERS, pipeline)
  return { "data": result, "count": result.length }
 } catch (error) {
  throw error
 }
}