import React, { Component } from 'react';
import './App.css';

import { register, signIn, signOutNow } from './api/auth'
import { listProducts, createProduct, deleteProduct } from './api/products'
import { listProductsInWishlist, addProductToWishlist, removeProductFromWishlist } from './api/wishlist'
import { getDecodedToken } from './api/token'

import SignInForm from './components/SignInForm'
import RegisterForm from './components/RegisterForm'
import ProductTable from './components/ProductTable'
import CreateProductForm from './components/CreateProductForm'

class App extends Component {

  state = {
    decodedToken: getDecodedToken(),
    products: [],
    wishlist: []
  }

  componentDidMount() {
    listProducts()
      .then((products) => {
        this.setState({ products })
      })
      .catch((error) => {
        console.log({ error: error.message })
      })
    listProductsInWishlist()
      .then((wishlist) => {
        this.setState({ wishlist: wishlist.products })
      })
      .catch((error) => {
        console.log({ error: error.message })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onSignIn = ({
    email, password
  }) => {
    signIn({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  onRegister = ({
    email, firstName, lastName, password
  }) => {
    register({ email, firstName, lastName, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  onCreateProduct = ({
    name, brandName
  }) => {
    createProduct({ name, brandName })
      .then((data) => {
        this.setState({ products: this.state.products.concat(data) })
      })
  }

  onDeleteProduct = ({
    id, index
  }) => {
    deleteProduct({id})
      .then(() => {
        this.setState({ products: this.state.products.filter(product => product._id !== id ) })
      })
  }

  onAddProductToWishlist = ({
    id
  }) => {
    addProductToWishlist({ id })
      .then((data) => {
        this.setState({ wishlist: data.products })
      })
  }

  onRemoveProductFromWishlist = ({
    id
  }) => {
    removeProductFromWishlist({ id })
      .then(() => {
        console.log(this.state.wishlist)
        this.setState({ wishlist: this.state.wishlist.filter(product => product._id !== id ) })
      })
  }
  
  render() {

    const { decodedToken } = this.state
    
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now delivering: trillions of new products</h2>
        {
          !!decodedToken ? 
          (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed In At: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expire At: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <button
                onClick={
                  this.onSignOut
                }
              >
                Sign Out
              </button>
              <ProductTable
                title={
                  `Products`
                }
                products={
                  this.state.products
                } 
                onDeleteProduct={
                  this.onDeleteProduct
                }
                onAddProductToWishlist={
                  this.onAddProductToWishlist
                }
                onRemoveProductFromWishlist={
                  this.onRemoveProductFromWishlist
                }
              />
              <CreateProductForm 
                onCreateProduct={
                  this.onCreateProduct
                }
              />
              <ProductTable
                title={
                  `Wishlist`
                }
                products={
                  this.state.wishlist
                } 
                onRemoveProductFromWishlist={
                  this.onRemoveProductFromWishlist
                }
              />
            </div>
          ) : 
          (
            <div>
              <SignInForm
                onSignIn={
                  this.onSignIn
                }
              />
              <RegisterForm
                onRegister={
                  this.onRegister
                }
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
