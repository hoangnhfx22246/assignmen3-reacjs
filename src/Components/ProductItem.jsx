import { useDispatch } from "react-redux";
import { popupAction } from "../store/popup";
import { TYPE } from "../UI/Popup";
import { Link } from "react-router-dom";

/**
 * ProductItem
 * @param {Object} product thông tin của sản phẩm
 * @param {boolean} usePopup kiểm tra xem có được hiện popup hay không
 */
export default function ProductItem({ product, usePopup }) {
  // console.log(product);
  const dispatch = useDispatch(); // * dispatch để sử dụng actions của reducer

  function handlerShowPopup() {
    dispatch(
      //show popup
      popupAction.SHOW_POPUP({ type: TYPE.PRODUCT_ITEM, data: product })
    );
  }

  return (
    <div className="text-center space-y-1 animate-appear">
      <div
        className="mb-5 hover:opacity-60 duration-150 cursor-pointer"
        onClick={usePopup ? handlerShowPopup : null}
      >
        {usePopup ? (
          <img
            src={import.meta.env.VITE_URL_BACKEND + "/" + product.images[0]}
            alt={product.name}
          />
        ) : (
          <Link to={`/detail/${product._id}`}>
            <img
              src={import.meta.env.VITE_URL_BACKEND + "/" + product.images[0]}
              alt={product.name}
            />
          </Link>
        )}
      </div>
      <h4 className="font-medium">{product.name}</h4>
      <p className="text-sm text-gray-400">
        {Number(product.price).toLocaleString("vi-VN")} VND
      </p>
    </div>
  );
}
