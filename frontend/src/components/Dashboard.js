import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function Dashboard({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();
  }, [token]);

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/tasks/${id}`,
        { completed: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button
              onClick={() => handleEditTask(task.id, { name: "Updated Task" })}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleMarkComplete(task.id)}>
              {task.completed ? "Completed" : "Mark as Complete"}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddTask({ name: "New Task" })}>
        Add Task
      </button>
    </div>
  );
}

export default Dashboard;
