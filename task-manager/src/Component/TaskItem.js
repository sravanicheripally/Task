import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import '../css/tasklist.css'; // Import your custom CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/tasks/')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch tasks');
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task List</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text"><strong>Status:</strong> {task.status}</p>
                <p className="card-text"><strong>Created on:</strong> {new Date(task.creation_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
