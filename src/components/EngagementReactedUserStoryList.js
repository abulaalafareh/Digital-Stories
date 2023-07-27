import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeadingCardEngagement from "./HeadingCardEngagement";
import { Card } from "react-bootstrap";
import { ReactionContext } from "../contextApi/ReactionContext";
import { useContext } from "react";

const EngagementReactedUserStoryList = ({
  reactedStoryList,
  upvotes,
  downvotes,
  comments,
}) => {
  const { stories_ } = useContext(ReactionContext);
  // console.log("stories", stories_);
  const reactedStoryData = reactedStoryList.map((reactedStory) => {
    const { text, description } = stories_.find(
      (story) => story._id === reactedStory
    );
    return { reactedStory, text, description };
  });
  // console.log(reactedStoryData);
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#86BBD8" }}
    >
      <div
        style={{
          backgroundColor: "#2F4858",
          color: "#f8f9fa",
          boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        }}
      >
        <Row>
          <h3 style={{ textAlign: "center", color: "#33658A" }}>
            Stories You Reacted To
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
              {reactedStoryData.map((reactedStory) => {
                return (
                  <Card
                    key={reactedStory.storyId}
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
                          {!reactedStory.text
                            ? reactedStory.description
                            : reactedStory.text}
                        </Card.Text>
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ marginRight: "85px" }}
                      >
                        <Card.Text className="m-0">
                          {upvotes[reactedStory.reactedStory]}
                        </Card.Text>
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ marginRight: "85px" }}
                      >
                        <Card.Text className="m-0">
                          {downvotes[reactedStory.reactedStory]}
                        </Card.Text>
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ marginRight: "85px" }}
                      >
                        <Card.Text className="m-0">
                          {comments[reactedStory.reactedStory]}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </ul>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default EngagementReactedUserStoryList;
