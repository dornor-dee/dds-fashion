import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/users/register", form);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      alert("Account created successfully");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form onSubmit={registerUser} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <h1 className="text-4xl font-black text-yellow-400">Create Account</h1>

        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50" />

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50" />

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50" />

        <button className="mt-6 w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300">
          Register
        </button>
      </form>
    </main>
  );
}