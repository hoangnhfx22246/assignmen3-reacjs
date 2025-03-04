import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  notEmptyValue,
  validateEmail,
  validatePassword,
  validatePhoneVN,
} from "../validate/validate";

import axios from "axios";

export default function RegisterPage() {
  // xử lý input
  const enteredName = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredPhone = useRef();

  const navigate = useNavigate();

  // state error message
  const [error, setError] = useState([]);

  // * submit handler
  async function submitHandler(e) {
    e.preventDefault();
    let valid = true;
    setError([]); //reset to default error
    if (
      // check empty
      !notEmptyValue(enteredName.current.value) ||
      !notEmptyValue(enteredEmail.current.value) ||
      !notEmptyValue(enteredPassword.current.value) ||
      !notEmptyValue(enteredPhone.current.value)
    ) {
      setError((prevError) => [...prevError, "Please fill in all information"]);
      valid = false;
    }
    if (!validateEmail(enteredEmail.current.value)) {
      setError((prevError) => [
        ...prevError,
        "Please fill in the correct email",
      ]);
      valid = false;
    }
    if (!validatePassword(enteredPassword.current.value)) {
      setError((prevError) => [
        ...prevError,
        "Password must be at least 8 characters",
      ]);
      valid = false;
    }
    if (!validatePhoneVN(enteredPhone.current.value)) {
      setError((prevError) => [
        ...prevError,
        "Please fill in the correct phone",
      ]);
      valid = false;
    }
    if (valid) {
      try {
        const backendUrl = import.meta.env.VITE_URL_BACKEND;

        await axios.post(`${backendUrl}/auth/signup`, {
          name: enteredName.current.value,
          email: enteredEmail.current.value,
          password: enteredPassword.current.value,
          phone: enteredPhone.current.value,
        });
        navigate("/login");
      } catch (error) {
        setError((prevError) => [...prevError, error.response.data.message]);
      }
    }
  }
  return (
    <section className=" bg-[url('../src/assets/imgs/banner1.jpg')] bg-cover bg-center">
      <div className="container mx-auto py-6">
        <div className="mx-auto bg-white px-12 py-14 max-w-[550px] rounded-lg shadow-xl">
          <h2 className="capitalize text-center text-3xl mb-20 text-gray-500 font-light">
            Sign up
          </h2>
          {error && error.length > 0 && (
            <ul>
              {error.map((err) => (
                <li key={err} className="text-sm text-red-500 mb-2">
                  {err}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border-2 w-full p-6 border-b-0 placeholder:text-gray-500"
              ref={enteredName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 w-full p-6 border-b-0 placeholder:text-gray-500"
              ref={enteredEmail}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-2 w-full p-6 border-b-0 placeholder:text-gray-500"
              ref={enteredPassword}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="border-2 w-full p-6 placeholder:text-gray-500"
              ref={enteredPhone}
            />
            <button className="w-full text-white bg-primary-black mt-4 p-5 uppercase font-light">
              Sign up
            </button>
          </form>
          <p className="text-center mt-12 text-gray-400 font-light">
            Login?{" "}
            <Link to={`/login`} className="text-blue-500">
              Click
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
