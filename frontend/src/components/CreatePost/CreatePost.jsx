import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file for styling
import Post from "../Post";

const CreatePost = () => {
  const [showFullForm, setShowFullForm] = useState(false);
  const [caption, setCaption] = useState("");
  const [insertText, setInsertText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
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

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Generate preview
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("insertText", insertText);

    try {
      await axios.post("http://localhost:8000/listings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post uploaded successfully!");
      // Refetch posts after successful submission
      const data = await axios.get("http://localhost:8000/listings");
      setPost([...data.data]);
      setShowFullForm(false); // Close form
      setCaption("");
      setInsertText("");
      setImage(null);
      setPreview(null);
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
          <div className="card p-3 create-card" onClick={() => setShowFullForm(true)}>
            <h4 className="text-primary">Create a Post</h4>
            <textarea
              className="form-control mb-2"
              placeholder="What's on your mind?"
              readOnly
            />
          </div>
        ) : (
          <div className="modal-container">
            <div className="card p-4 modal-content shadow-lg">
              <h4 className="text-center text-dark mb-3">Create a Post</h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Caption</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Extra Text</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Additional text (optional)"
                    value={insertText}
                    onChange={(e) => setInsertText(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {preview && (
                    <div className="mt-2 text-center">
                      <img src={preview} alt="Preview" className="img-thumbnail preview-img" />
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Upload Post
                </button>
              </form>

              {error && <div className="alert alert-danger mt-3">{error}</div>}

              <button
                className="btn btn-secondary mt-3 w-100"
                onClick={() => setShowFullForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {post.length > 0 ? (
        post.map((post, index) => <Post key={post._id || index} post={post} />)
      ) : (
        <p className="text-center mt-4">No posts available.</p>
      )}
    </>
  );
};

export default CreatePost;
