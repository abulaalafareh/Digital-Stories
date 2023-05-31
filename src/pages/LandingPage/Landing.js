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
          <h1 style={{ color: "#2F4858" }}>Welcome to my website</h1>
          <p style={{ color: "#2F4858" }}>
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
