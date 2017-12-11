import decodeJWT from "jwt-decode"

const key = "userToken"

export function rememberToken(token) {
  if (token) {
    localStorage.setItem(key, token)
  } else {
    localStorage.removeItem(key)
  }
}

export function getValidToken() {
  const token = localStorage.getItem(key)
  try {
    const decodedToken = decodeJWT(token)
    const now = Date.now() / 1000
    if (now > decodedToken.exp) {
      return null
    }
    return token
  } catch (error) {
    return null
  }
}

export function getDecodedToken() {
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  } else {
    return null
  }
}
