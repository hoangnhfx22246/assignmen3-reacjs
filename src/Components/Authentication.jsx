import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { currentUserAction } from "../store/currentUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Authentication({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expireAt = useSelector((state) => state.currentUser.expireAt);
  // Hàm xử lý đăng xuất
  const handleLogout = useCallback(
    async (alertMessage) => {
      const backendUrl = import.meta.env.VITE_URL_BACKEND;
      try {
        await axios.post(
          `${backendUrl}/auth/logout`,
          {},
          { withCredentials: true }
        );
        dispatch(currentUserAction.ON_LOGOUT());
        alert(`${alertMessage}`);
        navigate("/login");
      } catch (error) {
        console.error("Có lỗi xảy ra!", error);
      }
    },
    [dispatch, navigate]
  );

  // Kiểm tra thời gian hết hạn của phiên đăng nhập
  useEffect(() => {
    if (expireAt) {
      const expirationTime =
        new Date(expireAt).getTime() - new Date().getTime();

      if (expirationTime > 0) {
        const logoutTimer = setTimeout(() => {
          handleLogout("Your session has expired. Please log in again.");
        }, expirationTime);

        return () => clearTimeout(logoutTimer);
      } else {
        handleLogout("Your session has expired. Please log in again.");
      }
    }
  }, [handleLogout, expireAt]);
  return <>{children}</>;
}
