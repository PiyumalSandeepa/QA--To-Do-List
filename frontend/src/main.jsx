import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import TaskAddPage from './pages/TaskAddPage.jsx'
import TaskListPage from './pages/TaskListPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App   />
  </StrictMode>,
)
