const express = require('express')

const { requireJWT } = require('../middleware/auth')

const Wishlist = require('../models/Wishlist')

const router = express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
    // findOne will return null over find which gives an empty array
    Wishlist.findOne({ user: req.user })
        .populate('products')
        .then((wishlist) => {
            if (wishlist) {
                res.json({ products: wishlist.products })
            }
            else {
                // No wishlist yet so not an error, return empty array for wishlist
                res.json({ products: [] })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
})

router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
    const { productID } = req.params
    Wishlist.findOneAndUpdate(
        // Find the wishlist for the user
        { user: req.user }, 
        // Make these changes
        { $addToSet: { products: productID }}, 
        // Options when updating, upsert (update if exist // insert)
        { upsert: true, new: true, runValidators: true })
            .populate('products')
            .then((wishlist) => {
                res.json({ products: wishlist.products })
            })
            .catch((error) => {
                res.status(400).json({ error: error.message })
            })
})

// Remove product from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
    const { productID } = req.params
    Wishlist.findOneAndUpdate(
        // Find the wishlist for the user
        { user: req.user }, 
        // Make these changes
        { $pull: { products: productID }}, 
        // Options when updating, upsert (update if exist // insert)
        { upsert: true, new: true, runValidators: true })
            .populate('products')
            .then((wishlist) => {
                res.json({ products: wishlist.products })
            })
            .catch((error) => {
                res.status(400).json({ error: error.message })
            })
})


module.exports = router