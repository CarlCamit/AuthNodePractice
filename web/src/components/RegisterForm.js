import React from "react"

function RegisterForm({ onRegister }) {
  return (
    <form
      onSubmit={event => {
        // Prevent old form submission behaviour
        event.preventDefault()

        const email = event.target.elements.email.value
        const firstName = event.target.elements.firstName.value
        const lastName = event.target.elements.lastName.value
        const password = event.target.elements.password.value

        onRegister({ email, firstName, lastName, password })
      }}>
      <label className="mb-2">
        {"Email: "}
        <input type="email" name="email" />
      </label>
      <label className="mb-2">
        {"First Name: "}
        <input type="text" name="firstName" />
      </label>
      <label className="mb-2">
        {"Last Name: "}
        <input type="text" name="lastName" />
      </label>
      <label className="mb-2">
        {"Password: "}
        <input type="password" name="password" />
      </label>
      <button>{"Sign Up"}</button>
    </form>
  )
}

export default RegisterForm
