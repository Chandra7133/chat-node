const mongoQuery = require("@cs7player/login-lib").mongoQuery;

exports.getUsers = async (reqParams) => {
 try {
  const { username, isPassword = true } = reqParams;
  const pipeline = [
   {
    $project: {
     password: 0
    }
   }
  ];
  const result = await mongoQuery.getDetails(USERS, isPassword ? [] : pipeline);
  return result;
 } catch (error) {
  throw error;
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