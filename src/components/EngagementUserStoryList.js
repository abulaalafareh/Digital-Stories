import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeadingCardEngagement from "./HeadingCardEngagement";
import { Card } from "react-bootstrap";

const EngagementUserStoryList = ({
  storyList,
  comments,
  upvotes,
  downvotes,
}) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#86BBD8" }}
    >
      <div
        style={{
          backgroundColor: "#2F4858",
          color: "#F8F9FA",
          boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        }}
      >
        <Row>
          <h3 style={{ textAlign: "center", color: "#33658A" }}>
            Your Stories
          </h3>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <HeadingCardEngagement />
          </Col>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-center"
            style={{
              maxHeight: "320px",
              overflowY: "auto",
            }}
          >
            <ul>
              {storyList.map((data) => (
                <Card
                  key={data._id}
                  className="my-4 rounded-lg"
                  style={{
                    backgroundColor: "#C3AEC8",
                    color: "#343a40",
                    width: "900px",
                    height: "60px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    marginRight: "20px",
                  }}
                >
                  <Card.Body className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <Card.Text className="m-0">
                        {!data.text ? data.description : data.text}
                      </Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">{upvotes[data._id]}</Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">
                        {downvotes[data._id]}
                      </Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">
                        {comments[data._id]}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default EngagementUserStoryList;
