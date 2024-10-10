import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Stack } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";
import ViewTask from "./ViewTask";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  if (loading) {
    return <p>Loading... Something has wrong</p>;
  }
  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1>{taskTitle}</h1>
        </div>
        <div className="col text-end">
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="row">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card className="mb-6 h-min">
                <Card.Body className="d-flex justify-content-between flex-column ">
                  <Stack gap={2}>
                    <Card.Title className="mb-2 h-24">
                      {task && task.Title.length <= 40
                        ? task.Title
                        : task.Title.slice(0, 40) + "..."}
                    </Card.Title>
                    <Card.Text>
                      {task && task.Description.length <= 300
                        ? task.Description
                        : task.Description.slice(0, 300) + "..."}
                    </Card.Text>
                  </Stack>
                  <Stack
                    direction="horizontal"
                    className="justify-content-end"
                    gap={2}
                  >
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="fs-3 "
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="fs-3 "
                    />
                    <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="fs-3 "
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DONT HAVE ANY {taskTitle}</h1>
        )}
      </div>

      <CreateTask
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTask
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTask
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
