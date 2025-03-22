import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LikeButton({ postId, currentUserId }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likedBy, setLikedBy] = useState([]); // Users who liked the post
  const [showLikedBy, setShowLikedBy] = useState(false); // Toggle visibility

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/listings/${postId}/like`, {
          withCredentials: true,
        });

        console.log("Fetched Likes:", response.data);

        setLikesCount(response.data.likesCount);
        setLikedBy(response.data.likedBy || []);
        setLiked(response.data.likedBy.some(user => user._id === currentUserId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId, likesCount]);

  const handleLike = async () => {
    if (!postId) {
      console.error("Post ID is undefined, cannot like post.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/listings/${postId}/like`, {}, {
        withCredentials: true,
      });

      console.log("Like Response:", response.data);

      setLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      setLikedBy(response.data.likedBy || []);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      {/* Like Button */}
      <button className="btn btn-light shadow-sm" onClick={handleLike}>
        <i className={`fa-solid fa-thumbs-up ${liked ? "text-primary" : ""}`} style={{ color: liked ? "#235cbe" : "#000" }}></i>
        {likesCount} Likes
      </button>

      {/* Button to Show Who Liked */}
      <button 
        className="btn btn-sm btn-secondary mx-2"
        onClick={() => setShowLikedBy(!showLikedBy)}
      >
        {showLikedBy ? "Hide Likes" : "See Who Liked"}
      </button>

      {/* Display Users Who Liked (only if showLikedBy is true) */}
      {showLikedBy && (
        <p>
          {likedBy.length > 0 ? (
            likedBy.map((user) => (
              <span key={user._id} style={{ marginRight: "8px", fontWeight: "bold" }}>
                {user.username}
              </span>
            ))
          ) : (
            "No likes yet"
          )}
        </p>
      )}
    </>
  );
}
