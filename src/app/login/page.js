"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email.toLowerCase().trim() &&
        u.password === password.trim(),
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    setLoading(true);

    alert("Login successful!");

    localStorage.setItem("currentUser", user.id);
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white w-96 p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-6">Login to continue</p>

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <Mail className="text-gray-400 mr-2" size={18} />
          <input
            placeholder="Email"
            className="outline-none w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-2">
          <Lock className="text-gray-400 mr-2" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="outline-none w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-semibold bg-blue-600 flex justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="mt-6 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-700 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
