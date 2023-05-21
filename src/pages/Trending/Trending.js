import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReactionContext } from "../../contextApi/ReactionContext";
import TextStory from "../../components/TextStory";
import MultimediaStory from "../../components/MultimediaStory";

const Trending = () => {
  const [sortedStories, setSortedStories] = useState([]);
  const { comments_, upvotes_, userInfo, stories_ } =
    useContext(ReactionContext);
  const userState = useSelector((state) => state.userReducer);
  const { Authentication } = userState.user;

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = stories_.map((post) => {
        const filteredComments = comments_.filter(
          (comment) => comment.story === post._id
        );
        const filteredUpvotes = upvotes_.filter(
          (upvote) => upvote.story === post._id
        );
        return {
          _id: post._id,
          commentsCount: filteredComments.length,
          upvotesCount: filteredUpvotes.length,
        };
      });

      // Sort posts based on the highest number of comments and upvotes combined
      posts.sort((a, b) => {
        const aCount = a.commentsCount + a.upvotesCount;
        const bCount = b.commentsCount + b.upvotesCount;
        return bCount - aCount;
      });

      // Save sorted stories in state
      const sortedStoryIds = posts.map((post) => post._id);
      const sortedStories = stories_.sort((a, b) => {
        const aIndex = sortedStoryIds.indexOf(a._id);
        const bIndex = sortedStoryIds.indexOf(b._id);
        return aIndex - bIndex;
      });

      setSortedStories(sortedStories);
    };

    fetchPosts();
  }, [comments_, upvotes_, stories_]);

  // console.log("sortedStories", sortedStories);

  return (
    <div
      style={{ backgroundColor: "#134074", color: "white", paddingTop: "50px" }}
    >
      <div className="container">
        {sortedStories.map((p) => {
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

export default Trending;
