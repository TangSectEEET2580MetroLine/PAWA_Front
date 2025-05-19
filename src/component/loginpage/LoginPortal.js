import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./login.css";

function LoginPortal() {
  const [showRegister, setShowRegister] = useState(false);
  const [animate, setAnimate] = useState(false);

  function handleSwitchForm() {
    setAnimate(true);
    setTimeout(() => {
      setShowRegister((prev) => !prev);
      setAnimate(false);
    }, 300); // Duration matches CSS animation
  }

  return (
    <div className={`form-animate-wrapper${animate ? " animate" : ""}`}>
      {showRegister ? (
        <RegisterForm onCancel={handleSwitchForm} />
      ) : (
        <LoginForm onRegisterClick={handleSwitchForm} />
      )}
    </div>
  );
}

export default LoginPortal;