// empty value
export const notEmptyValue = (value) => {
  return value ? true : false;
};
export const validateEmail = (email) => {
  // Biểu thức chính quy để kiểm tra email hợp lệ
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
export const validatePassword = (password) => {
  // Biểu thức chính quy để kiểm tra password hợp lệ
  return password.length > 8;
};
export const validatePhoneVN = (phone) => {
  // Biểu thức chính quy để kiểm tra số điện thoại Việt Nam
  const re = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return re.test(phone);
};
