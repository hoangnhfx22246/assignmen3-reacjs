import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Popup from "../UI/Popup";
import LiveChat from "../Components/LiveChat";
export default function Root() {
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
      <LiveChat />
      {/*todo render Footer */}
      <Footer />
    </>
  );
}
