import React, { createContext, useState } from "react";

const ReactionContext = createContext();
const ReactionProvider = ({ children }) => {
  const [stories_, setstories_] = useState([]);
  const [downvotes_, setDownvotes_] = useState([]);
  const [comments_, setComments_] = useState([]);
  const [upvotes_, setUpvotes_] = useState([]);
  const [userInfo, setUserInfo] = useState([]); // Added userInfo state

  const updateComments = (newComments) => {
    setComments_((prevComments) => [
      ...prevComments,
      ...newComments.filter(
        (newComment) =>
          !prevComments.some(
            (prevComment) => prevComment._id === newComment._id
          )
      ),
    ]);
  };

  const updateUpvotes = (newUpvotes) => {
    setUpvotes_((prevUpvotes) => [
      ...prevUpvotes,
      ...newUpvotes.filter(
        (newUpvote) =>
          !prevUpvotes.some((prevUpvote) => prevUpvote._id === newUpvote._id)
      ),
    ]);
  };

  const updateDownvotes = (newDownvotes) => {
    setDownvotes_((prevDownvotes) => [
      ...prevDownvotes,
      ...newDownvotes.filter(
        (newDownvote) =>
          !prevDownvotes.some(
            (prevDownvote) => prevDownvote._id === newDownvote._id
          )
      ),
    ]);
  };

  const updateStories = (newStories) => {
    setstories_((prevStories) => [
      ...prevStories,
      ...newStories.filter(
        (newStory) =>
          !prevStories.some((prevStory) => prevStory._id === newStory._id)
      ),
    ]);
  };

  const updateUserInfo = (newUserInfo) => {
    setUserInfo((prevUserInfo) => [
      ...prevUserInfo,
      ...newUserInfo.filter(
        (newUser) =>
          !prevUserInfo.some((prevUser) => prevUser.userId === newUser.userId)
      ),
    ]);
  };

  const reactionContextValue = {
    downvotes_,
    comments_,
    upvotes_,
    stories_,
    userInfo,
    updateComments,
    updateDownvotes,
    updateUpvotes,
    updateStories,
    updateUserInfo,
  };

  return (
    <ReactionContext.Provider value={reactionContextValue}>
      {children}
    </ReactionContext.Provider>
  );
};

export { ReactionContext, ReactionProvider };
