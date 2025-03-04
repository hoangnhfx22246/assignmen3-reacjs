import { useState } from "react";
import {
  notEmptyValue,
  validateEmail,
  validatePhoneVN,
} from "../validate/validate";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutForm({ cartList, subTotal }) {
  const [errorValidate, setErrorValidate] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  // submit handler
  async function submitHandler(e) {
    e.preventDefault();
    if (!cartList || (cartList && cartList.length <= 0)) {
      if (window.confirm("Please add product to cart first!")) {
        return navigate("/shop");
      }
    }

    let valid = true;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (
      !notEmptyValue(data["full_name"]) ||
      !notEmptyValue(data["email"]) ||
      !notEmptyValue(data["phone"]) ||
      !notEmptyValue(data["address"])
    ) {
      setErrorValidate((prevError) => [
        ...prevError,
        "Please fill in all information",
      ]);
      valid = false;
    }
    if (!validateEmail(data["email"])) {
      setErrorValidate((prevError) => [
        ...prevError,
        "Please fill in the correct email",
      ]);
      valid = false;
    }
    if (!validatePhoneVN(data["phone"])) {
      setErrorValidate((prevError) => [
        ...prevError,
        "Please fill in the correct phone",
      ]);
      valid = false;
    }
    if (valid) {
      const backendUrl = import.meta.env.VITE_URL_BACKEND;

      try {
        const res = await axios.post(
          `${backendUrl}/orders/checkout`,
          {
            name: data["full_name"],
            email: data["email"],
            phone: data["phone"],
            address: data["address"],
            carts: cartList.map((cart) => ({
              product: {
                id: cart.id,
                img: cart.img,
                name: cart.name,
                price: cart.price,
              },
              quantity: cart.quantity,
            })),
            totalAmount: subTotal,
          },
          { withCredentials: true }
        );
        const order = res.data.result;

        // reset cart
        cartList.map((item) => {
          dispatch(cartActions.DELETE_CART(item.id));
        });

        // redirect to order detail
        return navigate(`/orders/${order._id}`);
      } catch (error) {
        setErrorValidate((prevError) => [
          ...prevError,
          error.response.data.message,
        ]);
      }
    }
  }

  return (
    <>
      {errorValidate && errorValidate.length > 0 && (
        <ul className="mb-6 text-sm text-red-500">
          {errorValidate.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="full_name"
            className="uppercase text-gray-500 tracking-wider"
          >
            Full name:
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Enter Your Full Name Here!"
            className="w-full border-2 px-4 py-2 placeholder:text-sm placeholder:text-gray-400"
            defaultValue={currentUser.name}
            required
          />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="email"
            className="uppercase text-gray-500 tracking-wider"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email Here!"
            className="w-full border-2 px-4 py-2 placeholder:text-sm placeholder:text-gray-400"
            defaultValue={currentUser.email}
            required
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label
            htmlFor="phone"
            className="uppercase text-gray-500 tracking-wider"
          >
            Phone number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Your Full Name Here!"
            className="w-full border-2 px-4 py-2 placeholder:text-sm placeholder:text-gray-400"
            defaultValue={currentUser.phone}
            required
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label
            htmlFor="address"
            className="uppercase text-gray-500 tracking-wider"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Your Address Here!"
            className="w-full border-2 px-4 py-2 placeholder:text-sm placeholder:text-gray-400"
            required
          />
        </div>
        <button className="text-white font-extralight italic bg-primary-black py-2 px-8 text-lg">
          Place order
        </button>
      </form>
    </>
  );
}
