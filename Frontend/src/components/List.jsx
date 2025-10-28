import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/list.css";

export default function List() {
  const [taskData, setTaskData] = useState();
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3000/tasks", {
      credentials: "include",
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.data);
    } else {
      alert("Failed to fetch tasks");
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch(`http://localhost:3000/delete-task/${id}`, {
      method: "delete",
      credentials: "include",
    });

    item = await item.json();
    if (item.success) {
      getListData();
    } else {
      alert("Failed to delete tasks");
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      let items = taskData.map((item) => item._id);

      setSelectedTasks(items);
    } else {
      setSelectedTasks([]);
    }
  };

  const setSingleItem = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((item) => item !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const deleteMultiple = async () => {
    let item = await fetch(`http://localhost:3000/delete-task-multiple`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedTasks }),
    });

    item = await item.json();
    if (item.success) {
      getListData();
    } else {
      alert("Failed to delete tasks");
    }
  };
  return (
    <div className="list-container">
      <h1>Task List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                  checked={selectedTasks.includes(item._id)}
                  type="checkbox"
                  onChange={() => {
                    setSingleItem(item._id);
                  }}
                />
              </li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  onClick={() => deleteTask(item._id)}
                  className="delete-item"
                >
                  Delete
                </button>
                <Link to={`/update/${item._id}`} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}
