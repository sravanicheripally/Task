import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'; // Import Bootstrap components
import { useState } from 'react';

const TaskDelete = ({ taskId, onTaskDeleted }) => {
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/tasks/delete/${taskId}/`);
      onTaskDeleted(); // Notify parent to refresh the task list
      setShow(false); // Hide the modal
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>Delete Task</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskDelete;
