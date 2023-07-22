import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/StoryActions";
import { useNavigate } from "react-router-dom";
import { ToggleFormContext } from "../contextApi/ToggleFormContext";
import { useContext } from "react";

const LoginForm = () => {
  const { updateToggleForm } = useContext(ToggleFormContext);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values
      );

      // handle successful login
      if (response) {
        const auth = response.data.Authentication;
        let { id, username, Authentication, email, picture, isLoggedIn } =
          userState.user;
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/getuser",
            null,
            {
              headers: {
                Authentication: auth,
              },
            }
          );
          email = response.data.email;
          id = response.data._id;
          username = response.data.username;
          Authentication = auth;
          picture = response.data.image ? response.data.image.data : null;
          console.log(picture, response.data);
          isLoggedIn = true;
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
        } catch (error) {
          console.log("error:", error);
        }
      }
    } catch (error) {
      console.log("error:", error.response.data.errors);
      setError(error.response.data.errors);
    }
  };

  return (
    <div>
      <h1 style={{ color: "#2F4858" }}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                backgroundColor: "#2F4858",
                borderColor: "#2F4858",
              }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <p style={{ marginTop: "10px" }}>
              Don't have an account?{" "}
              <a href="#" onClick={updateToggleForm}>
                Register now
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
