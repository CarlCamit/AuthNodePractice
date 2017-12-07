import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {

  state = {
    decodedToken: getDecodedToken()
  }

  componentDidMount() {
    listProducts()
      .then((products) => {
        console.log(products)
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
    console.log('Form recieved', { email, password })
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('Signed In', decodedToken)
        this.setState({ decodedToken })
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
            </div>
          ) : 
          (
            <SignInForm
              onSignIn={
                this.onSignIn
              }
            />
          )
        }
      </div>
    );
  }
}

export default App;
