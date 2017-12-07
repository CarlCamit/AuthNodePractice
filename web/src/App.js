import React, { Component } from 'react';
import './App.css';

import { register, signIn, signOutNow } from './api/auth'
import { listProducts, createProduct, deleteProduct } from './api/products'
import { getDecodedToken } from './api/token'

import SignInForm from './components/SignInForm'
import RegisterForm from './components/RegisterForm'
import ProductTable from './components/ProductTable'
import CreateProductForm from './components/CreateProductForm'

class App extends Component {

  state = {
    decodedToken: getDecodedToken(),
    products: []
  }

  componentDidMount() {
    listProducts()
      .then((products) => {
        this.setState({ products })
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
    console.log(id)
    deleteProduct({id, index})
      .then(() => {
        this.setState({ products: this.state.products.splice(index, 1)})
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
                products={
                  this.state.products
                } 
                onDeleteProduct={
                  this.onDeleteProduct
                }
              />
              <CreateProductForm 
                onCreateProduct={
                  this.onCreateProduct
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
