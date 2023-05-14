import React from "react";
import List from "../../components/List";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
const Engagement = () => {
  const [posts, setPosts] = useState([]);
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log("in use Effect");
    const fetchPosts = async () => {
      const { Authentication } = userState.user;
      const response = await axios.get(
        "http://localhost:5000/stories/fetchalluserstories",
        { headers: { Authentication } }
      );
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const postList = posts.map(({ _id, text, description }) => ({
    _id,
    text,
    description,
  }));
  console.log(postList);
  return (
    <div>
      <List storyList={postList} />
    </div>
  );
};

export default Engagement;
