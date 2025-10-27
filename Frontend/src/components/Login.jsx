import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/addtask.css";
export default function Login() {
  const [userData, setUserData] = useState();
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

        <button onClick={() => console.log(userData)} type="submit">
          Login
        </button>
        <Link className="link" to="/signup">
          Don't have an account? Sign Up
        </Link>
      </div>
    </>
  );
}
