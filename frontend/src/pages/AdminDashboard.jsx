import Admin from "./Admin";
import { Navigate } from "react-router-dom";
export default function AdminDashboard() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (!userInfo) {
  return <Navigate to="/login" />;
}

if (!userInfo.isAdmin) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-black text-red-400">
        Access Denied
      </h1>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside className="border-r border-white/10 bg-[#0b0b0b] p-6">
          <h1 className="text-2xl font-black text-yellow-400">
            DDS Admin
          </h1>
        <nav className="mt-10 space-y-3">
         < a
       href="#dashboard"
                className="block rounded-xl bg-yellow-400 px-4 py-3 font-bold text-black"
       >
            Dashboard
             </a>

           <a
            href="#products"
            className="block rounded-xl px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white"
     >
              Products
             </a>

            <a
              href="#orders"
            className="block rounded-xl px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white"
             >
             Orders
            </a>

             <a
              href="#analytics"
            className="block rounded-xl px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white"
        >
           Analytics
         </a>
         </nav>
        </aside>

        {/* CONTENT */}
        <section className="overflow-y-auto">
          <Admin />
        </section>
      </div>
    </main>
  );
}