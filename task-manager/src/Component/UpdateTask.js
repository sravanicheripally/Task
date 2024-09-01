import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const TaskUpdate = () => {
    const { taskId } = useParams(); // Get the taskId from the URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [user, setUser] = useState(''); // New state for the user field
    const [users, setUsers] = useState([]); // To store the list of users
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the task details using the taskId (GET request)
        axiosInstance.get(`/tasks/update/${taskId}/`) // Correct the endpoint to match your Django URL pattern
            .then(response => {
                const task = response.data;
                setTitle(task.title);
                setDescription(task.description);
                setStatus(task.status);
                setUser(task.user); // Set the user field
            })
            .catch(error => {
                setError('Error fetching task details');
                console.error('Error fetching task details:', error);
            });

        // Fetch the list of users to populate the dropdown
        axiosInstance.get('/users/')
            .then(response => {
                setUsers(response.data); // Assuming the response is a list of users
            })
            .catch(error => {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            });
    }, [taskId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { title, description, status, user };
    
        try {
            await axiosInstance.put(`/tasks/update/${taskId}/`, data); // `PUT` request for updating
            navigate('/tasks'); // Redirect to the task list after updating
        } catch (error) {
            setError('Error updating task');
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Update Task</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="user" className="form-label">Assigned User</label>
                    <select
                        id="user"
                        className="form-select"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.username}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update Task</button>
            </form>
        </div>
    );
};

export default TaskUpdate;
