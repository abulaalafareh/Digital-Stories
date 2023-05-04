import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/StoryActions";
const Landing = () => {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (showLogin) {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          formData
        );
        // handle successful login
        console.log(response);
        if (response) {
          const auth = response.data.Authentication;
          console.log(auth);
          let { id, username, Authentication, email, picture } = userState.user;
          console.log("auth : ", auth);
          try {
            const response = await axios.post(
              "http://localhost:5000/auth/getuser",
              null, // pass null as the second argument since there is no request data
              {
                headers: {
                  Authentication: auth,
                },
              }
            );
            email = response.data.email;
            id = response.data.id;
            username = response.data.username;
            Authentication = auth;
            picture = response.data.image.data;
            dispatch(setUser({ id, username, email, Authentication, picture }));

            console.log(response.data);
          } catch (error) {
            console.log("error ere", error);
          }
        }
      } else {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataWithImage.append(key, value);
        });
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          formDataWithImage
        );
        // handle successful registration
      }
    } catch (error) {
      // handle error
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#134074",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "48%",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            padding: "40px",
            backgroundColor: "#ffffff",
            height: "550px",
          }}
        >
          <h1 style={{ color: "#134074" }}>Welcome to my website</h1>
          <p style={{ color: "#134074" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div
          style={{
            width: "48%",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            padding: "40px",
            backgroundColor: "#ffffff",
            height: "550px",
          }}
        >
          <h1 style={{ color: "#134074" }}>
            {showLogin ? "Login" : "Register"}
          </h1>
          <Form>
            {showLogin ? null : (
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>

            {showLogin ? (
              <>
                <Button
                  style={{
                    backgroundColor: "#134074",
                    borderColor: "#134074",
                  }}
                  variant="primary"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Login
                </Button>
                <p style={{ marginTop: "10px" }}>
                  Don't have an account?{" "}
                  <a href="#" onClick={toggleForm}>
                    Register now
                  </a>
                </p>
              </>
            ) : (
              <>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                  />
                </Form.Group>

                <Button
                  style={{
                    backgroundColor: "#134074",
                    borderColor: "#134074",
                  }}
                  variant="primary"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Register
                </Button>
                <p style={{ marginTop: "10px" }}>
                  Already have an account?{" "}
                  <a href="#" onClick={toggleForm}>
                    Login now
                  </a>
                </p>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
