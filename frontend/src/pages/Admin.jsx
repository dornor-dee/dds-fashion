import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function Admin() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    countInStock: "",
  });

const uploadFileHandler = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await API.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setProduct({
      ...product,
      image: data.imageUrl,
    });

    alert("Image uploaded successfully");
  } catch (error) {
    console.log(error);
    alert("Image upload failed");
  }
};

  const [orders, setOrders] = useState([]);

useEffect(() => {
  const loadOrders = async () => {
    try {
      const productsRes = await API.get("/api/products");
       setProducts(productsRes.data);
      const { data } = await API.get("/api/orders");
      setOrders(data);
      API.get("/api/orders/analytics/summary")
  .then((res) => {
    setAnalytics(res.data);
  })
  .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  loadOrders();
}, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  
      const deleteProduct = async (id) => {
  if (!confirm("Delete this product?")) return;

  try {
    await API.delete(`/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
    alert("Product deleted");
  } catch (error) {
    console.log(error);
    alert("Failed to delete product");
  }
};

const startEditProduct = (item) => {
  setEditingProductId(item._id);

  setProduct({
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category,
    description: item.description,
    countInStock: item.countInStock,
  });
};

const updateProduct = async (e) => {
  e.preventDefault();

  try {
    const { data } = await API.put(
      `/api/products/${editingProductId}`,
      product
    );

    setProducts(
      products.map((item) =>
        item._id === editingProductId ? data : item
      )
    );

    setEditingProductId(null);

    setProduct({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
      countInStock: "",
    });

    alert("Product updated");
  } catch (error) {
    console.log(error);
    alert("Failed to update product");
  }
};

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/products", product);
      alert("Product added successfully");

      setProduct({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        countInStock: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (!userInfo.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <h1 className="text-3xl font-black text-red-400">
            Access Denied
          </h1>

          <p className="mt-3 text-white/70">
            You must be an admin to access this page.
          </p>
        </div>
      </main>
    );
  }

const markAsDelivered = async (id) => {
  try {
    const { data } = await API.put(
      `/api/orders/${id}/deliver`
    );

    setOrders(
      orders.map((order) =>
        order._id === id ? data : order
      )
    );

    alert("Order marked as delivered");
  } catch (error) {
    console.log(error);
    alert("Failed to update delivery");
  }
};

const deleteOrder = async (id) => {
  if (!confirm("Delete this order?")) return;

  try {
    await API.delete(`/api/orders/${id}`);

    setOrders(orders.filter((order) => order._id !== id));

    alert("Order deleted");
  } catch (error) {
    console.log(error);
    alert("Failed to delete order");
  }
};


  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1
  id="dashboard"
  className="text-4xl font-black text-yellow-400"
>
          DDS Fashion Admin
        </h1>

        <p className="mt-2 text-white/60">
          Add new products to your store.
        </p>
        {/* ANALYTICS */}
<div id="analytics">
  {analytics && (
  <div className="mb-10 grid gap-6 md:grid-cols-3">
    

    {/* REVENUE */}
    <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Revenue
      </p>

      <h2 className="mt-4 text-5xl font-black text-yellow-400">
        ₵{analytics.totalRevenue}
      </h2>
    </div>

    {/* ORDERS */}
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Orders
      </p>

      <h2 className="mt-4 text-5xl font-black">
        {analytics.totalOrders}
      </h2>
    </div>

    {/* CUSTOMERS */}
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Customers
      </p>

      <h2 className="mt-4 text-5xl font-black">
        {analytics.totalCustomers}
      </h2>
    </div>
  </div>
)}

        <form
  onSubmit={editingProductId ? updateProduct : addProduct}
  className="mt-8 space-y-4"
>
          <input name="name" value={product.name} onChange={handleChange} placeholder="Product name" className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none" />
          <input name="price" value={product.price} onChange={handleChange} placeholder="Price" type="number" className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none" />
          
          <div>
  <label className="mb-2 block text-sm font-bold text-yellow-400">
    Upload Product Image
  </label>

  <input
    type="file"
    onChange={uploadFileHandler}
    className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white"
  />
</div>
          <input name="category" value={product.category} onChange={handleChange} placeholder="Category" className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none" />
          <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none" />
          <input name="countInStock" value={product.countInStock} onChange={handleChange} placeholder="Stock quantity" type="number" className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none" />

          <button className="w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300">
  {editingProductId ? "Update Product" : "Add Product"}
</button>
        </form>
        
           
        {/* PRODUCTS TABLE */}
  <h2
  id="products"
  className="text-3xl font-black text-yellow-400"
>
  Store Products
</h2>

  <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10">
    <table className="w-full min-w-[800px]">
      <thead className="bg-white/10">
        <tr>
          <th className="p-4 text-left">Image</th>
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Category</th>
          <th className="p-4 text-left">Price</th>
          <th className="p-4 text-left">Stock</th>
          <th className="p-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr
            key={product._id}
            className="border-t border-white/10"
          >
            <td className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            </td>

            <td className="p-4 font-bold">
              {product.name}
            </td>

            <td className="p-4 text-white/60">
              {product.category}
            </td>

            <td className="p-4 text-yellow-400 font-black">
              ₵{product.price}
            </td>

            <td className="p-4">
              {product.countInStock}
            </td>

            <td className="p-4">
              <button
              onClick={() => startEditProduct(product)}
                    className="mr-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-400"
                 >
                 Edit
            </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-400"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

          <div className="mt-16">
          <h2
  id="orders"
  className="text-3xl font-black text-yellow-400"
>
  Customer Orders
</h2>
          <div className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <p className="text-white/60">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-black text-yellow-400">
                        {order.user?.name}
                      </h3>
                      <p className="text-white/60">{order.user?.email}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-yellow-400">
                        ₵{order.totalPrice}
                      </p>
                      <p className="text-sm text-white/50">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p
  className={`mt-2 rounded-full px-4 py-1 text-sm font-bold ${
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
  {order.isDelivered ? "Delivered" : "Not Delivered"}
</p>

{!order.isDelivered && (
  <button
    onClick={() => markAsDelivered(order._id)}
    className="mt-3 rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-400"
  >
    Mark Delivered
  </button>
)}
<button
  onClick={() => deleteOrder(order._id)}
  className="mt-3 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-400"
>
  Delete Order
</button>

                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-2xl border border-white/10 p-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />

                        <div className="flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-white/60">Qty: {item.qty}</p>
                        </div>

                        <p className="font-black text-yellow-400">
                          ₵{item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}