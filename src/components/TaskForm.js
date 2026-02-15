"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    if (!title.trim()) return;

    const currentUserId = localStorage.getItem("currentUser");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      id: Date.now(),
      userId: currentUserId,
      title: title.trim(),
      status: "Pending",
      dueDate,
      priority,
      createdAt: Date.now(),
    };

    const updated = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updated));

    setTitle("");
    setDueDate("");
    setPriority("Medium");

    onTaskAdded(updated);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-8">
      <h3 className="font-semibold mb-3">Add New Task</h3>

      <div className="grid md:grid-cols-4 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="border rounded-lg px-3 py-2 col-span-2"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button
        onClick={handleAddTask}
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <PlusCircle size={18} /> Add Task
      </button>
    </div>
  );
}
