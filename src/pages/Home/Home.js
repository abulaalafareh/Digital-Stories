import React, { useEffect } from "react";
import Story from "../../components/Story";
import TextStory from "../../components/TextStory";
import axios from "axios";
import { useState } from "react";
const Home = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:5000/stories/fetchallstories"
      );
      setPost(response.data);
    };
    getData();
  }, []);
  console.log(post);
  const posts = {
    id: 1,
    username: "johndoe",
    profilePicUrl: "https://via.placeholder.com/150",
    caption: "This is a cool photo!",
    imageUrl: "https://via.placeholder.com/600x400",
    timestamp: "2 hours ago",
  };

  return (
    <div
      style={{ backgroundColor: "#134074", color: "white", paddingTop: "50px" }}
    >
      <div className="container">
        {post.map((p) =>
          p.type === "text" ? (
            <TextStory
              key={p._id}
              color={p.color}
              background_color={p.background_color}
              text={p.text}
              font={p.font}
              postId={p._id} // pass _id as a regular prop
            />
          ) : (
            <h1>Story</h1>
            // <Story
            //   key={p._id}
            //   posts
            //   description={p.description}
            //   multimedia={p.multimedia}
            //   imageUrl={"https://via.placeholder.com/600x400"}
            //   postId={p._id} // pass _id as a regular prop
            // />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
