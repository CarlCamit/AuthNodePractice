const passport = require('passport')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')

const jwtSecret = 'pYvlhzT5GnLeNKdPUVFFC5dgaVNVEM64W+NtdNaS++dtv9j6FbRpnuzhRFyMfCZb'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
    // Make a new user
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    User.register(user, req.body.password, (error, user) => {
        if (error) {
            next(error)
            return
        }
        // Store user so we can acces it in out handler
        req.user = user
        next()
    })
}

function signJWTForUser(req, res) {
    const user = req.user
    const token = jsonwebtoken.sign(
        // Header is automatically given
        // Payload
        {
            email: user.email
        },
        // Secret
        jwtSecret,
        {
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpiresIn,
            subject: user._id.toString()
        }
    )
    res.json({ token })
}

module.exports = {
    initialize: passport.initialize(),
    register,
    signIn: passport.authenticate('local', { session: false }),
    signJWTForUser
}