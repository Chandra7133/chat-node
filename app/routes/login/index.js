const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const loginCtrl = require("../../controllers/login")

router.post("/sign-up", [
 check("username").isLength({ min: 6 }).withMessage("username must be at least 6 characters long"),
 check("email").isEmail().withMessage("Invalid email format"),
 check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  await loginCtrl.signUp(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

router.post("/", [
 check("email").isEmail().withMessage("Invalid email format"),
 check("password").isLength({ min: 1 }).withMessage("Invalid Password")
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  await loginCtrl.login(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

router.put("/", [
 check("email").isEmail().withMessage("Invalid email format"),
 check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], async (req, res, next) => {
 try {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ errors: errors.array() })
  await loginCtrl.forgetPassword(req, res)
 } catch (error) {
  res.status(SERVER_ERROR_CODE).json({ message: error.message })
 }
})

module.exports = router