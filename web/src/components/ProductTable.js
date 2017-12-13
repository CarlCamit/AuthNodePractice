import React, { Fragment } from "react"

function ProductTable({
  title,
  products,
  productsInWishList,
  getEditProductId,
  onEditProductId,
  onUpdateProduct,
  onDeleteProduct,
  onAddProductToWishlist,
  onRemoveProductFromWishlist
}) {
  // Wrapping a prop or a conditional statement and an element together using && causes that element to only be rendered if that prop exists. This will only work with one parent element, which means using a Fragment compenent is the best way to render multiple parent elements on the same heirarchy.
  return (
    <div>
      <h1>{title}</h1>
      <form
        // Wrapped table in a form so that a button click results in a submit action
        onSubmit={event => {
          onUpdateProduct({
            id: onEditProductId,
            brandName: event.target.elements.brandName.value,
            name: event.target.elements.name.value
          })
        }}>
        <table>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Product Name</th>
              {onUpdateProduct && <th>Edit Product</th>}
              {onDeleteProduct && <th>Delete Product</th>}
              {onAddProductToWishlist && <th>Add To Wishlist</th>}
              {onRemoveProductFromWishlist && <th>Remove From Wishlist</th>}
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => {

                // const foundProducts = productsInWishList.find((productsInWishList) => {
                //   if (productsInWishList._id === product._id) {
                //     return true
                //   }
                //   else {
                //     return false
                //   }
                // })
                // .find returns value
                // .includes returns boolean
                const inWishList = !!productsInWishList.find((productsInWishList) => {
                  return (productsInWishList._id === product._id)
                })

                return(
                  <tr key={"product" + index}>
                    {// If the prop passed to onEditProductId is not the same as the current products id then render normal data otherwise render input forms using default value to show what it currently is.
                    onEditProductId !== product._id && (
                      <Fragment>
                        <td>{product.brandName}</td>
                        <td>{product.name}</td>
                      </Fragment>
                    )}
                    {onEditProductId === product._id && (
                      <Fragment>
                        <td>
                          <input
                            type="text"
                            name="brandName"
                            defaultValue={product.brandName}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            defaultValue={product.name}
                          />
                        </td>
                      </Fragment>
                    )}
                    {onUpdateProduct && (
                      <td>
                        {onEditProductId !== product._id && (
                          <button
                            onClick={event => {
                              // Prevents default submit action on button click as a result of being wrapped in a form
                              event.preventDefault()
                              // Grab the current product id and set it as state in the App.js so we can pass it down as a prop.
                              getEditProductId({ id: product._id })
                            }}>
                            {"Edit"}
                          </button>
                        )}
                        {// No need for on click event here because button results in a submit event as a result of being wrapped in a form.
                        onEditProductId === product._id && (
                          <button>{"Update"}</button>
                        )}
                      </td>
                    )}
                    {onDeleteProduct && (
                      <td>
                        <button
                          onClick={() => {
                            onDeleteProduct({ id: product._id })
                          }}>
                          {"Delete"}
                        </button>
                      </td>
                    )}
                    {onAddProductToWishlist && !inWishList && (
                      <td>
                        <button
                          onClick={() => {
                            onAddProductToWishlist({ id: product._id })
                          }}>
                          {"Add To Wishlist"}
                        </button>
                      </td>
                    )}
                    {onRemoveProductFromWishlist && inWishList && (
                      <td>
                        <button
                          onClick={() => {
                            onRemoveProductFromWishlist({ id: product._id })
                          }}>
                          {"Remove From Wishlist"}
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default ProductTable
