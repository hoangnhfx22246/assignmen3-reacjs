// *********** người dùng hiện tại

const KEY = "current_user"; // key local storage

// * get
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(KEY)) || null;
};
// * set

export const setCurrentUser = (currentUser) => {
  localStorage.setItem(KEY, JSON.stringify(currentUser));
};
