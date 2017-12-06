const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true,
    session: false // Using JSONWebTokens instead of sessions
})

const User = mongoose.model('User', userSchema)

module.exports = User