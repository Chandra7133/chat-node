const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const msgCtrl = require("../../controllers/messages")

router.post("/msg", [
 check("receiver_id").isMongoId().withMessage("Invalid receiver id"),
 check("msg").trim().isString().isLength({ min: 1 }).withMessage("Invalid Message")
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  msgCtrl.messages(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

router.post("/chat", [
 check("friend_id").isMongoId().withMessage("Invalid friend id")
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  msgCtrl.chat(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

router.post("/seen", [
 check("friend_id").isMongoId().withMessage("Invalid friend id"),
 check("msg_ids").isArray().withMessage("msg_ids must be an array"),
 check("msg_ids.*").isMongoId().withMessage("Invalid msg id"),
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  msgCtrl.seen(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

router.post("/dashboard", [
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  msgCtrl.dashBoard(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

module.exports = router