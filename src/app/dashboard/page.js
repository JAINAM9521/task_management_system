"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const u = users.find((x) => x.id == uid);
    if (!u) return router.push("/login");

    setUser(u);
    setTasks(allTasks.filter((t) => t.userId == uid));
  }, []);

  const refreshTasks = (allTasks) => {
    const uid = localStorage.getItem("currentUser");
    setTasks(allTasks.filter((t) => t.userId == uid));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!user) return null;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
        {/* Top Bar */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-slate-500 text-sm">Here is your task overview</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Total Tasks</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">{total}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-green-600 mt-1">
              {completed}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-orange-500 mt-1">
              {total - completed}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-slate-500 text-sm mb-2">Progress</p>

            <div className="w-full bg-slate-200 h-3 rounded-full">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-slate-600 mt-2">{progress}% completed</p>
          </div>
        </div>

        {/* Task Form & List */}
        <TaskForm onTaskAdded={refreshTasks} />
        <TaskList tasks={tasks} refreshTasks={refreshTasks} />
      </div>
    </>
  );
}
