import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './pages/TaskAddPage.jsx';
import TaskListPage from './pages/TaskListPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTask />} />
        <Route path="/tasks" element={<TaskListPage />} />
      </Routes>
    </Router>
  );
}

export default App;