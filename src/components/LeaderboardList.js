import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import EngagementUserStoryList from "./EngagementUserStoryList";
import LeaderboardRankingList from "./LeaderboardRankingList";
const LeaderboaradList = ({ storyList, reactedStoryList }) => {
  const [currentList, setCurrentList] = useState(true);

  const [comments, setComments] = useState({});
  const [upvotes, setUpvotes] = useState({});
  const [downvotes, setDownvotes] = useState({});
  console.log("in List", reactedStoryList);
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
  return (
    <>
      <LeaderboardRankingList
        storyList={storyList}
        comments={comments}
        upvotes={upvotes}
        downvotes={downvotes}
      />
    </>
  );
};

export default LeaderboaradList;
