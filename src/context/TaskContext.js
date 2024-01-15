// TaskContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = async (title, taskDesc) => {
    const response = await axios.post('http://localhost:3004/tasks', {
      title,
      taskDesc,
    });
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => task.id !== id);
    setTasks(afterDeletingTasks);
  };

  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: updatedTitle, taskDesc: updatedTaskDesc } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3004/tasks');
    setTasks(response.data);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTaskById,
        editTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
