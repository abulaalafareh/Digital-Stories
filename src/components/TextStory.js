import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
const TextStory = ({ color, background_color, text, font, postId }) => {
  const userState = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [addedvote, setaddedvote] = useState(false);
  // Effect to fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/comments/fetchallcomments/story/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  // Effect to fetch upvotes and downvotes
  useEffect(() => {
    const fetchUpvotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/upvotes/${postId}`
        );
        setUpvotes(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDownvotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/downvotes/${postId}`
        );
        setDownvotes(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUpvotes();
    fetchDownvotes();
  }, [postId, addedvote]);
  // console.log("fetchupvotes", upvotes);
  // console.log("fetchupvotes", downvotes);

  let { username } = userState.user; // use this username to save with the comment
  let { Authentication } = userState.user;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/comments/addcomment/story/${postId}`,
        {
          body: comment,
          username: username,
        },
        {
          headers: {
            Authentication: Authentication,
          },
        }
      );
      setComments([...comments, response.data]);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleVote = async (event) => {
    if (event === "up") {
      await axios.post(`http://localhost:5000/vote/upvote/${postId}`, null, {
        headers: {
          Authentication: Authentication,
        },
      });
    } else {
      await axios.post(`http://localhost:5000/vote/downvote/${postId}`, null, {
        headers: {
          Authentication: Authentication,
        },
      });
    }
    setaddedvote(!addedvote);
  };
  return (
    <Row className="mt-5">
      <Col md={8}>
        <Card
          style={{
            width: "100%",
            backgroundColor: "#2c3e50",
            color: "white",
            marginBottom: "35px",
          }}
        >
          <textarea
            style={{
              width: "100%",
              height: "auto",
              minHeight: "400px", // Set a minimum height to prevent it from becoming too small
              backgroundColor: background_color, // Background color
              color: color, // Text color
              fontFamily: font, // Text font
              padding: "10px", // Add some padding for readability
              border: "none", // Remove the border
              textAlign: "center", // Center the text
              resize: "none", // Prevent resizing the textarea
              fontSize: "40px",
            }}
            value={text} // Use value instead of children to set the text
            readOnly // Set readOnly to prevent the user from editing the text
          />
          <Card.Body style={{ maxHeight: "200px", overflow: "auto" }}>
            <Row className="align-items-center">
              <Col xs={2}>
                {/* <img
                  src={post.profilePicUrl}
                  className="rounded-circle"
                  alt={post.username}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                /> */}
              </Col>
              <Col xs={6}>
                <Card.Title>{"username"}</Card.Title>
              </Col>
              <Col xs={4} className="text-right">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button variant="link" onClick={() => handleVote("up")}>
                    <FaArrowUp style={{ fontSize: "20px" }} />
                  </Button>
                  <span style={{ fontSize: "14px" }}>{upvotes}</span>
                  <Button variant="link" onClick={() => handleVote("down")}>
                    <FaArrowDown style={{ fontSize: "20px" }} />
                  </Button>
                  <span style={{ fontSize: "14px" }}>{downvotes}</span>
                </div>
              </Col>
            </Row>
            <small className="text-muted">{"post.timestamp"}</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          style={{
            width: "100%",
            backgroundColor: "#34495e",
            color: "white",
            marginTop: "20px",
          }}
        >
          <Card.Body>
            <Card.Title>Comments</Card.Title>
            <Card.Text style={{ maxHeight: "350px", overflowY: "auto" }}>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    backgroundColor: "darkgrey",
                    padding: "5px",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ color: "red" }}>{comment.username}</span>
                  <hr style={{ color: "black" }}></hr>
                  <span style={{ color: "green" }}>{comment.body}</span>
                </div>
              ))}
            </Card.Text>

            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="comment" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TextStory;
