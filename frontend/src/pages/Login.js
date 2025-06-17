import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }
    if (password.length < 6) {
      return handleError("Password must be at least 6 characters long");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, token, user } = result;

      if (success) {
        handleSuccess(message);
        const storage = localStorage;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email); // optional

        console.log(storage);

        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
  
      if (!success) {
        return handleError(message || "Login failed, please try again");
      }
      // Log the result for debugging purposes
      console.log(result);
    } catch (error) {
      console.error("Error during signup:", error);
      handleError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="main-container">
    <div className="header-container">
      <h1>Login</h1>
      <form action="" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email id"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have account?
          <Link to="/signup">SignUp </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Login;
