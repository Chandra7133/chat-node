const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const msgCtrl = require("../../controllers/messages")

router.post("/msg", [
 check("sender_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid sender id'),
 check("receiver_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid receiver id'),
 check("msg").trim().isString().isLength({ min: 1 }).withMessage('Invalid Message')
 ], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await msgCtrl.messages(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/chat", [
 check("user_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid sender id'),
 check("friend_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid receiver id')
 ], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  await msgCtrl.chat(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;