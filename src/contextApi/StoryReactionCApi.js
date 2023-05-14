import React, { createContext, useState } from "react";
import axios from "axios";
const ReactionContext = createContext();
const ReactionProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/comments/fetchallcomments/story/${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpvotes = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/vote/upvotes/${postId}`
      );
      setUpvotes(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDownvotes = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/vote/downvotes/${postId}`
      );
      setDownvotes(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const reactionContextValue = {
    comments,
    upvotes,
    downvotes,
    fetchComments,
    fetchUpvotes,
    fetchDownvotes,
  };

  return (
    <ReactionContext.Provider value={reactionContextValue}>
      {children}
    </ReactionContext.Provider>
  );
};
export { ReactionContext, ReactionProvider };
