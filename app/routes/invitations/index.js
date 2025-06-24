const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const invitationsCtrl = require("../../controllers/invitations")

router.post("/", [
 check("sender_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid sender id'),
 check("receiver_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid receiver id')
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.invite(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/sended", [
 check("user_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid user id'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.sended(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/received", [
 check("user_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid user id'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.received(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/accept", [
 check("_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid user id'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.accept(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/decline", [
 check("_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid user id'),
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.decline(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

router.post("/unfriend", [
 check("user_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid user id'),
 check("friend_id").isAlphanumeric().isLength({ min: 24 }).withMessage('Invalid friend id')
], async (req, res, next) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() });
  }
  invitationsCtrl.unfriend(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message });
 }
})

module.exports = router;