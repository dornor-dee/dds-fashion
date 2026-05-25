import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const loadOrders = async () => {
      if (!userInfo) return;

      try {
        const { data } = await API.get(
          `/api/orders/myorders/${userInfo._id}`
        );
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadOrders();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Please login first.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black text-yellow-400">
          My Orders
        </h1>

        <div className="mt-10 space-y-6">
          {orders.length === 0 ? (
            <p className="text-white/60">
              No orders yet.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60">
                      Order ID
                    </p>

                    <h2 className="font-black">
                      {order._id}
                    </h2>
                  </div>

                  <div>
                    <p
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        order.isPaid
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </p>

                   <p
  className={`mt-2 rounded-full px-4 py-1 text-sm font-bold ${
    order.isDelivered
      ? "bg-blue-500/20 text-blue-400"
      : "bg-orange-500/20 text-orange-400"
  }`}
>
  {order.isDelivered
    ? `Delivered ${
        order.deliveredAt
          ? new Date(order.deliveredAt).toLocaleDateString()
          : ""
      }`
    : "Not Delivered"}
</p>


                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold">
                          {item.name}
                        </h3>

                        <p className="text-white/60">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <p className="font-black text-yellow-400">
                        ₵{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <p className="text-white/60">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-2xl font-black text-yellow-400">
                    ₵{order.totalPrice}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}