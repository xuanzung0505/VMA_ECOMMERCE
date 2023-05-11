import Cookies from 'universal-cookie'

const TOKEN_KEY = 'token'

const TokenService = {
  getToken() {
    return new Cookies().get(TOKEN_KEY)
    // return localStorage.getItem(TOKEN_KEY)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
}

export { TokenService }
