import { useState } from "react";
import {
  notEmptyValue,
  validateEmail,
  validatePhoneVN,
} from "../validate/validate";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [errorValidate, setErrorValidate] = useState([]);
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const navigate = useNavigate();

  // submit handler
  function submitHandler(e) {
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
      e.target.reset();
      cartList.map((item) => {
        dispatch(cartActions.DELETE_CART(item.id));
      });
      setErrorValidate([]);
      alert("Order Success");
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
