// make localstorage a global variable
const localStorage = global.window.localStorage;

// save token in the localstorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// get the token in localstorage
export const getToken = () => localStorage.getItem('token');

// remove saved token in localstorage
export const removeToken = () => {
  localStorage.removeItem('token');
};
