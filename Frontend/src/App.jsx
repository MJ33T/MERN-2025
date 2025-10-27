import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import "./style/App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Task List</h1>} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </>
  );
}

export default App;
