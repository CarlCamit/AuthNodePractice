import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
import { setToken } from './api/init'

class App extends Component {

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
      .then((data) => {
        console.log('Signed In', data)
        setToken(data.token)
        listProducts()
          .then((products) => {
            console.log(products)
          })
          .catch((error) => {
            console.log({ error: error.message })
          })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now delivering: trillions of new products</h2>
        <SignInForm
          onSignIn={
            this.onSignIn
          }
        />
      </div>
    );
  }
}

export default App;
