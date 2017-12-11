import React from "react"

function CreateProductForm({ onCreateProduct }) {
  return (
    <form
      onSubmit={event => {
        // Prevent old form submission behaviour
        event.preventDefault()

        const name = event.target.elements.name.value
        const brandName = event.target.elements.brandName.value

        onCreateProduct({ name, brandName })
      }}>
      <label className="mb-2">
        {"Product Name: "}
        <input type="text" name="name" />
      </label>
      <label className="mb-2">
        {"Brand Name: "}
        <input type="text" name="brandName" />
      </label>
      <button>{"Create Product"}</button>
    </form>
  )
}

export default CreateProductForm
