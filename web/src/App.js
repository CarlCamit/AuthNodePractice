import React, { Component, Fragment } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

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
import Error from "./components/Error"

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    products: [],
    wishlist: [],
    error: null,
    // State to hold product ID to edit
    activeEditProductId: null
  }

  componentDidMount() {
    listProducts()
      .then(products => {
        this.setState({ products })
      })
      .catch(error => {
        this.setState({ error })
      })
    
      listProductsInWishlist()
        .then(wishlist => {
          this.setState({ wishlist: wishlist.products })
        })
        .catch(error => {
          this.setState({ error })
        })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      this.setState({ decodedToken })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onRegister = ({ email, firstName, lastName, password }) => {
    register({ email, firstName, lastName, password }).then(decodedToken => {
      this.setState({ decodedToken })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onCreateProduct = ({ name, brandName }) => {
    createProduct({ name, brandName }).then(data => {
      this.setState({ products: this.state.products.concat(data) })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onUpdateProduct = ({ id, name, brandName }) => {
    editProduct({ id, name, brandName }).then(data => {
      // Need to only pass data because findByIdAndUpdate with the { new: true } option returns the updated array
      this.setState({ products: data })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onDeleteProduct = ({ id }) => {
    deleteProduct({ id }).then(() => {
      this.setState({
        products: this.state.products.filter(product => product._id !== id)
      })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onAddProductToWishlist = ({ id }) => {
    addProductToWishlist({ id }).then(data => {
      this.setState({ wishlist: data.products })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  onRemoveProductFromWishlist = ({ id }) => {
    removeProductFromWishlist({ id }).then(() => {
      this.setState({
        wishlist: this.state.wishlist.filter(product => product._id !== id)
      })
    }).catch((error) => {
      this.setState({ error })
    })
  }

  getEditProductId = ({ id }) => {
    // Sets the state for the product ID that needs to be edited
    this.setState({ activeEditProductId: id })
  }

  render() {
    const { error, decodedToken, products, wishlist } = this.state

    const requireAuthentication = (render) => (props) => (
      decodedToken ? (
        render(props)
      ) : (
        <Redirect to='/signin' />
      )
    )

    return (
      <Router>
        <div className="App">

          <PrimaryNav decodedToken={decodedToken} />

          { this.state.error && <Error error={error} /> }
          { console.log(wishlist)}

          <Switch>
            <Route path='/' exact render={ () => (
              <Fragment>
                <h1>Yarra</h1>
                <h2 className="mb-3">Now delivering: trillions of new products</h2>
              </Fragment>
            )}/>

            <Route path='/signin' exact render={ () => (
              decodedToken ? (
                <Redirect to='/products' />
              ) : (
              <Fragment>
                <h2>Sign In</h2>
                <SignInForm onSignIn={this.onSignIn} />
              </Fragment>
              )
            )} />

            <Route path='/register' exact render={ () => (
              decodedToken ? (
                <Redirect to='/products' />
              ) : (
              <Fragment>
                <h2>Sign Up</h2>
                <RegisterForm onRegister={this.onRegister} />
              </Fragment>
              ) 
            )} />

            <Route path='/account' exact render={ requireAuthentication(() => (
              <Fragment>
                <div>
                  <p>Email: {decodedToken.email}</p>
                  <p>Signed In At: {new Date(decodedToken.iat * 1000).toISOString()}</p>
                  <p>Expire At: {new Date(decodedToken.exp * 1000).toISOString()}</p>
                  <button onClick={this.onSignOut}>Sign Out</button>
                </div>
              </Fragment>
            ))} />

            <Route path='/products' exact render={ () => (
              <Fragment>
                { products && wishlist &&
                  <ProductTable
                    title={`Products`}
                    products={this.state.products}
                    productsInWishList={this.state.wishlist}
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

            <Route path='/admin/products' exact render={ requireAuthentication(() => (
              <Fragment>
                <CreateProductForm onCreateProduct={this.onCreateProduct} />
              </Fragment>
            ))} />

            <Route path="/wishlist" exact render={ requireAuthentication(() => (
              <Fragment>
                { 
                  wishlist && <ProductTable
                  title={`Wishlist`}
                  products={this.state.wishlist}
                  productsInWishList={this.state.wishlist}
                  onRemoveProductFromWishlist={this.onRemoveProductFromWishlist}
                  />
                }
              </Fragment>
            ))} />

            <Route render={ ({ location }) => (
              <h1>Page Not Found: { location.pathname }</h1>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
