import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addtask.css";
export default function AddTask() {
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();
  const handleAddTask = async () => {
    console.log(taskData);
    let result = await fetch("http://localhost:3000/add-task", {
      method: "post",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Add Task</h1>
        <label htmlFor="">Title</label>
        <input
          type="text"
          onChange={(event) =>
            setTaskData({ ...taskData, title: event.target.value })
          }
          name="title"
          placeholder="Enter task title"
        />
        <label htmlFor="">Description</label>
        <textarea
          onChange={(event) =>
            setTaskData({ ...taskData, description: event.target.value })
          }
          rows={4}
          name="description"
          placeholder="Enter task description"
        ></textarea>
        <button onClick={handleAddTask} type="submit">
          Add Task
        </button>
      </div>
    </>
  );
}
