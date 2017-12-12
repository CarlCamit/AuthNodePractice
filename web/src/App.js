import React, { Component, Fragment } from "react"
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { register, signIn, signOutNow } from "./api/auth"
import {
  listProducts,
  createProduct,
  editProduct,
  deleteProduct
} from "./api/products"
import {
  listProductsInWishlist,
  addProductToWishlist,
  removeProductFromWishlist
} from "./api/wishlist"
import { getDecodedToken } from "./api/token"

import SignInForm from "./components/SignInForm"
import RegisterForm from "./components/RegisterForm"
import ProductTable from "./components/ProductTable"
import CreateProductForm from "./components/CreateProductForm"
import PrimaryNav from "./components/PrimaryNav"

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    products: [],
    wishlist: [],
    // State to hold product ID to edit
    activeEditProductId: null
  }

  componentDidMount() {
    listProducts()
      .then(products => {
        this.setState({ products })
      })
      .catch(error => {
        console.log({ error: error.message })
      })
    listProductsInWishlist()
      .then(wishlist => {
        this.setState({ wishlist: wishlist.products })
      })
      .catch(error => {
        console.log({ error: error.message })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      this.setState({ decodedToken })
    })
  }

  onRegister = ({ email, firstName, lastName, password }) => {
    register({ email, firstName, lastName, password }).then(decodedToken => {
      this.setState({ decodedToken })
    })
  }

  onCreateProduct = ({ name, brandName }) => {
    createProduct({ name, brandName }).then(data => {
      this.setState({ products: this.state.products.concat(data) })
    })
  }

  onUpdateProduct = ({ id, name, brandName }) => {
    editProduct({ id, name, brandName }).then(data => {
      // Need to only pass data because findByIdAndUpdate with the { new: true } option returns the updated array
      this.setState({ products: data })
      console.log(this.state.activeEditProductId)
    })
  }

  onDeleteProduct = ({ id }) => {
    deleteProduct({ id }).then(() => {
      this.setState({
        products: this.state.products.filter(product => product._id !== id)
      })
    })
  }

  onAddProductToWishlist = ({ id }) => {
    addProductToWishlist({ id }).then(data => {
      this.setState({ wishlist: data.products })
    })
  }

  onRemoveProductFromWishlist = ({ id }) => {
    removeProductFromWishlist({ id }).then(() => {
      this.setState({
        wishlist: this.state.wishlist.filter(product => product._id !== id)
      })
    })
  }

  getEditProductId = ({ id }) => {
    // Sets the state for the product ID that needs to be edited
    this.setState({ activeEditProductId: id })
  }

  render() {
    const { decodedToken, products, wishlist } = this.state

    return (
      <Router>
        <div className="App">

          <PrimaryNav decodedToken={decodedToken} />

          <Route path='/' exact render={ () => (
            <Fragment>
              <h1>Yarra</h1>
              <h2 className="mb-3">Now delivering: trillions of new products</h2>
            </Fragment>
          )}/>

          <Route path='/signin' exact render={ () => (
            <Fragment>
              <h2>Sign In</h2>
              <SignInForm onSignIn={this.onSignIn} />
            </Fragment>
          )} />

          <Route path='/register' exact render={ () => (
            <Fragment>
              <h2>Sign Up</h2>
              <RegisterForm onRegister={this.onRegister} />
            </Fragment>
          )} />

          <Route path='/account' exact render={ () => (
            <Fragment>
              <div>
                <p>Email: {decodedToken.email}</p>
                <p>Signed In At: {new Date(decodedToken.iat * 1000).toISOString()}</p>
                <p>Expire At: {new Date(decodedToken.exp * 1000).toISOString()}</p>
                <button onClick={this.onSignOut}>Sign Out</button>
              </div>
            </Fragment>
          )} />

          <Route path='/products' exact render={ () => (
            <Fragment>
              { products &&
                <ProductTable
                  title={`Products`}
                  products={products}
                  getEditProductId={this.getEditProductId}
                  onEditProductId={this.state.activeEditProductId}
                  onUpdateProduct={this.onUpdateProduct}
                  onDeleteProduct={this.onDeleteProduct}
                  onAddProductToWishlist={this.onAddProductToWishlist}
                  onRemoveProductFromWishlist={this.onRemoveProductFromWishlist}
                />
              }
            </Fragment>
          )} />

          <Route path='/admin/products' exact render={ () => (
            <Fragment>
              <CreateProductForm onCreateProduct={this.onCreateProduct} />
            </Fragment>
          )} />

          <Route path="/wishlist" exact render={ () => (
            <Fragment>
              { 
                decodedToken && wishlist && <ProductTable
                title={`Wishlist`}
                products={this.state.wishlist}
                onRemoveProductFromWishlist={this.onRemoveProductFromWishlist}
                />
              }
            </Fragment>
          )} />
                
        </div>
      </Router>
    )
  }
}

export default App
