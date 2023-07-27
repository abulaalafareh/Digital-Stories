import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const StoryForm = ({
  show,
  handleClose,
  handleSubmit,
  newText = "",
  newColor = "#000000",
  newFont = "Arial",
  newBackground_color = "#ffffff",
  postId,
  update,
}) => {
  const userState = useSelector((state) => state.userReducer);
  const [text, setText] = useState(newText || "");
  const [backgroundColor, setBackgroundColor] = useState(newBackground_color);
  const [textColor, setTextColor] = useState(newColor);
  const [font, setFont] = useState(newFont);
  const [status, setStatus] = useState("private");
  const data = {
    text: text,
    background_color: backgroundColor,
    color: textColor,
    font: font,
    status: status === "public" ? true : false,
    type: "text",
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const handleVisibilityChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    let { Authentication } = userState.user;
    if (update) {
      const response = await axios.put(
        `http://localhost:5000/stories/updatestory/${postId}`,
        data,
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      handleSubmit(text, backgroundColor, textColor, font, status);
      handleClose();
    } else {
      const response = await axios.post(
        "http://localhost:5000/stories/addstory",
        data,
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      handleSubmit(text, backgroundColor, textColor, font, status);
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
            Your Story
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="What's on your mind?"
              value={text}
              name="text"
              onChange={handleTextChange}
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
                fontFamily: font,
              }}
            />
          </Form.Group>
          <Form.Group>
            Background Color
            <Form.Control
              as="select"
              value={backgroundColor}
              name="background_color"
              onChange={handleBackgroundColorChange}
            >
              <option value="#ffffff">White</option>
              <option value="#ffadad">Light Red</option>
              <option value="#ffd6a5">Light Orange</option>
              <option value="#bdb2ff">Light Lavender</option>
              <option value="#ffc6ff">Light Pink</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            Text Color
            <Form.Control
              as="select"
              value={textColor}
              name="color"
              onChange={handleTextColorChange}
            >
              <option value="#000000">Black</option>
              <option value="#ff0000">Red</option>
              <option value="#0000ff">Blue</option>
              <option value="#ffffff">White</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            Fonts
            <Form.Control
              as="select"
              value={font}
              onChange={handleFontChange}
              name="font"
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </Form.Control>
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
              <option value="public">public</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitClick}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoryForm;
