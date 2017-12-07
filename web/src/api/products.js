import api from './init'

export function listProducts() {
    return api.get('/products')
        .then((res) => {
            return res.data
        })
}

export function createProduct({ name, brandName }) {
    return api.post('/products', { name, brandName })
        .then((res) => {
            return res.data
        })
}

export function deleteProduct({id}) {
    return api.delete(`/products/` + id)
}