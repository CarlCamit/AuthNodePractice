// const Product = require('./Product')
const User = require('./User')

// Product.deleteMany()
//     .then(() => {
//         console.log("Dropped all products")
//         process.exit()
//     })

User.deleteMany()
    .then(() => {
        console.log("Dropped all products")
        process.exit()
    })