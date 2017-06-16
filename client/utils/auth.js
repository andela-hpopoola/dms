/* eslint-disable */
const tokenName = 'dms_token';
// save token in the localstorage
export const setToken = (token) => {
  localStorage.setItem(tokenName, token);
};

// get the token in localstorage
export const getToken = () => localStorage.getItem(tokenName);

// remove saved token in localstorage
export const removeToken = () => {
  localStorage.removeItem(tokenName);
};
