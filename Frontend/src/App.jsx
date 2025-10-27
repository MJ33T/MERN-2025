import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import List from "./components/List";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import UpdateTask from "./components/UpdateTask";
import "./style/App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<UpdateTask />} />
      </Routes>
    </>
  );
}

export default App;
