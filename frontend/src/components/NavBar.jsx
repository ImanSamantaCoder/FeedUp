import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/listings/check-auth", {
          withCredentials: true, // Send cookies/session data
        });

        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex">
        <a className="navbar-brand" href="/">
          <img src="/assets/facebook_logo.png" style={{ height: "44px" }} alt="Logo" />
        </a>

        <form className="d-flex mx-auto" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div className="d-flex ms-auto align-items-center">
          {/* User Icon - Click to navigate to User List Page */}
          <Link to="/auth/users">
            <i className="fa-solid fa-user fa-2xl" style={{ cursor: "pointer" }}></i>
          </Link>

          {user ? <span className="ms-2">{user.username}</span> : <span className="ms-2">Not Logged In</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
