// src/components/TaskDelete.js
import React from 'react';
import axios from 'axios';

const TaskDelete = ({ taskId, onTaskDeleted }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/tasks/delete/${taskId}/`);
            onTaskDeleted(); // Notify parent to refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete Task</button>
    );
};

export default TaskDelete;
