import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/users/login", form);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      alert("Login successful");

      window.location.href = "/";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={loginUser}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <h1 className="text-4xl font-black text-yellow-400">
          Welcome Back
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50"
        />

        <button className="mt-6 w-full rounded-full bg-yellow-400 px-6 py-4 font-bold text-black hover:bg-yellow-300">
          Login
        </button>
      </form>
    </main>
  );
}