import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster, toast } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskTitle, setTaskTitle] = useState("Tasks");

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/myprofile",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("USER IS NOT AUTHENTICATED!");
        setIsAuthenticated(false);
        setUser({});
      }
    };
    handleGetUser();
  }, []); // Removed `isAuthenticated` from the dependency array to prevent an infinite loop

  return (
    <Router>
      <Header
        setTasks={setTasks}
        setTaskTitle={setTaskTitle}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              tasks={tasks}
              setTasks={setTasks}
              taskTitle={taskTitle}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile user={user} isAuthenticated={isAuthenticated} />} // Conditional rendering based on auth state
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
