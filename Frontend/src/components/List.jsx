import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/list.css";

export default function List() {
  const [taskData, setTaskData] = useState();

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3000/tasks");
    list = await list.json();
    if (list.success) {
      setTaskData(list.data);
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch(`http://localhost:3000/delete-task/${id}`, {
      method: "delete",
    });

    item = await item.json();
    if (item.success) {
      getListData();
    }
  };
  return (
    <div>
      <h1>Task List</h1>
      <ul className="task-list">
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
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
