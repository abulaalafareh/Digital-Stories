import React from "react";
import { Card, Col } from "react-bootstrap";

const Grid = ({ post }) => {
  return (
    <Col sm={3}>
      <Card className="mb-3">
        <Card.Img variant="top" src={post.imageUrl} />
        <Card.Body>
          <div className="d-flex align-items-center">
            <img
              src={post.profilePicUrl}
              className="rounded-circle mr-2"
              alt={post.username}
              width="50"
            />
            <div>
              <Card.Title className="m-0">{post.username}</Card.Title>
              <small className="text-muted">{post.timestamp}</small>
            </div>
          </div>
          <Card.Text>{post.caption}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Grid;
