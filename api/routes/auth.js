const express = require("express")

const User = require("../models/User")

const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/auth", (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.json({ error: error.message })
    })
})

router.post(
  "/auth/register",
  authMiddleware.register,
  authMiddleware.signIn,
  authMiddleware.signJWTForUser
)

router.post(
  "/auth/signin",
  // Middleware to handle the sign in
  authMiddleware.signIn,
  // JSON handler
  authMiddleware.signJWTForUser
)

module.exports = router
