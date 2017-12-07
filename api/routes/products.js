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