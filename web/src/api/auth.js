import api from './init'
import decodeJWT from 'jwt-decode'

export function signIn({ email, password }) {
    return api.post('/auth/signin', { email, password })
        .then((res) => {
            return decodeJWT(res.data.token)
        })
}