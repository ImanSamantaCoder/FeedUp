import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
import UsersList from "./Pages/UsersList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />{/*This is a route for login route,login page will be appered on this route*/}
      <Route path="/SignUp" element={<SignUp/>} />{/*This is a route for signup route,signup page will be appered on this route*/}
      <Route path="/auth/users" element={<UsersList />} />{/*This is a route for userList route,userList page will be appered on this route*/}
      
    </Routes>
  );
}

export default App;
