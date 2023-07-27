import React from "react";
import LeaderboardRankingList from "../../components/LeaderboardRankingList";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ReactionContext } from "../../contextApi/ReactionContext";
import { useContext } from "react";

const Leaderboard = () => {
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

  const storiesWithReactions = uniqueStoryIds.map((storyId) => {
    const commentsCount = filteredComments.reduce(
      (count, comment) => (comment.story === storyId ? count + 1 : count),
      0
    );
    const upvotesCount = filteredUpvotes.reduce(
      (count, upvote) => (upvote.story === storyId ? count + 1 : count),
      0
    );
    const downvotesCount = filteredDownvotes.reduce(
      (count, downvote) => (downvote.story === storyId ? count + 1 : count),
      0
    );

    return { storyId, commentsCount, upvotesCount, downvotesCount };
  });

  const postList = posts.map(({ _id, text, description }) => ({
    _id,
    text,
    description,
  }));
  return (
    <div style={{ backgroundColor: "#134074" }}>
      <LeaderboardRankingList
        storyList={postList}
        reactedStoryList={storiesWithReactions}
      />
    </div>
  );
};

export default Leaderboard;
