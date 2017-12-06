const Product = require('./Product')

Product.create([
    {
        brandName: "Konami",
        name: "Yu-Gi-Oh!"
    },
    {
        brandName: "Wizards of the Coast",
        name: "Magic the Gathering"
    },
    {
        brandName: "Sony",
        name: "Playstation 4"
    },
    {
        brandName: "Microsoft",
        name: "XBOX ONE"
    },
    {
        brandName: "Nintendo",
        name: "Nintendo Switch"
    }
])
.then((products) => {
    console.log(products)
})