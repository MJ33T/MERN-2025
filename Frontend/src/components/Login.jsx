import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addtask.css";
export default function Login() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let response = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.success) {
      document.cookie = "token=" + response.token;
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Login</h1>

        <label htmlFor="">Email</label>
        <input
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="">Password</label>
        <input
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
          type="password"
          name="password"
          placeholder="Enter your password"
        />

        <button onClick={() => handleLogin()} type="submit">
          Login
        </button>
        <Link className="link" to="/signup">
          Don't have an account? Sign Up
        </Link>
      </div>
    </>
  );
}
