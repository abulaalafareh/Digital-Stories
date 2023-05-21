import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeadingCardLeaderboard from "./HeadingCardLeaderboard";
import { Card } from "react-bootstrap";
import { ReactionContext } from "../contextApi/ReactionContext";
import { useContext } from "react";
const userPicture = require("./1.PNG");
const LeaderboardRankingList = ({ reactedStoryList }) => {
  const { stories_, upvotes_, userInfo } = useContext(ReactionContext);

  // Count the number of stories for each user
  const userStories = stories_.reduce((storiesMap, story) => {
    const { user, _id } = story;
    if (!storiesMap[user]) {
      storiesMap[user] = {
        storyCount: 0,
        storyIds: [],
        totalUpvotes: 0,
      };
    }
    storiesMap[user].storyCount++;
    storiesMap[user].storyIds.push(_id);
    return storiesMap;
  }, {});

  // Calculate the total number of upvotes for each user's stories
  Object.keys(userStories).forEach((userId) => {
    const userStoryIds = userStories[userId].storyIds;
    const totalUpvotes = userStoryIds.reduce((total, storyId) => {
      const upvote = upvotes_.find(
        (upvote) => upvote.story === storyId && upvote.upvote
      );
      return total + (upvote ? 1 : 0);
    }, 0);
    userStories[userId].totalUpvotes = totalUpvotes;
  });

  // Sort the user IDs based on the story counts in descending order
  const sortedUserIds = Object.keys(userStories).sort(
    (a, b) => userStories[b].storyCount - userStories[a].storyCount
  );

  const getUsernameById = (userId) => {
    const user = userInfo.find((user) => user.userId === userId);
    if (user) {
      return user.username;
    }
    return "";
  };

  // Retrieve the user IDs with the most stories along with their story counts, story IDs, username and total upvotes
  const usersWithMostStories = sortedUserIds.map((userId) => {
    const username = getUsernameById(userId);

    return {
      userId,
      username,
      storyCount: userStories[userId].storyCount,
      storyIds: userStories[userId].storyIds,
      totalUpvotes: userStories[userId].totalUpvotes,
    };
  });

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
          <h3 style={{ textAlign: "center", color: "#33658A" }}>Leaderboard</h3>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <HeadingCardLeaderboard />
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
              {usersWithMostStories.map((user) => (
                <Card
                  key={user.userId}
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
                      <div className="d-flex align-items-center">
                        <img
                          src={userPicture}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <Card.Text className="m-0" style={{ color: "#212529" }}>
                          {user.username}
                        </Card.Text>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">{user.storyCount}</Card.Text>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "85px" }}
                    >
                      <Card.Text className="m-0">{user.totalUpvotes}</Card.Text>
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

export default LeaderboardRankingList;
