import { useSelector } from "react-redux";

export default function CartTotal() {
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const subTotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#F6F9F6] px-6 py-12">
      <h2 className="uppercase font-medium text-xl mb-6">Cart total</h2>
      <div className="flex justify-between  items-end pb-3 border-b-2">
        <h3 className="uppercase text-sm font-medium">Subtotal</h3>
        <p className="text-sm text-gray-400">
          {Number(subTotal).toLocaleString() + " VND"}
        </p>
      </div>
      <div className="flex justify-between items-end pt-3 mb-8">
        <h3 className="uppercase font-medium text-sm">total</h3>
        <p className="text-lg text-gray-600 font-light">
          {Number(subTotal).toLocaleString() + " VND"}
        </p>
      </div>
      <div>
        <input
          type="text"
          className="w-full border-2 py-2 px-3 placeholder:text-sm placeholder:font-light"
          placeholder="Enter your coupon"
        />
        <button className="flex justify-center gap-3 w-full py-2 text-white bg-primary-black font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
          </svg>
          Apply coupon
        </button>
      </div>
    </div>
  );
}
