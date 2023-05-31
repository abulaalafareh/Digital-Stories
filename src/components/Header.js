import React from "react";
import AppLogo from "./1.PNG";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUser } from "../redux/StoryActions";
const Header = () => {
  const userState = useSelector((state) => state.userReducer);
  let { isLoggedIn, picture } = userState.user;
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (picture) {
      const blob = new Blob([new Uint8Array(picture.data)], {
        type: picture.contentType,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(blob);
    } else {
      setImageUrl(AppLogo);
    }
  }, [picture]);

  const logoutHandler = () => {
    const id = null;
    const username = null;
    const email = null;
    const authToken = null;
    const picture = null;
    const isLoggedIn = false;
    dispatch(
      setUser({
        id,
        username,
        email,
        authToken,
        picture,
        isLoggedIn,
      })
    );
  };
  return isLoggedIn ? (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#01577C",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#FFF", fontWeight: "bold", fontSize: "24px" }}
        >
          <img
            src={imageUrl}
            alt="pic"
            className="rounded-circle me-2"
            style={{ width: "50px" }}
          />
          <span style={{ marginLeft: "10px", color: "#64FFDA" }}>
            Digital Stories
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/Home"
                style={{ color: "#64FFDA" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/leaderboard"
                style={{ color: "#64FFDA" }}
              >
                LeaderBoard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/engagement"
                style={{ color: "#64FFDA" }}
              >
                Engagement
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/trending"
                style={{ color: "#64FFDA" }}
              >
                Trending
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/story-management"
                style={{ color: "#64FFDA" }}
              >
                Story Management
              </Link>
            </li>
            <li className="nav-item" style={{ color: "red" }}>
              <Link
                className="nav-link active"
                to="/"
                style={{ color: "#64FFDA" }}
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
          {/* <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  ) : (
    ""
  );
};

export default Header;
