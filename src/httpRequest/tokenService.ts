const TOKEN_KEY = 'token';

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export { TokenService };
