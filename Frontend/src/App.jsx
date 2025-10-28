import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import List from "./components/List";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Protected from "./components/Protected";
import SignUp from "./components/SignUp";
import UpdateTask from "./components/UpdateTask";
import "./style/App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <List />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <AddTask />
            </Protected>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update/:id"
          element={
            <Protected>
              <UpdateTask />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
