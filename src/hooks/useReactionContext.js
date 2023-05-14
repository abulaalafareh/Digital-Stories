import { useContext, useEffect } from "react";
import { ReactionContext } from "../contextApi/StoryReactionCApi";
const useReactionContext = (postId) => {
  const context = useContext(ReactionContext);
  if (!context) {
    throw new Error(
      "useReactionContext must be used within a ReactionProvider"
    );
  }
  const {
    comments,
    upvotes,
    downvotes,
    fetchComments,
    fetchUpvotes,
    fetchDownvotes,
  } = context;

  useEffect(() => {
    fetchComments(postId);
    fetchUpvotes(postId);
    fetchDownvotes(postId);
  }, []);

  return {
    comments,
    upvotes,
    downvotes,
    fetchComments,
    fetchUpvotes,
    fetchDownvotes,
  };
};

export default useReactionContext;
