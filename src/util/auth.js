import { redirect } from "react-router-dom";
import { getCurrentUser } from "../localStorage/currentUser";

// * ngăn không cho vào đường dẫn mà chỉ có người đã đăng nhập mới vào được
export function checkAuthLoader() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return redirect("/auth");
  }
  return null;
}

// * ngăn không cho vào đường dẫn mà chỉ có người không đăng nhập mới vào được
export function checkNoAuthLoader() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return redirect("/");
  }
  return null;
}
