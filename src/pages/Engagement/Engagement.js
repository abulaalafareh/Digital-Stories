import React from "react";
import List from "../../components/List";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ReactionContext } from "../../contextApi/ReactionContext";
import { useContext } from "react";
const Engagement = () => {
  const [posts, setPosts] = useState([]);
  const userState = useSelector((state) => state.userReducer);
  const { comments_, downvotes_, upvotes_ } = useContext(ReactionContext);

  const { Authentication, id } = userState.user;
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:5000/stories/fetchalluserstories",
        { headers: { Authentication } }
      );
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const filteredComments = comments_.filter((comment) => comment.user === id);
  const filteredUpvotes = upvotes_.filter((upvote) => upvote.user === id);
  const filteredDownvotes = downvotes_.filter(
    (downvote) => downvote.user === id
  );
  const userReactedStories = [
    ...filteredComments,
    ...filteredUpvotes,
    ...filteredDownvotes,
  ];

  const storyIds = new Set(
    userReactedStories.map((reaction) => reaction.story)
  );
  const uniqueStoryIds = [...storyIds];
  // console.log(uniqueStoryIds);

  const postList = posts.map(({ _id, text, description }) => ({
    _id,
    text,
    description,
  }));
  return (
    <div style={{ backgroundColor: "#134074" }}>
      <List storyList={postList} reactedStoryList={uniqueStoryIds} />
    </div>
  );
};

export default Engagement;

// engagement --> List
// List --> EngagementUserStoryList
// List --> EngagementReactedUserStoryList
