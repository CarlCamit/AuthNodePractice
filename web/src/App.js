import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
// import { setToken } from './api/init'

class App extends Component {

  state = {
    decodedToken: null
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
