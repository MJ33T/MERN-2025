import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/addtask.css";
export default function UpdateTask() {
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleUpdateTask = async () => {};

  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id) => {
    let task = await fetch(`http://localhost:3000/task/${id}`);
    task = await task.json();

    if (task.data) {
      setTaskData(task.data);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Update Task</h1>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={taskData?.title}
          onChange={(event) =>
            setTaskData({ ...taskData, title: event.target.value })
          }
          name="title"
          placeholder="Enter task title"
        />
        <label htmlFor="">Description</label>
        <textarea
          value={taskData?.description}
          onChange={(event) =>
            setTaskData({ ...taskData, description: event.target.value })
          }
          rows={4}
          name="description"
          placeholder="Enter task description"
        ></textarea>
        <button onClick={handleUpdateTask} type="submit">
          Update Task
        </button>
      </div>
    </>
  );
}
