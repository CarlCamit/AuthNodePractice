const express = require('express')

const { requireJWT } = require('../middleware/auth')

const Wishlist = require('../models/Wishlist')

const router = express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
    // findOne will return null over find which gives an empty array
    Wishlist.findOne({ user: req.user })
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

router.post('/products', (req, res) => {
    const attributes = req.body
    Product.create(attributes).then((product) => {
        res.status(201).json(product)
    })
    .catch((error) => {
        res.status(400).json({ error: error.message })
    })
})

router.patch("/products/:id", (req, res) => {
    const id = req.params.id
    const attributes = req.body
    Product.findByIdAndUpdate(id, attributes, { new: true })
      .then(product => {
        if (product) {
          res.status(200).json({ message: "You updated the thing!", product })
        } else {
          res.status(404).json({ error: error })
        }
      })
      .catch(error => {
        res.status(400).json({ error: error })
      })
  })

router.delete('/products/:id', (req, res) => {
    id = req.params["id"]
    Product.findByIdAndRemove(id).then((product) => {
        if (product) {
            res.status(200).json({ message: `Product with an id: ${id} was removed from the database`})
        }
        else {
            res.status(400).json({ error: `Product with the id: ${id} cannot be found`})
        }
    })
    .catch((error) => {
        res.status(404).json({ message: "Invalid ID"})
    })
})


module.exports = router