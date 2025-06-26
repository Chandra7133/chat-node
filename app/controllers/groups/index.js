const groupsMdl = require("../../models/groups")

exports.create = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await groupsMdl.create(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": result["acknowledged"] || false, "msg": result["msg"] || "Group Created Successfully." })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.add = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await groupsMdl.add(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": result["acknowledged"] || false, "msg": result["msg"] || "Success" })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.friends = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await groupsMdl.friends(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": result["acknowledged"] || false, "msg": result["msg"] || "Success" })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}