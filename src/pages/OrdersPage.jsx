import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_URL_BACKEND;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/orders`, {
          withCredentials: true,
        });
        setOrders(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <section>
      <div className="container mx-auto">
        {/* Tiêu đề trang */}
        <div className="uppercase flex md:flex-row flex-col justify-between items-center md:px-20 py-16 bg-[#F6F9F6]">
          <h2 className="text-3xl tracking-wider">History</h2>
          <p className="text-gray-400">History</p>
        </div>
        <div className="w-full mt-24 overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="capitalize">
                <th>ID Order</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th className="w-[150px]">Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center text-sm text-[#8b8a8b]"
                >
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.delivery}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link
                      to={`/orders/${order._id}`}
                      className="border-[1px] border-black p-2 w-full"
                    >
                      View
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-4 inline ml-2 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
