import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/StoryActions";
import { useNavigate } from "react-router-dom";
import { ToggleFormContext } from "../contextApi/ToggleFormContext";
import { useContext } from "react";

const RegisterForm = () => {
  const { updateToggleForm } = useContext(ToggleFormContext);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long"),
    // image: Yup.mixed().required("Profile image is required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      let formDataWithImage = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "image") {
          formDataWithImage.append(key, file);
        } else {
          formDataWithImage.append(key, value);
        }
      });
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formDataWithImage
      );

      // handle successful registration
      if (response) {
        // Retrieve necessary user data from the response
        setSuccessMessage("Registration successful!");
        setErrorMessage(null);
        const { id, username, Authentication, email, picture, isLoggedIn } =
          response.data.user;
        dispatch(
          setUser({
            id,
            username,
            email,
            Authentication,
            picture,
            isLoggedIn,
          })
        );
        navigate("/Home");
      }
    } catch (error) {
      // console.log("error:", error.response.data.errors);
      setError(error.response.data.errors);
      setErrorMessage("User already exists.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "#2F4858" }}>Register</h1>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
                style={{ color: "red" }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
                style={{ color: "red" }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
                style={{ color: "red" }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
                style={{ color: "red" }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicImage">
              <Form.Label>Profile Image</Form.Label>
              <Field
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </Form.Group>

            {error && (
              <div className="error-message">
                {error.map((errorMessage, index) => (
                  <p key={index}>{errorMessage}</p>
                ))}
              </div>
            )}

            <br />
            <Button
              style={{
                backgroundColor: "#134074",
                borderColor: "#134074",
              }}
              variant="primary"
              type="submit"
            >
              Register
            </Button>
            <p style={{ marginTop: "10px" }}>
              Already have an account?{" "}
              <a href="#" onClick={updateToggleForm}>
                Login now
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;
