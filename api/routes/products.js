const express = require('express')

const authMiddleware = require('../middleware/auth')

const Product = require('../models/Product')

const router = express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
    Product.find().then((products) => {
        res.json(products)
    })
    .catch((error) => {
        res.json({ error: error.message })
    })
})

module.exports = router