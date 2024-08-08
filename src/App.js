import React, { useState } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTasks((prevSelectedTasks) => { 
      const updatedSet = new Set(prevSelectedTasks);
      updatedSet.delete(id);
      return updatedSet;
    });
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSelectTask = (id) => {
    setSelectedTasks((prevSelectedTasks) => {
      const updatedSet = new Set(prevSelectedTasks);
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else {
        updatedSet.add(id);
      }
      return updatedSet;
    });
  };

  const handleRemoveSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  };

  return (
    <div className="App">
      <h1>Todo List Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>+ Add</button>
      </div>
      <button
        className="delete-selected"
        onClick={handleRemoveSelectedTasks}
        disabled={selectedTasks.size === 0}
      >
        <FaTrash />
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="task-item"
            onDoubleClick={() => handleRemoveTask(task.id)}
          >
            <input
              type="checkbox"
              checked={selectedTasks.has(task.id)}
              onChange={() => handleSelectTask(task.id)}
            />
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleRemoveTask(task.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
