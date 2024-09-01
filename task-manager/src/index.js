import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Component/Navbar';
import TaskList from './Component/TaskItem';
import TaskCreate from './Component/CreateTask';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Logout from './Component/Logout';
import TaskUpdate from './Component/UpdateTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Component/Home'; // Adjust the path if necessary

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Carousel />} /> {/* Display Carousel on Home */}
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/create-task" element={<TaskCreate />} />
      <Route path="/tasks/update/:taskId" element={<TaskUpdate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
