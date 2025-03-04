import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartList({ cartList }) {
  //* cart redux
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="md:w-[100px] w-[80px]">IMAGE</th>
            <th className="md:w-[200px]">Product</th>
            <th className="md:w-[80px] md:table-cell hidden">price</th>
            <th className="md:table-cell hidden">quantity</th>
            <th className="md:w-[80px] w-[50px]">total</th>
            <th className="w-[50px]">remove</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between bg-[#F6F9F6] py-4 px-6 font-light text-sm text-gray-500">
        <Link to={"/shop"} className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          Continue shopping
        </Link>
        <Link
          to={"/checkout"}
          className="flex items-center gap-2 border-2 p-2 border-primary-black"
        >
          Proceed to checkout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
