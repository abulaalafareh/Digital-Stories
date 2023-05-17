import React from "react";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import image_placeholder from "../../assests/image_placeholder.jpg";
import text_placeholder from "../../assests/text_placeholder.jpg";
import video_placeholder from "../../assests/video_placeholder.jpg";
import StoryForm from "../../components/StoryForm";
import ImageStoryForm from "../../components/ImageStoryForm";
import VideoStoryForm from "../../components/VideoStoryForm";
import StoryManagementGrid from "../../components/StoryManagementGrid";
import TextStoryManagementGrid from "../../components/TextStoryManagementGrid";

import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const StoryManagementPage = () => {
  const userState = useSelector((state) => state.userReducer);

  const [showTextForm, setShowTextForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [render, setRender] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let { Authentication } = userState.user;

      const response = await axios.get(
        "http://localhost:5000/stories/fetchalluserstories",
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      setPost(response.data);
    };
    getData();
  }, [render]);

  const onClickTextHandler = () => {
    console.log("text");
    setShowTextForm(true);
  };
  const onClickImageHandler = () => {
    console.log("image");
    setShowImageForm(true);
  };
  const onClickVideoHandler = () => {
    console.log("video");
    setShowVideoForm(true);
  };
  const handleSubmit = async (event) => {
    setRender(!render);
    return console.log("form has been submitted");
  };
  const card1Style = {
    backgroundImage: `url(${text_placeholder})`,
    backgroundSize: "cover",
    color: "#fff",
    height: "300px",
    marginBottom: "1.5rem",
    borderRadius: "35px",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    transition: "box-shadow 0.2s ease-in-out",
  };

  const card2Style = {
    backgroundImage: `url(${image_placeholder})`,
    backgroundSize: "cover",
    color: "#fff",
    height: "300px",
    marginBottom: "1.5rem",
    borderRadius: "35px",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
  };

  const card3Style = {
    backgroundImage: `url(${video_placeholder})`,
    backgroundSize: "cover",
    color: "#fff",
    height: "300px",
    marginBottom: "1.5rem",
    borderRadius: "35px",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
  };

  return (
    <div style={{ backgroundColor: "#134074" }}>
      <Container>
        <div style={{ overflowX: "auto", padding: "20px" }}>
          <Row className="flex-nowrap" style={{ marginTop: "50px" }}>
            {post.map((p) =>
              p.type === "text" ? (
                <TextStoryManagementGrid
                  key={p._id}
                  color={p.color}
                  background_color={p.background_color}
                  text={p.text}
                  font={p.font}
                  postId={p._id}
                />
              ) : (
                <StoryManagementGrid
                  key={p._id}
                  description={p.description}
                  multimedia={p.multimedia}
                  imageUrl={"https://via.placeholder.com/600x400"}
                  postId={p._id}
                />
              )
            )}
          </Row>
        </div>
        <br></br>
        <br></br>
        <br></br>
        {/* <h1 className="text-center my-5">Create Story</h1> */}
        <Row className="justify-content-around">
          <Col md={4}>
            <Card style={card1Style}>
              <Card.Body onClick={onClickTextHandler}>
                <Card.Title>Text Story</Card.Title>
                <Card.Text>Write what you want the world to read</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={card2Style}>
              <Card.Body onClick={onClickImageHandler}>
                <Card.Title>Image Story</Card.Title>
                <Card.Text>Show what you want the world to see</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={card3Style}>
              <Card.Body onClick={onClickVideoHandler}>
                <Card.Title>Video Story</Card.Title>
                <Card.Text>
                  Make your experience the world's experience
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {showTextForm && (
          <StoryForm
            show={showTextForm}
            handleClose={() => setShowTextForm(false)}
            handleSubmit={() => {
              handleSubmit();
            }}
          />
        )}
        {showImageForm && (
          <ImageStoryForm
            show={showImageForm}
            handleClose={() => setShowImageForm(false)}
            handleSubmit={(title, description, file) => {
              handleSubmit();
              console.log(title, description, file);
            }}
          />
        )}
        {showVideoForm && (
          <VideoStoryForm
            show={showVideoForm}
            handleClose={() => setShowVideoForm(false)}
            handleSubmit={(title, description, file) => {
              handleSubmit();
              console.log(title, description, file);
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default StoryManagementPage;
