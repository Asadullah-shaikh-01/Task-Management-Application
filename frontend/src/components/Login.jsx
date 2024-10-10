import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { Email, Password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-80">
        <h3 className="text-center ">LOGIN</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/register"} className="text-decoration-none ">
              REGISTER NOW
            </Link>
          </Form.Label>
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;