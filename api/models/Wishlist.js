const mongoose = require('./init')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    // Specific type for object id
    // Has one user 
    user: { type: Schema.ObjectId, ref: 'User', unique: true },
    // Products that belong to this wishlist
    products: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)

module.exports = Wishlist