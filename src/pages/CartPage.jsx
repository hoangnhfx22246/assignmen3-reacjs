import { Link } from "react-router-dom";
import CartList from "../Components/CartList";
import CartTotal from "../Components/CartTotal";
import { useSelector } from "react-redux";

export default function CartPage() {
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const subTotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(cartList);

  return (
    <section>
      <div className="container mx-auto">
        {/* Tiêu đề trang */}
        <div className="uppercase flex md:flex-row flex-col justify-between items-center md:px-20 py-16 bg-[#F6F9F6]">
          <h2 className="text-3xl tracking-wider">Cart</h2>
          <p className="text-gray-400">cart</p>
        </div>

        <h2 className="uppercase text-xl tracking-wider mt-10 font-normal">
          Shopping Cart
        </h2>
        <div className="flex flex-col md:grid mt-4 grid-cols-3 gap-8">
          <div className="col-span-2">
            <CartList cartList={cartList} />
          </div>
          <div className="col-span-1 order-first md:order-none">
            <CartTotal cartList={cartList} subTotal={subTotal} />
          </div>
        </div>
      </div>
    </section>
  );
}
