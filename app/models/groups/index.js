const { mongoQuery, mongoObjId } = require("@cs7player/login-lib")

exports.create = async (reqParams) => {
 try {
  const groupname = reqParams["groupname"];
  const created_by = mongoObjId(reqParams["user_id"]);
  const members = [created_by];
  const admins = [created_by];
  const created_at = new Date();
  const result = await mongoQuery.insertOne(GROUPS, { groupname,admins, members, created_by, created_at })
  return result || []
 } catch (error) {
  throw error
 }
}

exports.add = async (reqParams) => {
 try {
  const group_id = mongoObjId(reqParams["group_id"]);
  const isAdmin = reqParams["is_admin"] || 0;
  const members = reqParams["friends_ids"].map(m => mongoObjId(m));
  const admins = reqParams["admin_ids"].map(m => mongoObjId(m));
  let update = { members };
  if(isAdmin == 1){
   update = { admins };
  }
  const result = await mongoQuery.updateOne(GROUPS,{"_id":group_id},update);
  return result || []
 } catch (error) {
  throw error
 }
}

exports.friends = async (reqParams) => {
 try {
  const group_id = mongoObjId(reqParams["group_id"]);
  const user_id = mongoObjId(reqParams["user_id"]);
  const friends_arr = await mongoQuery.getDetails(FRIENDS, [{ $match: { user_id } }, { $project: { "_id": 0, "user_id": 0 } }])
  const FriendIds = friends_arr[0]?.friends || [];
  let pipeline = [
   { $match: { "_id" : group_id } },
   {
    $$lookup: {
     from: USERS,
     localField: "members",
     foreignField: "_id",
     as: "joinedData"
    }
   }
  ]
  const result = await mongoQuery.getDetails(GROUPS, pipeline)
  return result || []
 } catch (error) {
  throw error
 }
}
