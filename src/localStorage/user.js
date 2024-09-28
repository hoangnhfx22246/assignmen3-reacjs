const KEY = "user_data"; // key local storage

// * get all
export function getAllUsers() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
// * get one by id user
export function getUserByID(id) {
  const users = getAllUsers();
  return users.find((user) => user.id === id);
}
// * get one by email user
export function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find((user) => user.email === email);
}
// * post
export function setUser(user) {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(KEY, JSON.stringify(users));
}
// // * put
// // * delete
