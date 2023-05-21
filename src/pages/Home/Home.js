import React, { useEffect } from "react";
import TextStory from "../../components/TextStory";
import MultimediaStory from "../../components/MultimediaStory";
import axios from "axios";
import { useState } from "react";
import { ReactionContext } from "../../contextApi/ReactionContext";
import { useSelector } from "react-redux";
import { useContext } from "react";

const Home = () => {
  const userState = useSelector((state) => state.userReducer);
  let { Authentication } = userState.user;

  const [post, setPost] = useState([]);
  const { updateStories, updateUserInfo } = useContext(ReactionContext);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:5000/stories/fetchallstories"
      );
      setPost(response.data);
      updateStories(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userPromises = post.map(async (p) => {
          const response = await axios.get(
            `http://localhost:5000/auth/user/${p.user}`,
            {
              headers: {
                Authentication: Authentication, // Replace with your actual JWT token
              },
            }
          );
          const userId = response.data._id;
          const username = response.data.username;
          const image = response.data.image;
          return { userId, username, image };
        });

        const info = await Promise.all(userPromises);
        setUserInfo(info);
        updateUserInfo(info);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [post]);

  return (
    <div
      style={{ backgroundColor: "#134074", color: "white", paddingTop: "50px" }}
    >
      <div className="container">
        {post.map((p) => {
          const user = userInfo.find((u) => u.userId === p.user);
          const username = user ? user.username : ""; // Get the username from userInfo

          return p.type === "text" ? (
            <TextStory
              key={p._id}
              color={p.color}
              background_color={p.background_color}
              text={p.text}
              font={p.font}
              postId={p._id}
              username_={username} // Pass the username as a prop
            />
          ) : (
            <MultimediaStory
              key={p._id}
              multimedia={p.multimedia}
              description={p.description}
              username_={username} // Pass the username as a prop
              postId={p._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
