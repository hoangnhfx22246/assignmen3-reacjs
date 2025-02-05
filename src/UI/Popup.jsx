import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItemPopup from "../Components/ProductItemPopup";
import { popupAction } from "../store/popup";
import { useDispatch } from "react-redux";

export const TYPE = {
  PRODUCT_ITEM: "PRODUCT_ITEM",
};

export default function Popup() {
  const dialog = useRef();
  const dispatch = useDispatch(); //* Lấy hàm dispatch từ Redux để có thể dispatch các action

  const popupState = {
    // * thông tin popup
    isOpen: useSelector((state) => state.popup.isOpen), // todo gán thông tin popup lấy ra từ store redux
    element: {
      type: useSelector((state) => state.popup.element.type),
      data: useSelector((state) => state.popup.element.data),
    }, // todo gán thông tin popup lấy ra từ store redux
  };

  // todo xử lý thông tin element để thêm component cho popup
  let childrenComponent = null;
  switch (popupState.element.type) {
    case TYPE.PRODUCT_ITEM:
      childrenComponent = (
        <ProductItemPopup product={popupState.element.data} />
      );
      break;

    default:
      break;
  }
  // Hàm xử lý sự kiện khi nhấn phím
  const handleKeyDown = (event) => {
    if (event.key === "Escape" && childrenComponent) {
      // Kiểm tra nếu phím nhấn là phím ESC
      dispatch(popupAction.HIDE_POPUP()); // Dispatch action HIDE_POPUP để ẩn popup
    }
  };

  // Sử dụng useEffect để thêm event listener khi component được mount
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown); // Thêm event listener cho sự kiện keydown

    // Cleanup event listener khi component unmount để tránh memory leak
    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Gỡ bỏ event listener khi component unmount
    };
  }, [handleKeyDown]); // Chỉ chạy một lần khi component được mount và unmount

  useEffect(() => {
    // todo sử lý hiển thị popup
    if (popupState.isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [popupState.isOpen]);

  return (
    <dialog ref={dialog} className="outline-none">
      {childrenComponent}
    </dialog>
  );
}
