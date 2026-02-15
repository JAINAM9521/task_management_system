"use client";

import { useState } from "react";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

export default function TaskList({ tasks, refreshTasks }) {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // FILTER
  const filtered =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  // SORTING
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "due") {
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    }

    if (sortBy === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }

    if (sortBy === "latest") {
      return b.createdAt - a.createdAt;
    }

    return 0;
  });

  const toggleStatus = (id) => {
    const all = JSON.parse(localStorage.getItem("tasks")) || [];

    const updated = all.map((t) =>
      t.id === id
        ? {
            ...t,
            status: t.status === "Pending" ? "Completed" : "Pending",
          }
        : t,
    );

    localStorage.setItem("tasks", JSON.stringify(updated));
    refreshTasks(updated);
  };

  const deleteTask = (id) => {
    const all = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = all.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updated));
    refreshTasks(updated);
  };

  if (!tasks.length) return null;

  return (
    <div className="bg-white mt-6 rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Your Tasks</h3>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Pending", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}

        {/* SORT DROPDOWN */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-1 rounded-lg text-sm ml-auto"
        >
          <option value="latest">Sort</option>
          <option value="due">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {sorted.map((task) => (
        <div
          key={task.id}
          className={`flex justify-between items-center border p-3 rounded-lg mb-2 ${
            task.priority === "High"
              ? "border-red-300 bg-red-50"
              : task.priority === "Medium"
                ? "border-yellow-300 bg-yellow-50"
                : "border-green-300 bg-green-50"
          }`}
        >
          <div>
            <p className="font-medium">{task.title}</p>

            <div className="flex gap-2 mt-1 flex-wrap">
              {/* STATUS BADGE */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {task.status}
              </span>

              {/* PRIORITY BADGE */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-200 text-red-800"
                    : task.priority === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                }`}
              >
                {task.priority}
              </span>

              {/* DUE DATE */}
              {task.dueDate && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  Due: {task.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {task.status === "Completed" ? (
              <CheckCircle
                onClick={() => toggleStatus(task.id)}
                className="text-green-600 cursor-pointer"
              />
            ) : (
              <Circle
                onClick={() => toggleStatus(task.id)}
                className="text-red-500 cursor-pointer"
              />
            )}
            <Trash2
              onClick={() => deleteTask(task.id)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
