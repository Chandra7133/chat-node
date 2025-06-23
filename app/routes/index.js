const router = require("express").Router()
const login = require("./login")
const users = require("./users")
const invitations = require("./invitations")

router.use("/login", login)
router.use("/users", users)
router.use("/invitations", invitations)

router.get("/", (req, res) => {
 res.status(200).json({ message: "Welcome to the API" })
})

router.get("/health-check", (req, res) => {
 res.status(200).json({ status: "ok", message: "Server is up and running" })
})

module.exports = router