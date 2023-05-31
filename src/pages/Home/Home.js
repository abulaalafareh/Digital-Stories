import React, { useEffect, useState } from "react";
import TextStory from "../../components/TextStory";
import MultimediaStory from "../../components/MultimediaStory";
import axios from "axios";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ReactionContext } from "../../contextApi/ReactionContext";

const Home = () => {
  const userState = useSelector((state) => state.userReducer);
  const { Authentication } = userState.user;

  const { updateStories, updateUserInfo } = useContext(ReactionContext);
  const [post, setPost] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const pageSize = 20; // Number of posts to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true); // Add isFirstLoading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/stories/fetchallstories?page=${currentPage}&pageSize=${pageSize}`
        );
        updateStories(response.data.stories);
        const filteredStories = response.data.stories.filter(
          (story) => story.status === true
        );
        setPost(filteredStories);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      setIsFirstLoading(false); // Set isFirstLoading to false after the first useEffect completes
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (!isFirstLoading) {
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
            // console.log(image);
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
    }
  }, [post, isFirstLoading, Authentication]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{ backgroundColor: "#134074", color: "white", paddingTop: "50px" }}
    >
      <div className="container">
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          post.map((p) => {
            const user = userInfo.find((u) => u.userId === p.user);
            const username = user ? user.username : ""; // Get the username from userInfo
            if (!user) {
              // Wait for user info to populate before rendering components
              return null;
            }
            return p.type === "text" ? (
              <TextStory
                key={p._id}
                color={p.color}
                background_color={p.background_color}
                text={p.text}
                font={p.font}
                postId={p._id}
                date={p.date}
                status={p.status}
                user={user}
                username_={username} // Pass the username as a prop
              />
            ) : (
              <MultimediaStory
                key={p._id}
                multimedia={p.multimedia}
                description={p.description}
                username_={username} // Pass the username as a prop
                date={p.date}
                type={p.type}
                user={user}
                status={p.status}
                postId={p._id}
              />
            );
          })
        )}

        {/* Pagination controls */}
        {!isLoading && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={pageNumber === currentPage ? "active" : ""}
                  style={{
                    background:
                      pageNumber === currentPage ? "white" : "#134074",
                    color: pageNumber === currentPage ? "#134074" : "white",
                    border: "1px solid #134074",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
