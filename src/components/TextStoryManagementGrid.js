import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import StoryForm from "./StoryForm";

const TextStoryManagementGrid = ({
  color,
  background_color,
  text,
  font,
  postId,
}) => {
  const userState = useSelector((state) => state.userReducer);

  const [showTextForm, setShowTextForm] = useState(false);

  const handleMakeChanges = () => {
    setShowTextForm(true);
  };

  const handleDelete = async () => {
    let { Authentication } = userState.user;

    const response = await axios.delete(
      `http://localhost:5000/stories/deletestory/${postId}`,
      {
        headers: {
          Authentication: Authentication,
        },
      }
    );
    console.log(response);

    // Do something when the "Delete" dropdown item is clicked
  };

  const handleSubmitForm = (
    text,
    color,
    font,
    background_color,
    visibility
  ) => {
    console.log(text, color, font, background_color, visibility);
    setShowTextForm(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        borderRadius: "35px",
        margin: "10px",
        overflow: "hidden",
      }}
    >
      {showTextForm && (
        <StoryForm
          show={showTextForm}
          handleClose={() => setShowTextForm(false)}
          handleSubmit={handleSubmitForm}
          newText={text}
          newColor={color}
          newFont={font}
          newBackground_color={background_color}
          postId={postId}
          update={"update"}
        />
      )}
      <textarea
        style={{
          width: "100%",
          height: "auto",
          minHeight: "150px", // Set a minimum height to prevent it from becoming too small
          backgroundColor: background_color, // Background color
          color: color, // Text color
          fontFamily: font, // Text font
          padding: "10px", // Add some padding for readability
          border: "none", // Remove the border
          textAlign: "center", // Center the text
          resize: "none", // Prevent resizing the textarea
        }}
        value={text} // Use value instead of children to set the text
        readOnly // Set readOnly to prevent the user from editing the text
      />
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <i className="fas fa-ellipsis-h"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleMakeChanges}>
              Make Changes
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TextStoryManagementGrid;
