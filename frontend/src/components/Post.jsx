import React from "react";

const Post = ({ post }) => {
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
      {/* Post Header */}
      <h2 className="text-center fw-bold">{post.caption || "No Caption"}</h2>
      <p className="text-center fst-italic">{post.insertText || "No additional text"}</p>

      {/* Post Image */}
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt="Post"
          className="img-fluid rounded"
          style={{ width: "100%", height: "auto", maxHeight: "250px", objectFit: "cover" }}
        />
      ) : (
        <p className="text-center">No Image Available</p>
      )}

      {/* Post Actions (Placed at the Bottom) */}
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
