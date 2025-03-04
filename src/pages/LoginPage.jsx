import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notEmptyValue } from "../validate/validate";
import { useDispatch } from "react-redux";
import { currentUserAction } from "../store/currentUser";
import axios from "axios";

export default function LoginPage() {
  // xử lý input
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch(); //* Lấy hàm dispatch từ Redux để có thể dispatch các action

  // state error message
  const [error, setError] = useState([]);
  // * submit handler
  async function submitHandler(e) {
    e.preventDefault();
    setError([]); //reset to default error
    if (
      // check empty
      !notEmptyValue(enteredEmail.current.value) ||
      !notEmptyValue(enteredPassword.current.value)
    ) {
      setError((prevError) => [...prevError, "Please fill in all information"]);
      return;
    }

    // call login api
    const backendUrl = import.meta.env.VITE_URL_BACKEND;

    try {
      const res = await axios.post(
        `${backendUrl}/auth/login`,
        {
          email: enteredEmail.current.value,
          password: enteredPassword.current.value,
        },
        { withCredentials: true }
      );
      const dt = res.data;

      if (dt) {
        dispatch(
          currentUserAction.ON_LOGIN({
            user: dt.result,
            token: dt.token,
            expireAt: dt.expiresAt,
          })
        ); //* cập nhật lại state current user trong redux
        navigate("/");
      } else {
        setError((prevError) => [...prevError, "Incorrect email or password"]);
        enteredPassword.current.value = "";
      }
    } catch (error) {
      setError((prevError) => [...prevError, error.response.data.message]);
    }

    return;
  }
  return (
    <section className=" bg-[url('../src/assets/imgs/banner1.jpg')] bg-cover bg-center">
      <div className="container mx-auto py-6">
        <div className="mx-auto bg-white px-12 py-14 max-w-[550px] rounded-lg shadow-xl">
          <h2 className="capitalize text-center text-3xl mb-20 text-gray-500 font-light">
            Sign in
          </h2>
          {error.map((err, index) => (
            <li key={index} className="text-sm text-red-500 mb-2">
              {err}
            </li>
          ))}
          <form onSubmit={submitHandler}>
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
              className="border-2 w-full p-6 placeholder:text-gray-500"
              ref={enteredPassword}
            />
            <button className="w-full text-white bg-primary-black mt-4 p-5 uppercase font-light">
              Sign in
            </button>
          </form>
          <p className="text-center mt-12 text-gray-400 font-light">
            Create an account?{" "}
            <Link to={`/register`} className="text-blue-500">
              Click
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
