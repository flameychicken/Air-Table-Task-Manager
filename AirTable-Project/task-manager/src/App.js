// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, removeTask } from './AirtableService';
import HeaderBar from './components/HeaderBar';
import TaskModal from './components/TaskModal';
import PriorityBoard from './components/PriorityBoard';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks. Please check your API settings.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (newTaskData) => {
    const createdTask = await createTask(newTaskData);
    if (createdTask) {
      setTasks(prev => [...prev, createdTask]);
    }
  };

  const handleRemoveTask = async (taskId) => {
    const deletedTaskId = await removeTask(taskId);
    if (deletedTaskId) {
      setTasks(prev => prev.filter(t => t.id !== deletedTaskId));
    }
  };

  return (
    <div className="App">
      <HeaderBar onOpenModal={() => setShowModal(true)} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <PriorityBoard tasks={tasks} onRemove={handleRemoveTask} />
      )}
      <TaskModal
        isOpen={showModal}
        onCloseModal={() => setShowModal(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;
