import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import '../css/tasklist.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/tasks/')
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch tasks');
        console.error(error);
      });
  }, []);

  const handleUpdate = (taskId) => {
    // Navigate to the update page or open a modal for updating
    navigate(`/tasks/update/${taskId}`);
  };

  const handleDelete = (taskId) => {
    axiosInstance
      .delete(`/tasks/delete/${taskId}/`)
      .then(() => {
        // Remove the deleted task from the state
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        setError('Failed to delete task');
        console.error(error);
      });
  };

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
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleUpdate(task.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
