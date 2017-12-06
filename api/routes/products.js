const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.get('/products', (req, res) => {
    Product.find().then((products) => {
        res.json(products)
    })
    .catch((error) => {
        res.json({ error: error.message })
    })
})

module.exports = router