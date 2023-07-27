import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import EngagementUserStoryList from "./EngagementUserStoryList";
import EngagementReactedUserStoryList from "./EngagementReactedUserStoryList";
const List = ({ storyList, reactedStoryList }) => {
  const [currentList, setCurrentList] = useState(true);
  const [comments, setComments] = useState({});
  const [upvotes, setUpvotes] = useState({});
  const [downvotes, setDownvotes] = useState({});
  const [commentsReacted, setCommentsReacted] = useState({});
  const [upvotesReacted, setUpvotesReacted] = useState({});
  const [downvotesReacted, setDownvotesReacted] = useState({});
  // console.log("in list", storyList, reactedStoryList);
  useEffect(() => {
    const fetchData = async () => {
      const requests = storyList.map((story) => {
        const postId = story._id;
        const commentsRequest = axios.get(
          `http://localhost:5000/comments/fetchallcomments/story/${postId}`
        );
        const upvotesRequest = axios.get(
          `http://localhost:5000/vote/upvotes/${postId}`
        );
        const downvotesRequest = axios.get(
          `http://localhost:5000/vote/downvotes/${postId}`
        );
        return Promise.all([commentsRequest, upvotesRequest, downvotesRequest]);
      });

      const responses = await Promise.all(requests);

      const newComments = {};
      const newUpvotes = {};
      const newDownvotes = {};

      responses.forEach((response, index) => {
        const postId = storyList[index]._id;
        const [commentsResponse, upvotesResponse, downvotesResponse] = response;

        newComments[postId] = commentsResponse.data.length;
        newUpvotes[postId] = upvotesResponse.data.length;
        newDownvotes[postId] = downvotesResponse.data.length;
      });

      setComments(newComments);
      setUpvotes(newUpvotes);
      setDownvotes(newDownvotes);
    };
    fetchData();
  }, [storyList]);

  useEffect(() => {
    const fetchData = async () => {
      const requests = reactedStoryList.map((story) => {
        const postId = story;
        const commentsRequest = axios.get(
          `http://localhost:5000/comments/fetchallcomments/story/${postId}`
        );
        const upvotesRequest = axios.get(
          `http://localhost:5000/vote/upvotes/${postId}`
        );
        const downvotesRequest = axios.get(
          `http://localhost:5000/vote/downvotes/${postId}`
        );
        return Promise.all([commentsRequest, upvotesRequest, downvotesRequest]);
      });

      const responses = await Promise.all(requests);

      const newComments = {};
      const newUpvotes = {};
      const newDownvotes = {};

      responses.forEach((response, index) => {
        const postId = reactedStoryList[index];
        const [commentsResponse, upvotesResponse, downvotesResponse] = response;

        newComments[postId] = commentsResponse.data.length;
        newUpvotes[postId] = upvotesResponse.data.length;
        newDownvotes[postId] = downvotesResponse.data.length;
      });

      setCommentsReacted(newComments);
      setUpvotesReacted(newUpvotes);
      setDownvotesReacted(newDownvotes);
    };
    fetchData();
  }, [reactedStoryList]);
  const handleSwap = () => {
    setCurrentList(!currentList);
  };
  const buttonStyle = {
    color: "#000000",
    padding: "10px 30px",
    border: "none",
    borderRadius: "50px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#28bccd",
    boxShadow: "0 0 5px #0008",
    marginTop: "30px",
  };

  return (
    <>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Button
            onClick={handleSwap}
            className="btn-slide"
            style={buttonStyle}
          >
            {currentList ? "View reacted stories" : "View your stories"}
          </Button>
        </Col>
      </Row>
      {currentList ? (
        <EngagementUserStoryList
          storyList={storyList}
          comments={comments}
          upvotes={upvotes}
          downvotes={downvotes}
        />
      ) : (
        <EngagementReactedUserStoryList
          reactedStoryList={reactedStoryList}
          storyList={storyList}
          comments={commentsReacted}
          upvotes={upvotesReacted}
          downvotes={downvotesReacted}
        />
      )}
    </>
  );
};

export default List;
