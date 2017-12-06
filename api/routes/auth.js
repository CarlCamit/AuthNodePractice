const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.post('/auth/register', 
    authMiddleware.register,
    (req, res) => {
        res.json({
            user: req.user
        })
    }
)

router.post('/auth/signin',
    // Middleware to handle the sign in
    authMiddleware.signIn,
    // JSON handler
    authMiddleware.signJWTForUser
)

module.exports = router