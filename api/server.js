const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

// Initialize express instance
const server = express()

// JSON parser middleware
server.use(cors())
server.use(bodyParser.json())
server.use(authMiddleware.initialize)

// Routes
server.use('/', [
    require('./routes/products'),
    require('./routes/auth'),
    require('./routes/wishlist')
])

// Console log to ensure server is started or display errors
server.listen(7000, error => {
    if (error) {
        console.log("Error detected", error)
    }
    else {
        console.log("Server started at http://localhost:7000")
    }
})