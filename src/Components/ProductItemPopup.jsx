import { useDispatch } from "react-redux";
import { popupAction } from "../store/popup";
import { Link } from "react-router-dom";

export default function ProductItemPopup({ product }) {
  const dispatch = useDispatch(); // * dispatch để sử dụng actions của reducer

  function handlerHidePopup() {
    dispatch(
      //show popup
      popupAction.HIDE_POPUP()
    );
  }
  return (
    <div className="grid grid-cols-2 items-center max-w-3xl relative">
      <div
        className="cursor-pointer absolute p-2 right-4 top-4"
        onClick={handlerHidePopup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-5 text-gray-500"
        >
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </div>
      <img src={product.img1} alt={product.name} />
      <div className="p-10 space-y-2">
        <h2 className="font-medium text-2xl">{product.name}</h2>
        <p className="text-lg text-gray-600">
          {Number(product.price).toLocaleString() + " VND"}
        </p>
        <p className="text-sm leading-relaxed text-gray-400">
          {product.short_desc}
        </p>
        <Link to={`/detail/${product._id.$oid}`}>
          <button
            className="text-white bg-primary-black py-2 px-6 outline-none"
            onClick={handlerHidePopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 inline-block mr-2"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            View Detail
          </button>
        </Link>
      </div>
    </div>
  );
}
