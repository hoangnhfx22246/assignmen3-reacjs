import { useSelector } from "react-redux";

export default function CheckoutOrder() {
  const cartList = useSelector((state) => state.cart.cart.listCart);
  const subTotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#F6F9F6] md:p-10 px-2 py-6">
      <h2 className="uppercase text-xl tracking-wider mb-8 font-medium">
        Your Order
      </h2>
      {cartList.map((cart) => (
        <div
          key={cart.id}
          className="flex justify-between items-center pt-3 mb-8"
        >
          <h3 className="font-medium text-sm line-clamp-2">{cart.name}</h3>
          <p className="min-w-[150px] text-right text-sm text-gray-400 font-light inline-block">
            {`${Number(cart.price).toLocaleString()} VND x ${cart.quantity}`}
          </p>
        </div>
      ))}
      <div className="flex justify-between items-end pt-3 mb-8">
        <h3 className="uppercase font-medium">total</h3>
        <p className=" text-gray-500 font-light">
          {Number(subTotal).toLocaleString() + " VND"}
        </p>
      </div>
    </div>
  );
}
