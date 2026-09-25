import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const endpoint = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setMessageType("success");

        setFormData({
          f_name: "",
          l_name: "",
          username: "",
          password: ""
        });
      } else {
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Could not connect to server");
      setMessageType("error");
    }
  }

  function switchForm() {
    setIsLogin(!isLogin);
    setMessage("");
    setMessageType("");

    setFormData({
      f_name: "",
      l_name: "",
      username: "",
      password: ""
    });
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

        <p className="subtitle">
          {isLogin ? "Log in to continue" : "Sign up to get started"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="name-row">
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="f_name"
                  value={formData.f_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="l_name"
                  value={formData.l_name}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={
                isLogin ? "Enter your username" : "Choose a username"
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                isLogin ? "Enter your password" : "Choose a password"
              }
            />
          </div>

          <button type="submit">
            {isLogin ? "Log In" : "Sign Up"}
          </button>

          <p className="switch-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              className="link-button"
              onClick={switchForm}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>

          {message && (
            <p className={`message ${messageType}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;