import { useSelector } from "react-redux";
import CheckoutForm from "../Components/CheckoutForm";
import CheckoutOrder from "../Components/CheckoutOrder";

export default function CheckoutPage() {
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const subTotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <section>
      <div className="container mx-auto">
        {/* Tiêu đề trang */}
        <div className="uppercase flex md:flex-row flex-col justify-between items-center px-20 py-16 bg-[#F6F9F6]">
          <h2 className="text-3xl tracking-wider">Checkout</h2>
          <div className="flex gap-2">
            <p>Home</p>
            <p>/</p>
            <p>cart</p>
            <p>/</p>
            <span className="text-gray-400">checkout</span>
          </div>
        </div>
        <h2 className="uppercase text-xl tracking-wider mt-10 mb-8 font-medium">
          Billing details
        </h2>
        <div className="flex flex-col md:grid mt-4 lg:grid-cols-3 grid-cols-5 gap-8">
          <div className="lg:col-span-2 col-span-3">
            <CheckoutForm cartList={cartList} subTotal={subTotal} />
          </div>
          <div className="lg:col-span-1 col-span-2 order-first md:order-none">
            <CheckoutOrder cartList={cartList} subTotal={subTotal} />
          </div>
        </div>
      </div>
    </section>
  );
}
