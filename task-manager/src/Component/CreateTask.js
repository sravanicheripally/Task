// src/components/TaskCreate.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskCreate = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { title, description, status };

        try {
            await axios.post('http://localhost:8000/tasks/create/', data);
            setTitle('');
            setDescription('');
            setStatus('todo');
            onTaskCreated(); // Notify parent to refresh the task list
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
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
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskCreate;
