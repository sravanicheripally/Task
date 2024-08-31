import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function TaskItem({ task }) {
  const handleDelete = () => {
    axiosInstance.delete(`/tasks/delete/${task.id}/`)
      .then(() => alert('Task deleted!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/tasks/update/${task.id}`}>Update</Link>
    </div>
  );
}

export default TaskItem;
