import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Importing CSS file

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;