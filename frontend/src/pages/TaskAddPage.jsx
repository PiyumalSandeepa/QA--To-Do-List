import { useState } from "react";
import "./TaskAddPage.css";
import axios from "axios";

function TaskAddPage({ onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    axios.post("http://localhost:8080/tasks", { title, description })
      .then((response) => {
        if (onSave) {
          onSave(response.data);
        }
      })
      .catch((error) => {
        alert("Failed to save task.");
        console.error(error);
      });
    setTitle("");
    setDescription("");
    //alert("Task saved successfully!");
    window.location.href = "/tasks";
  };

return (
    <div className="taskadd-container">
        <div className="taskadd-card">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Save Task</button>
            </form>
            <button
                type="button"
                onClick={() => (window.location.href = "/tasks")}
                style={{ marginTop: "10px" }}
            >
                Go to Task List
            </button>
        </div>
    </div>
);
}

export default TaskAddPage;
