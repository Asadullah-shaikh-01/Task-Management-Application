import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import toast from "react-hot-toast";

const Header = ({
  setTasks,
  setIsAuthenticated,
  isAuthenticated,
  tasks,
}) => {
  const [allTasks, setAllTasks] = useState([]);
const navigateTo =useNavigate();
  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error fatching Tasks", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      navigateTo("/login")
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const FliterTasks = (filterType) => {
    let filterTasks = [];

    switch (filterType) {
      case "completed":
        filterTasks = allTasks.filter((tasks) => {
          tasks.status === "completed";
        });
        break;

      case "pending":
        filterTasks = allTasks.filter((tasks) => {
          tasks.status === "pending";
        });
        break;

      case "Archived":
        filterTasks = allTasks.filter((tasks) => {
          tasks.Archived === "Archived";
        });
        break;

      case "all":
        filterTasks = allTasks;
        break;

      default:
        filterTasks = allTasks;
    }
    setTasks(filterTasks);
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home"><Link to={"/"} className="text-decoration-none d-flex align-items-center link-dark">TASK MANAGEMENT APPLICATION</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={"/"}
              className="text-decoration-none d-flex align-items-center link-dark"
            >
              Home
            </Link>
            <br />
            <NavDropdown title="Fliter Task" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => FliterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => FliterTasks("complete")}>
                Complete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => FliterTasks("pending")}>
                Pending Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => FliterTasks("Archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to={"/profile"}
              className="text-decoration-none d-flex align-items-center link-dark"
            >
              Profile
            </Link>
            <Button
              className="bg-transparent text-black  border-0 "
              style={{ width: "fit-content" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
