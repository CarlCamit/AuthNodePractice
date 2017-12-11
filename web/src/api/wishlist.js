import api from "./init"

export function listProductsInWishlist() {
  return api.get("/wishlist").then(res => {
    return res.data
  })
}

export function addProductToWishlist({ id }) {
  console.log(id)
  return api.post(`/wishlist/products/${id}`).then(res => {
    return res.data
  })
}

export function removeProductFromWishlist({ id }) {
  return api.delete(`wishlist/products/${id}`)
}
