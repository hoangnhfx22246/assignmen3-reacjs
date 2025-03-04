import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetailPage() {
  const param = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_URL_BACKEND;
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendUrl}/orders/${param.id}`, {
          withCredentials: true,
        });
        setOrder(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [param.id]);

  return (
    <section>
      {order && (
        <div className="container mx-auto">
          <h2 className="uppercase text-xl tracking-wider mt-10 mb-8 font-medium">
            Information order
          </h2>
          <p className="text-[#B2B0AF] text-sm">ID User: {order._id}</p>
          <p className="text-[#B2B0AF] text-sm">Full Name: {order.name}</p>
          <p className="text-[#B2B0AF] text-sm">Phone: {order.phone}</p>
          <p className="text-[#B2B0AF] text-sm">Address: {order.address}</p>
          <p className="text-[#B2B0AF] text-sm">
            Total: {Number(order.totalAmount).toLocaleString() + " VND"}
          </p>
          <div className="w-full mt-24 overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr>
                  <th>id product</th>
                  <th className="w-[150px]">image</th>
                  <th>name</th>
                  <th>price</th>
                  <th>count</th>
                </tr>
              </thead>
              <tbody>
                {order.carts.map((cart) => (
                  <tr key={cart._id} className="text-center text-sm">
                    <td>{cart.product.id}</td>
                    <td>
                      <img
                        src={cart.product.img}
                        alt={cart.product.name}
                        className="w-full"
                      />
                    </td>
                    <td>{cart.product.name}</td>
                    <td>
                      {Number(cart.product.price).toLocaleString() + " VND"}
                    </td>
                    <td>{cart.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
