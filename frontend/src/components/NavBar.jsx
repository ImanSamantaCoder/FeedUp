import React, { useEffect, useState } from "react";
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
        {/* Brand Name */}
        <a className="navbar-brand" href="#">
          <img src="/assets/facebook_logo.png" style={{ height: "44px" }} alt="Logo" />
        </a>

        {/* Search Bar */}
        <form className="d-flex mx-auto" role="search" style={{ flex: "1", maxWidth: "100%" }}>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        {/* Navbar Toggler for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Right-Aligned Components (Icons & User Info) */}
          <div className="d-flex ms-auto align-items-center">
            <i className="fa-solid fa-video fa-2xl"></i>
            <i className="mx-3"></i>
            <i className="mx-3"></i>

            {/* Display user if authenticated */}
            {user ? (
              <span className="ms-2">
                <i className="fa-solid fa-user fa-2xl"></i> {user.username}
              </span>
            ) : (
              <span className="ms-2">Not Logged In</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
