import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addtask.css";
export default function SignUp() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("login");
    if (loggedInUser) {
      navigate("/");
    }
  }, []);

  const handleSignup = async () => {
    let response = await fetch("http://localhost:3000/signup", {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.success) {
      document.cookie = "token=" + response.token;
      localStorage.setItem("login", userData.email);
      navigate("/");
    } else {
      alert("Signup failed. Please try again.");
    }
  };
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

        <button onClick={() => handleSignup()} type="submit">
          Sign Up
        </button>
        <Link className="link" to="/login">
          Already have an account? Login
        </Link>
      </div>
    </>
  );
}
