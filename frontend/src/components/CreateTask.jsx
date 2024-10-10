import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTask = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const handleCreateTask = async () => {
    await axios
      .post(
       "http://localhost:4000/api/v1/task/createtask",
        { Title, Description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        setTitle("");
        setDescription("");
        handleCreateModalClose();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
         <br/>
         <Stack gap={2}>
         <label>Descriptions</label>
            <input
              type="text"
              placeholder="Descriptions"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
           Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTask