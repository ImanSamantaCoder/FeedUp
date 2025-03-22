import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"; // Importing CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/auth/signup", formData);
      if (response.data.success) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-signup">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;