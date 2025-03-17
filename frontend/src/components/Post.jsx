import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/listings/check-auth", {
          withCredentials: true,
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/listings/${post._id}`, {
        withCredentials: true, // ✅ Send cookies/session data for authentication
      });

      alert(response.data.message); // Show success message
      window.location.reload(); // Reload to update UI
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post!");
    }
  };

  return (
    <div
      className="container mt-5 p-4 shadow rounded d-flex flex-column"
      style={{
        backgroundColor: "#1877f2",
        margin: "auto",
        maxWidth: "50%",
        minHeight: "400px",
        color: "white",
      }}
    >
      <h1><i className="fa-solid fa-user-circle me-2" style={{ fontSize: "44px" }}></i>{post.owner.username}</h1>
      <br/>
      <br/>
      <h2 className="text-center fw-bold">{post.caption || "No Caption"}</h2>
      <p className="text-center fst-italic">{post.insertText || "No additional text"}</p>

      {post.imageUrl ? (
          <img
          src={post.imageUrl}
          alt="Post"
          className="img-fluid rounded"
          style={{
            width: "100%",         // Full width of the container
            maxHeight: "400px",    // Limits height without cutting
            objectFit: "contain",  // Ensures full image visibility
            borderRadius: "10px",
            display: "block",      // Removes extra space around the image
            margin: "0 auto"       // Centers the image if needed
          }}
        />
      
      ) : (
        <p className="text-center">No Image Available</p>
      )}

      {/* Delete Button (Only for Post Owner) */}
      {user && user._id === post.owner._id && (
        <button className="btn btn-danger mt-3" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i> Delete
        </button>
      )}

      <div className="mt-auto pt-3 d-flex justify-content-between">
        <button className="btn btn-light shadow-sm">
          <i className="fa-solid fa-thumbs-up" style={{ color: "#235cbe" }}></i> 0 Likes
        </button>
        <button className="btn btn-light shadow-sm">
          <i className="fa-solid fa-comments" style={{ color: "#63E6BE" }}></i> 0 Comments
        </button>
      </div>
    </div>
  );
};

export default Post;
