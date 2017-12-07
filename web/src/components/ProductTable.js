import React from 'react'

function ProductTable({
    products,
    onDeleteProduct
}) {
    return (
        <div>
            <h1>Products</h1>
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
                                    onDeleteProduct({ id: product._id, index: index })
                                }}
                            >
                                {'DELETE'}
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