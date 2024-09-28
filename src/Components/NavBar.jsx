import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { currentUserAction } from "../store/currentUser";
import NavBarMobile from "./Responsive/NavBarMobile";

export default function NavBar() {
  const currentUser = useSelector((state) => state.currentUser.currentUser); // * thông tin người dùng đang đăng nhập
  const dispatch = useDispatch();

  // cart redux
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const cartCount = cartList
    ? cartList.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  function getLastName(name) {
    // * lấy ra last name của người dùng
    if (currentUser) {
      const fullName = name;
      const parts = fullName.split(" ");
      const lastName = parts[parts.length - 1];
      return lastName;
    }
  }
  function logoutHandler() {
    //todo xử lý đăng xuất tài khoản
    dispatch(currentUserAction.ON_LOGOUT());
    localStorage.removeItem("current_user");
  }
  return (
    <section id="navbar" className="shadow-sm">
      <div className="container mx-auto">
        <div className="navbar md:flex justify-between py-4 items-center hidden">
          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : undefined
                }
              >
                Shop
              </NavLink>
            </li>
          </ul>
          <div className="logo-brand">
            <Link to="/">
              <h1 className="text-2xl">BOUTIQUE</h1>
            </Link>
          </div>
          <ul className="nav-user flex gap-6">
            <li className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : undefined
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-5 inline mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Cart
              </NavLink>
              <span className="rounded-full text-xs flex items-center w-6 h-6 justify-center absolute bg-primary-black text-white top-[-10px] left-[-10px] border-2 border-white">
                {cartCount}
              </span>
            </li>
            {currentUser ? (
              <>
                <li>
                  <NavLink>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="size-5 inline mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    {getLastName(currentUser.name)}
                  </NavLink>
                </li>
                <li>
                  <Link onClick={logoutHandler}>( logout )</Link>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : undefined
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-5 inline mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="block md:hidden ">
          <NavBarMobile />
        </div>
      </div>
    </section>
  );
}
