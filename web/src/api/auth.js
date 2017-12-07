import api, { setToken } from './init'
import { getDecodedToken } from './token'


export function signIn({ email, password }) {
    return api.post('/auth/signin', { email, password })
        .then((res) => {
            const token = res.data.token
            setToken(token)
            return getDecodedToken()
        })
}

export function register({ email, firstName, lastName, password }) {
    return api.post('/auth/register', { email, firstName, lastName, password })
        .then((res) => {
            const token = res.data.token
            setToken(token)
            return getDecodedToken()
        })
}

export function signOutNow() {
    setToken(null)
}