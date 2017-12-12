import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function PrimaryNav({
    decodedToken
}) {
    return (
        <nav className='primary'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Products</Link></li>
                {
                    decodedToken ? (
                        <Fragment>
                            <li><Link to='/wishlist'>Wishlist</Link></li>
                            <li><Link to='/account'>Account</Link></li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li><Link to='/signin'>Sign In</Link></li>
                            <li><Link to='/register'>Sign Up</Link></li>
                        </Fragment>
                    )
                }
            </ul>
        </nav>
    )
}

export default PrimaryNav