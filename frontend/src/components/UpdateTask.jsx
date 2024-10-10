import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const UpdateTask = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState("pending");
  const [Archived, setArchived] = useState(false);
  useEffect(() => {
    const getSingleTask = async () => {
      await axios

        .get(`http://localhost:4000/api/v1/task/singletask/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.task.Title);
          setDescription(res.data.task.Description);
          setStatus(res.data.task.Status);
          setArchived(res.data.task.Archived);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdate = async () => {
    await axios
      .put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        { Title, Description, Status, Archived },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => {
          const updateTasks = prevTasks.map((task) => {
            if (task._id === id) {
              return {
                ...task,
                Title,
                Description,
                Status,
                Archived,
              };
            } else {
              return task;
            }
          });
          return updateTasks;
        });
        handleUpdateModalClose();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
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
         <br/>
         <Stack gap={2}>
         <label>Status</label>
           <select value={Status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Compeleted">Compeleted</option>
            <option value="pending">Pending</option>
           </select>
          
          </Stack>
         <br/>
         <Stack gap={2}>
         <label>Archived</label>
         <select value={Archived} onChange={(e)=>setArchived(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
           </select>
          </Stack>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTask;
