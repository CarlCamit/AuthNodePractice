const Product = require('./Product')

Product.deleteMany()
    .then(() => {
        console.log("Dropped all products")
        process.exit()
    })