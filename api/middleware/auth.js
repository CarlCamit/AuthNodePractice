const User = require('../models/User')

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

module.exports = {
    register
}