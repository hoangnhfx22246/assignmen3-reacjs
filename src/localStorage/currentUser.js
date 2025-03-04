// *********** người dùng hiện tại

const KEY = "current_user"; // key local storage
const KEY_TOKEN = "token_user"; // key local storage
const KEY_EXPIRES_AT = "expiresAt"; // key local storage

// * get
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(KEY)) || null;
};
export const getCurrentTokenUser = () => {
  return JSON.parse(localStorage.getItem(KEY_TOKEN)) || null;
};
export const getExpireAtAuth = () => {
  return JSON.parse(localStorage.getItem(KEY_EXPIRES_AT)) || null;
};
// * set

export const setCurrentUser = (currentUser) => {
  localStorage.setItem(KEY, JSON.stringify(currentUser));
};

export const setCurrentTokenUser = (currentToken) => {
  localStorage.setItem(KEY_TOKEN, JSON.stringify(currentToken));
};

export const setExpireAtAuth = (expiresAt) => {
  localStorage.setItem(KEY_EXPIRES_AT, JSON.stringify(expiresAt));
};
