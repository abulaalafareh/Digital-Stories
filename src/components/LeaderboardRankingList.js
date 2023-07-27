import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeadingCardLeaderboard from "./HeadingCardLeaderboard";
import { Card } from "react-bootstrap";
import { ReactionContext } from "../contextApi/ReactionContext";
import AppLogo from "./1.PNG";
import axios from "axios";

const LeaderboardRankingList = ({ reactedStoryList }) => {
  const { stories_, userInfo } = useContext(ReactionContext);
  const [userImages, setUserImages] = useState({});
  const [filteredUsersWithMostStories, setFilteredUsersWithMostStories] =
    useState([]);

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
  const sortedUserIds = Object.keys(userStories).sort(
    (a, b) => userStories[b].storyCount - userStories[a].storyCount
  );
  useEffect(() => {
    const loadUserImages = async () => {
      const imagePromises = sortedUserIds.map(async (userId) => {
        const userData = getUserDataById(userId);
        if (userData && userData.image && userData.image.data) {
          const blob = new Blob([new Uint8Array(userData.image.data.data)], {
            type: userData.image.contentType,
          });
          const imageUrl = URL.createObjectURL(blob);
          console.log("image", imageUrl);
          return { userId, imageUrl };
        } else {
          return { userId, imageUrl: AppLogo };
        }
      });
      const userImagesData = await Promise.all(imagePromises);
      const userImagesMap = userImagesData.reduce(
        (map, { userId, imageUrl }) => {
          map[userId] = imageUrl;
          return map;
        },
        {}
      );
      setUserImages(userImagesMap);
    };

    loadUserImages();
  }, []);

  const getUserDataById = (userId) => {
    const user = userInfo.find((user) => user.userId === userId);
    return user ? { username: user.username, image: user.image } : null;
  };

  // Calculate the total number of upvotes for each user's stories
  useEffect(() => {
    const userIds = Object.keys(userStories);

    // Define a function to fetch upvotes for a single story
    const getUpvotesForStory = async (storyId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/upvotes/${storyId}`
        );
        return response.data.length;
      } catch (error) {
        console.error(error); // Handle any potential errors
        return 0; // If there's an error, return 0 upvotes for the story
      }
    };

    // Loop through user stories
    Promise.all(
      userIds.map(async (userId) => {
        const userStoryIds = userStories[userId].storyIds;

        // Fetch upvotes for all stories concurrently using Promise.all
        const upvotePromises = userStoryIds.map((storyId) =>
          getUpvotesForStory(storyId)
        );
        const upvotes = await Promise.all(upvotePromises);

        // Calculate the total upvotes for the user's stories
        const totalUpvotes = upvotes.reduce(
          (total, upvote) => total + upvote,
          0
        );
        // console.log("Total upvotes for user", userId, ":", totalUpvotes);

        // Update the userStories object with the totalUpvotes
        userStories[userId].totalUpvotes = totalUpvotes;
      })
    ).then(() => {
      const filteredUsersWithMostStories = sortedUserIds
        .map((userId) => {
          const userData = getUserDataById(userId);
          if (!userData) {
            return null;
          }
          const imageUrl = userImages[userId] || AppLogo;
          return {
            userId,
            username: userData.username,
            image: imageUrl,
            storyCount: userStories[userId].storyCount,
            storyIds: userStories[userId].storyIds,
            totalUpvotes: userStories[userId].totalUpvotes,
          };
        })
        .filter((user) => user !== null);

      setFilteredUsersWithMostStories(filteredUsersWithMostStories);
      // console.log("filteredUsersWithMostStories", filteredUsersWithMostStories);
    });
  }, [sortedUserIds]);
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
              {filteredUsersWithMostStories.map((user) => (
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
                          src={user.image}
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
