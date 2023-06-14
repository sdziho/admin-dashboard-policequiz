import React from "react";
import { Login, LoginForm } from "react-admin";

const CustomLoginForm = (props) => (
  <div>
    <div style={{ fontFamily: "Arial", marginLeft: "15px" }}>
      <p>Username: test@example.com</p>
      <p>Password: password</p>
    </div>
    <LoginForm {...props} />
  </div>
);

const CustomLoginPage = (props) => (
  <Login
    backgroundImage="https://i.imgur.com/fOJBsAM.png"
    loginForm={<CustomLoginForm />}
    {...props}
  />
);

export default CustomLoginPage;
