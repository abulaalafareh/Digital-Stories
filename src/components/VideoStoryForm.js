import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoStoryForm = ({
  show,
  handleClose,
  handleSubmit,
  newDescription = "",
  update,
  postId,
}) => {
  const userState = useSelector((state) => state.userReducer);
  const formData = new FormData();
  const [description, setDescription] = useState(newDescription);
  const [file, setFile] = useState(null);
  formData.append("description", description);
  formData.append("image", file);
  // formData.append("contentType", "image/jpg");
  formData.append("type", "image");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitClick = async () => {
    let { Authentication } = userState.user;
    if (update) {
      const response = await axios.put(
        `http://localhost:5000/stories/updatestory/${postId}`,
        formData,
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      console.log("form submitted", response);
      handleSubmit();
      handleClose();
    } else {
      const response = await axios.post(
        "http://localhost:5000/stories/addstory",
        formData,
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      console.log("form submitted", response);

      handleSubmit(description, file);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoStoryForm;
