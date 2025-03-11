import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file for styling
import Post from "../Post";

const CreatePost = () => {
  const [showFullForm, setShowFullForm] = useState(false);
  const [caption, setCaption] = useState("");
  const [insertText, setinsertText] = useState("");
  const [image, setImage] = useState(null);
  const [post, setPost] = useState([]);
  const [error, setError] = useState(""); // for error handling

  // Fetch posts once when the component mounts
  useEffect(() => {
    const update = async () => {
      try {
        const data = await axios.get("http://localhost:8000/listings");
        setPost([...data.data]);
      } catch (err) {
        setError("Error fetching posts!");
        console.error(err);
      }
    };
    update();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("insertText", insertText);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    try {
      const response = await axios.post(
        "http://localhost:8000/listings", // Backend API endpoint
        formData, // Send the formData directly
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Post uploaded successfully!");
      // Refetch posts after successful submission
      const data = await axios.get("http://localhost:8000/listings");
      setPost([...data.data]);
      setShowFullForm(false); // Close form
    } catch (error) {
      setError("Error creating post: " + (error.response?.data || error.message));
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        {showFullForm && <div className="overlay"></div>}

        {!showFullForm ? (
          <div className="card p-3" onClick={() => setShowFullForm(true)}>
            <h4>Create a Post</h4>
            <textarea
              className="form-control mb-2"
              placeholder="What's on your mind?"
            />
          </div>
        ) : (
          <div className="modal-container">
            <div className="card p-3 modal-content">
              <h4>Create a Post</h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Extra Text"
                  value={insertText}
                  onChange={(e) => setinsertText(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                <button type="submit">Upload</button>
              </form>

              {error && <div className="error-message">{error}</div>} {/* Display error message */}
              <button
                className="btn btn-secondary mt-2"
                onClick={() => setShowFullForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {post.length > 0 ? (
        post.map((post, index) => (
          <Post key={post._id || index} post={post} />
        ))
      ) : (
        <p className="text-center mt-4">No posts available.</p>
      )}
    </>
  );
};

export default CreatePost;
