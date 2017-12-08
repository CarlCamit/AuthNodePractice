import React from 'react'

function ProductTable({
    title,
    products,
    onEditProduct,
    onDeleteProduct,
    onAddProductToWishlist,
    onRemoveProductFromWishlist
}) {
    return (
        <div>
            <h1>{ title }</h1>
            <table>
                <thead>
                <tr>
                    <th>Brand Name</th>
                    <th>Product Name</th>
                    <th>Delete Product</th>
                </tr>
                </thead>
                <tbody>
                { products.map((product, index) => (
                    <tr key={"product" + index}>
                        <td>{ product.brandName }</td>
                        <td>{ product.name }</td>
                        <td>
                            <button
                                onClick={ () => {
                                    onDeleteProduct({ id: product._id })
                                }}
                            >
                                {'Delete'}
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={ () => {
                                    onAddProductToWishlist({ id: product._id })
                                }}
                            >
                                {'Add To Wishlist'}
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={ () => {
                                    onRemoveProductFromWishlist({ id: product._id })
                                }}
                            >
                                {'Remove From Wishlist'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable