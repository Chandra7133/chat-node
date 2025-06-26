const e = require("express")
const msgMdl = require("../../models/messages")

exports.messages = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await msgMdl.messages(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": true, "data": result || [] })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ status: false, msg: SERVER_ERROR_MESSAGE })
 }
}

exports.chat = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await msgMdl.chat(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": true, "data": result || [] })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ status: false, msg: SERVER_ERROR_MESSAGE })
 }
}

exports.seen = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await msgMdl.seen(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": true, "data": result || [] })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ status: false, msg: SERVER_ERROR_MESSAGE })
 }
}

exports.dashBoard = async (req, res) => {
 try {
  const reqParams = req["body"] || {}
  const result = await msgMdl.dashBoard(reqParams)
  res.status(result["status"] || SUCCESS_CODE).json({ "status": true, "data": result || [] })
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ status: false, msg: SERVER_ERROR_MESSAGE })
 }
}