const mongoose = require('mongoose')

const Product = mongoose.model("Product", {
    brandName: String,
    name: String
})

export default Product