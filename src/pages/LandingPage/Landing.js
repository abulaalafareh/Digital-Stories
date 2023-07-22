import React from "react";
import LoginForm from "../../components/login";
import RegisterForm from "../../components/Register";
import { ToggleFormContext } from "../../contextApi/ToggleFormContext";
import { useContext } from "react";

const Landing = () => {
  const { loginForm } = useContext(ToggleFormContext);
  console.log(loginForm);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "110vh",
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
            height: "650px",
          }}
        >
          <h1 style={{ color: "#2F4858" }}>Welcome to Digital Stories</h1>
          <p style={{ color: "#2F4858" }}>
            Stories have been going around since the start of time so what is
            stopping you from sharing yours? Share your experiences, Share your
            thoughts, Share your achievements share what can be shared.
          </p>
        </div>
        <div
          style={{
            width: "48%",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            padding: "40px",
            backgroundColor: "#ffffff",
            height: "650px",
          }}
        >
          {loginForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Landing;
