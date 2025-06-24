const invitationsMdl = require("../../models/invitations")

exports.invite = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await invitationsMdl.invite(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": result["acknowledged"] || false, "msg": result["msg"] || "Request sent successfully." })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.sended = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await invitationsMdl.sended(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.received = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await invitationsMdl.received(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.accept = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await invitationsMdl.accept(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}

exports.decline = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await invitationsMdl.decline(reqParams)
  res.status(SUCCESS_CODE).json({ "status": true, "data": result })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ "status": false, "msg": SERVER_ERROR_MESSAGE })
 }
}