const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const login = (token: string) => {
  localStorage.setItem('token', token);
};

const logout = () => {
  localStorage.removeItem('token');
};

export default {
  isAuthenticated,
  login,
  logout,
};