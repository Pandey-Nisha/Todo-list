import React, { useRef, useState } from "react";
import Todoitems from "./Todoitems";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Maincontent() {
  const inputref = useRef();
  const inputref2 = useRef();

  const [task, setTask] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const add = () => {
    const inputText = inputref.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: new Date().toLocaleTimeString(),
      task: inputText,
      completed: false,
    };

    setTask((prev) => [...prev, newTodo]);
    inputref.current.value = "";
  };

  const handleOpenConfirmModal = (id) => {
    setTaskToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  const deleteTask = () => {
    setTask((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== taskToDelete);
    });
    handleCloseConfirmModal();
  };

  const handleOpenEditModal = (id) => {
    setEditTask(id);
    setShowEditModal(true);
  };

  const Editting = () => {  
    if(!inputref2.current.value){
      return;
    }
    setTask((prevTasks) => 
      prevTasks.map((task) => 
      task.id === editTask ? { ...task, task: inputref2.current.value.trim() } : task
      )
    );
    handleCloseEditModal();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="main-background">
      <div className="inner-div">
        <h1>To-Do List</h1>
        <input ref={inputref} type="text" placeholder="Add your task here" />
        <button className="addbutton" onClick={add}>
          ADD+
        </button>
        <div>
          {task.map((item, index) => (
            <Todoitems
              text={item.task}
              key={index}
              id={item.id}
              completed={item.completed}
              addModal={handleOpenConfirmModal}
              addEditModal = {handleOpenEditModal}
            />
          ))}
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>{deleteTask()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Task</Modal.Title>
        </Modal.Header>
        <Modal.Body><input ref={inputref2} type="text" placeholder="Enter your text"></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>{Editting()}}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}
