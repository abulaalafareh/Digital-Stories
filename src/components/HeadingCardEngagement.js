import React from "react";
import { Card } from "react-bootstrap";

const HeadingCardEngagement = () => {
  return (
    <Card
      className="my-4 rounded-lg"
      style={{
        width: "900px",
        height: "60px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        backgroundColor: "#F2F3F5",
      }}
    >
      <Card.Body className="d-flex align-items-center">
        <div className="flex-grow-1">
          <Card.Text className="m-0" style={{ color: "#212529" }}>
            Username
          </Card.Text>
          {}
        </div>
        <div className="d-flex flex-column " style={{ marginRight: "30px" }}>
          <Card.Text className="m-0" style={{ color: "#212529" }}>
            Upvotes
          </Card.Text>
        </div>
        <div className="d-flex flex-column " style={{ marginRight: "30px" }}>
          <Card.Text className="m-0" style={{ color: "#212529" }}>
            Downvotes
          </Card.Text>
        </div>
        <div className="d-flex flex-column " style={{ marginRight: "30px" }}>
          <Card.Text className="m-0" style={{ color: "#212529" }}>
            Comments
          </Card.Text>
        </div>
      </Card.Body>
      <hr style={{ color: "#212529" }}></hr>
    </Card>
  );
};

export default HeadingCardEngagement;
