"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // validation
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError("All fields are required");
      return;
    }

    if (trimmedName.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    const emailValidate = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailValidate.test(trimmedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    if (trimmedPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === trimmedEmail.toLowerCase())) {
      setError("Email already registered");
      return;
    }

    setLoading(true);

    const newUser = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      password: trimmedPassword,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Registration successful!");

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="bg-white w-96 p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-6">Create Account 🚀</h2>

        {/* Name */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <User className="text-gray-400 mr-2" size={18} />
          <input
            placeholder="Full Name"
            className="outline-none w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-semibold bg-indigo-600 flex justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
