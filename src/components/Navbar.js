"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id == uid);

    if (user) setUserName(user.name);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Task Management
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 text-slate-600">
            <UserCircle2 size={22} />
            <span className="hidden sm:inline font-medium">
              {userName || "User"}
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
