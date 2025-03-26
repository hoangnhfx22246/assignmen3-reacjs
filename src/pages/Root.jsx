import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Popup from "../UI/Popup";
import LiveChat from "../Components/LiveChat";
import { useSelector } from "react-redux";
export default function Root() {
  const currentUser = useSelector((state) => state.currentUser.currentUser); // * thông tin người dùng đang đăng nhập

  return (
    <>
      {/* sử dụng popup */}
      <Popup />
      {/*todo render NavBar */}
      <NavBar />
      {/* Popup */}
      {/* Main page */}
      <main>
        <Outlet />
      </main>
      {/* liveChat */}
      {currentUser && <LiveChat />}

      {/*todo render Footer */}
      <Footer />
    </>
  );
}
