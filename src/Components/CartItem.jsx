import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import { useState } from "react";

export default function CartItem({ item }) {
  const dispatch = useDispatch(); // * use dispatch
  let cartItem = { ...item };
  const [quantity, setQuantity] = useState(cartItem.quantity); //* state quantity

  //* delete item handler
  function handlerDelete(id) {
    if (window.confirm(`delete product from cart?`)) {
      dispatch(cartActions.DELETE_CART(id));
    }
  }
  // * handler save change quantity input
  function handlerSaveChange(quantity) {
    if (cartItem.maxQuantity - quantity < 0) {
      alert("out of stock");
      return;
    }

    if (quantity <= 0) {
      handlerDelete(cartItem.id);
      return;
    }
    if (quantity >= 100) {
      return;
    }
    cartItem.quantity = quantity;
    dispatch(cartActions.UPDATE_CART(cartItem));
    setQuantity(cartItem.quantity);
  }

  return (
    <tr className="text-center">
      <td>
        <img
          src={import.meta.env.VITE_URL_BACKEND + "/" + cartItem.img}
          alt=""
          className="w-full object-cover"
        />
      </td>
      <td>
        <h2 className="font-medium md:line-clamp-3 line-clamp-1">
          {cartItem.name}
        </h2>
        <p className="text-xs text-gray-500 font-light md:hidden">
          {Number(cartItem.price).toLocaleString() + " VND"}
        </p>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => {
              handlerSaveChange(quantity - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 rotate-180 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            step={1}
            max={99}
            name="quantity"
            id="quantity"
            className="max-w-10 text-center"
            onChange={(e) => handlerSaveChange(Number(e.target.value))}
          />
          <button
            type="button"
            onClick={() => {
              handlerSaveChange(quantity + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </td>
      <td className="md:table-cell hidden">
        <p className="text-xs text-gray-500 font-light">
          {Number(cartItem.price).toLocaleString() + " VND"}
        </p>
      </td>
      <td className="md:table-cell hidden">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              handlerSaveChange(quantity - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 rotate-180 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            step={1}
            max={99}
            name="quantity"
            id="quantity"
            className="max-w-10 text-center"
            onChange={(e) => handlerSaveChange(Number(e.target.value))}
          />
          <button
            type="button"
            onClick={() => {
              handlerSaveChange(quantity + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </td>
      <td>
        <p className="text-xs text-gray-500 font-light">
          {Number(cartItem.price * cartItem.quantity).toLocaleString() + " VND"}
        </p>
      </td>
      <td>
        <span className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 cursor-pointer"
            onClick={() => {
              handlerDelete(cartItem.id);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
}
