import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Container, Form, Button } from 'react-bootstrap'; // Ensure proper import
import { Link, Navigate } from 'react-router-dom';

const Register = ({ setIsAuthenticated, isAuthenticated }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone_no, setPhone_no] = useState("");
  const [Password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null); // Default to `null`

  const avatarHandler = (e) => {
    const file = e.target.files[0]; // Ensure it's `files[0]`
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Email", Email);
    formData.append("Phone_no", Phone_no);
    formData.append("Password", Password);
    formData.append("avatar", avatar);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/registers", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear the form fields
      setName("");
      setEmail("");
      setPhone_no("");
      setPassword("");
      setAvatar(null); // Clear avatar

      // Update authentication state
      setIsAuthenticated(true);

      // Show success toast
      toast.success(res.data.message);

    } catch (error) {
      // Handle the error and show error toast
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // If the user is authenticated, navigate to the home page
  if (isAuthenticated) {
    return <Navigate to={"/login" }/>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "800px" }}>
      <Form onSubmit={handleRegister} className='w-50 items-center'>
        <div className="title text-center font-sans p-4">
          <h3 className='font-bold'>Register Form</h3>
        </div>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your full Name" value={Name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email id</Form.Label>
          <Form.Control type="email" placeholder="Enter your Email id" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone_no">
          <Form.Label>Phone_No</Form.Label>
          <Form.Control type="text" placeholder="Enter your Phone_no Number" value={Phone_no} onChange={(e) => setPhone_no(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={avatarHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Already Registered? <Link to="/login" className="text-decoration-none">LOGIN</Link></Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className='w-100 text-light fw-bold fs-5'>
          REGISTER
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
