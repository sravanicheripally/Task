// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from '../src/Component/Navbar';
import TaskList from '../src/Component/TaskList';
import TaskCreate from '../src/Component/CreateTask';
import Login from '../src/Component/Login';
import Signup from './Component/Signup';
import Logout from './Component/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/create-task" element={<TaskCreate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
