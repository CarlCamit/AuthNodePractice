const Product = require('./Product')
// const User = require('./User')
const Wishlist = require('./Wishlist')

Product.deleteMany()
    .then(() => {
        console.log("Dropped all products")
        process.exit()
    })

// User.deleteMany()
//     .then(() => {
//         console.log("Dropped all products")
//         process.exit()
//     })

Wishlist.deleteMany()
    .then(() => {
        console.log("Dropped all products")
        process.exit()
    })