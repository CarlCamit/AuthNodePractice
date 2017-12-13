const express = require("express")

const {requireJWT} = require("../middleware/auth")

const Product = require("../models/Product")

const router = express.Router()

router.get("/products", (req, res) => {
  Product.find()
    .then(products => {
      res.json(products)
    })
    .catch(error => {
      res.json({ error: error.message })
    })
})

router.post("/products", requireJWT, (req, res) => {
  const attributes = req.body
  Product.create(attributes)
    .then(product => {
      res.status(201).json(product)
    })
    .catch(error => {
      res.status(400).json({ error: error.message })
    })
})

router.patch("/products/:id", requireJWT, (req, res) => {
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

router.delete("/products/:id", requireJWT, (req, res) => {
  id = req.params["id"]
  Product.findByIdAndRemove(id)
    .then(product => {
      if (product) {
        res
          .status(200)
          .json({
            message: `Product with an id: ${id} was removed from the database`
          })
      } else {
        res
          .status(400)
          .json({ error: `Product with the id: ${id} cannot be found` })
      }
    })
    .catch(error => {
      res.status(404).json({ message: "Invalid ID" })
    })
})

module.exports = router
