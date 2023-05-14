import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import HeadingCardEngagement from "./HeadingCardEngagement";
import { Card } from "react-bootstrap";
import axios from "axios";

const List = ({ storyList, secondList }) => {
  const [currentList, setCurrentList] = useState(storyList);

  const [comments, setComments] = useState({});
  const [upvotes, setUpvotes] = useState({});
  const [downvotes, setDownvotes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < storyList.length; i++) {
        const postId = storyList[i]._id;
        try {
          const commentsResponse = await axios.get(
            `http://localhost:5000/comments/fetchallcomments/story/${postId}`
          );
          setComments((prevComments) => ({
            ...prevComments,
            [postId]: commentsResponse.data.length,
          }));
        } catch (error) {
          console.error(error);
        }

        try {
          const upvotesResponse = await axios.get(
            `http://localhost:5000/vote/upvotes/${postId}`
          );
          setUpvotes((prevUpvotes) => ({
            ...prevUpvotes,
            [postId]: upvotesResponse.data.length,
          }));
        } catch (error) {
          console.error(error);
        }

        try {
          const downvotesResponse = await axios.get(
            `http://localhost:5000/vote/downvotes/${postId}`
          );
          setDownvotes((prevDownvotes) => ({
            ...prevDownvotes,
            [postId]: downvotesResponse.data.length,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [storyList]);
  const handleSwap = () => {
    setCurrentList(currentList === storyList ? secondList : storyList);
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#77f9fa" }}
    >
      <div
        style={{
          backgroundColor: "#883a40",
          color: "#f8f9fa",
          boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        }}
      >
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Button onClick={handleSwap}>Swap Lists</Button>
          </Col>
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
                    backgroundColor: "#f8f9fa",
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
                      className="d-flex flex-column "
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">{upvotes[data._id]}</Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column "
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">
                        {downvotes[data._id]}
                      </Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column "
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

export default List;
