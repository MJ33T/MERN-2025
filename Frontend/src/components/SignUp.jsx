import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/addtask.css";
export default function SignUp() {
  const [userData, setUserData] = useState();
  return (
    <>
      <div className="container">
        <h1>Sign Up</h1>
        <label htmlFor="">Name</label>
        <input
          onChange={(event) =>
            setUserData({ ...userData, name: event.target.value })
          }
          type="text"
          name="name"
          placeholder="Enter your name"
        />
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
          Sign Up
        </button>
        <Link className="link" to="/login">
          Already have an account? Login
        </Link>
      </div>
    </>
  );
}
