import { useEffect, useState } from "react";
import "./TaskListPage.css";

function TaskListPage() {
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    fetch("http://localhost:8080/tasks") 
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

return (
    <div className="tasklist-container">
        <div className="tasklist-card">
            <h2>All Tasks</h2>
            <button
                className="back-btn"
                onClick={() => window.location.href = "/"}
                style={{ marginBottom: "16px" }}
            >
                Back to Create Task
            </button>
            {tasks.length === 0 ? (
                <p>No tasks available. Add one first!</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);
}

export default TaskListPage;