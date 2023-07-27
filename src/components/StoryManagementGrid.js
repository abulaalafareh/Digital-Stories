import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import ImageStoryForm from "./ImageStoryForm";

const StoryManagementGrid = ({ multimedia, postId, description }) => {
  const userState = useSelector((state) => state.userReducer);
  const [showImageForm, setShowImageForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [mediaStatus, setMediaStatus] = useState("visible");

  useEffect(() => {
    if (multimedia) {
      if (multimedia.contentType.startsWith("image/")) {
        const blob = new Blob([new Uint8Array(multimedia.data.data)], {
          type: multimedia.contentType,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      } else {
        const blob = new Blob([new Uint8Array(multimedia.data.data)], {
          type: multimedia.contentType,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoUrl(reader.result);
        };
        reader.readAsDataURL(blob);
        // console.log("videoUrl", videoUrl, multimedia.data);
      }
    }
  }, [multimedia]);
  const handleMakeChanges = () => {
    setShowImageForm(true);
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
    setMediaStatus("deleted");

    // Do something when the "Delete" dropdown item is clicked
  };

  const handleSubmitForm = (description) => {
    setShowImageForm(false);
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
      {showImageForm && (
        <ImageStoryForm
          show={showImageForm}
          handleClose={() => setShowImageForm(false)}
          handleSubmit={handleSubmitForm}
          newDescription={description}
          update="update"
          postId={postId}
        />
      )}
      {mediaStatus === "visible" && (
        <>
          {multimedia.contentType.startsWith("image/") ? (
            <img
              src={imageUrl}
              alt=""
              style={{
                width: "100%",
                minHeight: "150px",
                backgroundColor: "#003152",
              }}
            />
          ) : (
            <video
              src={videoUrl}
              alt=""
              style={{
                width: "100%",
                minHeight: "150px",
                backgroundColor: "#003152",
              }}
            />
          )}
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
        </>
      )}
    </div>
  );
};

export default StoryManagementGrid;
