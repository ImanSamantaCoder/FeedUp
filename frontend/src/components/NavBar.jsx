import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex">

        {/* Brand Name */}
        <a className="navbar-brand" href="#"><img src="/assets/facebook_logo.png" style={{height:"44px"}}></img></a>
        <form className="d-flex mx-auto" role="search" style={{ flex: "1", maxWidth: "100%" }}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
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
          {/* Navigation Links */}
         

          {/* Search Bar (Centered) */}
         

          {/* Right-Aligned Components (Buttons, User Icon, etc.) */}
          <div className="d-flex ms-auto">
            <i className="fa-solid fa-video fa-2xl"></i>
            <i className="mx-3"></i>
            <i className="mx-3"></i>
            <i className="fa-solid fa-user fa-2xl"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
