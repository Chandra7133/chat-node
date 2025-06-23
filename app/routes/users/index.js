const router = require("express").Router()
const { check, validationResult } = require('express-validator')
const usersCtrl = require("../../controllers/users")

router.post("/details", [], (req, res) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  }
  usersCtrl.getUsers(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})
router.post("/paging", [], (req, res) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  }
  usersCtrl.paging(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})
module.exports = router