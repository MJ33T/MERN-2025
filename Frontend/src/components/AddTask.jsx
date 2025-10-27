import "../style/addtask.css";
export default function AddTask() {
  return (
    <div className="container">
      <h1>Add Task</h1>
      <form action="">
        <label htmlFor="">Title</label>
        <input type="text" name="title" placeholder="Enter task title" />
        <label htmlFor="">Description</label>
        <textarea
          rows={4}
          name="description"
          placeholder="Enter task description"
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
