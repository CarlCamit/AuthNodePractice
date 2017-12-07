import React from 'react'

function SignInForm({
    onSignIn
}) {
    return (
        <form
            onSubmit={
                (event) => {
                    // Prevent old form submission behaviour
                    event.preventDefault()

                    const email = event.target.elements.email.value
                    const password = event.target.elements.password.value

                    onSignIn({ email, password })
                }
            }
        >
            <label
                className='mb-2'
            >
            {'Email: '}
            <input
                type='email'
                name='email'
            />
            </label>
            <label
                className='mb-2'
            >
            {'Password: '}
            <input
                type='password'
                name='password'
            />
            </label>
            <button>
                {`Sign In`}
            </button>
        </form>
    )
}

export default SignInForm