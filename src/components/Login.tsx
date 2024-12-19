import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaRequired, setCaptchaRequired] = useState<boolean>(false);
  const [captchaResponse, setCaptchaResponse] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 405) {
      setCaptchaRequired(true);
    } else if (response.ok) {
      alert("Login successful!");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  const handleCaptchaValidation = async () => {
    const response = await fetch("/api/validate-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captchaResponse }),
    });

    if (response.ok) {
      alert("CAPTCHA validation successful! Logging in...");
      setCaptchaRequired(false);
    } else {
      alert("CAPTCHA validation failed.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {captchaRequired && (
        <div className="captcha-container">
          <h3>CAPTCHA Required</h3>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaResponse}
            onChange={(e) => setCaptchaResponse(e.target.value)}
          />
          <button onClick={handleCaptchaValidation} className="captcha-button">
            Validate CAPTCHA
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
