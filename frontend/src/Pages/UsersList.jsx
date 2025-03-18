import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {{/*Here we are fethcing user who are logged in*/ }
        const authRes = await axios.get("http://localhost:8000/listings/check-auth", { withCredentials: true });
        if (authRes.data.authenticated) {
          setCurrentUser(authRes.data.user);//setting current user logged in
        }

        const usersRes = await axios.get("http://localhost:8000/auth/users", { withCredentials: true });//to get all user from db
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();//calling fatchuser function
  }, []);//one time loading when page load

  const handleFollow = async (userId) => {//function to follow a user,usedId will be passed here for those user ,current logged in user clickon
    try {
      const response = await axios.post(`http://localhost:8000/follow/${userId}`, {}, { withCredentials: true });

      // Update state
      setUsers(users.map(user => user._id === userId ? { ...user, followed: true } : user));
      setCurrentUser(prev => ({
        ...prev,
        following: [...prev.following, userId] // Update the following list
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:8000/follow/unfollow/${userId}`, {}, { withCredentials: true });

      // Update state
      setUsers(users.map(user => user._id === userId ? { ...user, followed: false } : user));//for state mananagement set user such that when i follow a user next time unfollow will be apperer
      setCurrentUser(prev => ({
        ...prev,
        following: prev.following.filter(id => id !== userId) // Remove from following list
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="container">
      <h2>Users</h2>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user._id} className="card p-3 mb-2">
            <h5>{user.username}</h5>
            {currentUser && currentUser.following.includes(user._id) ? (
              <button className="btn btn-danger" onClick={() => handleUnfollow(user._id)}>
                Unfollow
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleFollow(user._id)}>
                Follow
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
