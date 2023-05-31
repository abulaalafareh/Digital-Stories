import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const ImageStoryForm = ({
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
  const [status, setStatus] = useState("private");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state

  formData.append("description", description);
  formData.append("image", file);
  formData.append("contentType", "image/png");
  formData.append("type", "image");
  formData.append("status", status === "public" ? true : false);
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleVisibilityChange = (event) => {
    setStatus(event.target.value);
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
      handleSubmit();
      handleClose();
    } else {
      if (!file || file.type.indexOf("image") === -1) {
        setErrorMessage("Please select an image file.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/stories/addstory",
        formData,
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );

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
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*" // Specify the accepted file types as image
              onChange={(event) => setFile(event.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            Who can see
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={handleVisibilityChange}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </Form.Control>
          </Form.Group>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
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

export default ImageStoryForm;
