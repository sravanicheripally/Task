import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskCreate = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [user, setUser] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the backend
        axios.get('http://localhost:8000/users/')  // Correct endpoint for fetching users
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const getCsrfToken = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                return cookie.split('=')[1];
            }
        }
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            title,
            description,
            status,
            user, // Send user as a string (username)
        };
        console.log('user-----------', user);
        const csrfToken = getCsrfToken();
        console.log('Data to be sent:', data);

        try {
            await axios.post('http://localhost:8000/tasks/create/', data, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });
            setTitle('');
            setDescription('');
            setStatus('todo');
            setUser(''); // Reset user field if manually selected
            onTaskCreated(); // Notify parent to refresh the task list
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h2 className="mb-4">Create Task</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="todo">To-Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="user" className="form-label">Assign to User</label>
                <select
                    id="user"
                    className="form-select"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.username} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
    );
};

export default TaskCreate;
