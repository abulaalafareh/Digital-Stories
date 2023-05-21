import React, { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Story = ({ post }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
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
          <Card.Img
            variant="top"
            src={post.imageUrl}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
          <Card.Body style={{ maxHeight: "200px", overflow: "auto" }}>
            <Row className="align-items-center">
              <Col xs={2}>
                <img
                  src={post.profilePicUrl}
                  className="rounded-circle"
                  alt={post.username}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </Col>
              <Col xs={6}>
                <Card.Title>{post.username}</Card.Title>
              </Col>
              <Col xs={4} className="text-right">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FaArrowUp style={{ fontSize: "20px" }} />
                  <span style={{ fontSize: "14px" }}>{post.upvotes}</span>
                  <FaArrowDown style={{ fontSize: "20px" }} />
                  <span style={{ fontSize: "14px" }}>{post.downvotes}</span>
                </div>
              </Col>
            </Row>
            <Card.Text style={{ fontSize: "14px" }}>{post.caption}</Card.Text>
            <small className="text-muted">{post.timestamp}</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card
          style={{ width: "100%", backgroundColor: "#34495e", color: "white" }}
        >
          <Card.Body>
            <Card.Title>Comments</Card.Title>
            <Card.Text>
              <p>User1: This is a great post!</p>
              <p>User2: I love this photo.</p>
            </Card.Text>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="comment" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
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

export default Story;
