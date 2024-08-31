// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks from the Django API
    axios
      .get('http://localhost:8000/tasks/create/', {
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch tasks');
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created on: {new Date(task.creation_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
