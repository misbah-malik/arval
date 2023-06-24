import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [errors, setErrors] = useState({});

  /**
   * Validate input using onChange event
   * @param  {String} formName The name of the form in the state object
   * @return {Function} a function used for the event
   */
  const validateOnChange = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === "password") {
      setPassword(value);
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
    }
  };

  /**
   * Validate user input on Change
   *
   * @param {Object} params
   * @returns {Object}
   */
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "password":
        error =
          value.length === 0
            ? "Password is required"
            : value.length < 8
            ? "Password should contain at least 8 characters"
            : "";
        break;
      case "repeatPassword":
        error =
          value.length === 0
            ? "Repeat password is required"
            : value.length < 8
            ? "Password should contain at least 8 characters"
            : password !== value
            ? "Password and repeat password should be same"
            : "";
        break;
      default:
        break;
    }

    return error;
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/review");
  };

  return (
    <div className="loginContainer">
      <p className="passwordHeaderStyle">Password Screen</p>
      <div className="passwordContainer">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="userNameLabel">Password</label>
            <input
              type="password"
              name="password"
              className="inputUserName"
              placeholder="password"
              onChange={validateOnChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div>
            <label className="userEmailLabel">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              className="inputUserEmail"
              placeholder="repeat Password"
              onChange={validateOnChange}
            />
            {errors.repeatPassword && (
              <span className="error">{errors.repeatPassword}</span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="continueButton"
              disabled={!password && !repeatPassword}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
