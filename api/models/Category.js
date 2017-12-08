const mongoose = require('./init')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, unique: true },
    // Products that belong to this wishlist
    products: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category