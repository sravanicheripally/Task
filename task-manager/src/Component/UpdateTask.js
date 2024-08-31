// src/components/TaskUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskUpdate = ({ task, onTaskUpdated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { title, description, status };

        try {
            await axios.put(`http://localhost:8000/tasks/update/${task.id}/`, data);
            onTaskUpdated(); // Notify parent to refresh the task list
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (!task) return null; // Hide the form if no task is selected

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Task</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To-Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button type="submit">Update Task</button>
        </form>
    );
};

export default TaskUpdate;
