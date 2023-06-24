import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./dataContext";
import { useContext } from "react";

export default function UserInfoForm() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [countries, setCountry] = useState([]);
  const [errors, setErrors] = useState({});
  const [countryName, setSelectValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // fetching country list data
  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      setCountry(countries);
    };
    getCountry();
  }, []);

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

    if (name === "email") {
      setEmail(value);
    } else if (name === "userName") {
      setUserName(value);
    }
  };

  const onChangeCountry = (event) => {
    const value = event.target.value;
    setSelectValue(value);
    if (userName && email && value) {
      setIsButtonDisabled(false);
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
      case "email":
        if (!value) {
          // Validate Email Address
          // Make sure email address is not empty
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "userName":
        // Validate userName
        // Make sure the userName is not emtpy
        if (!value) {
          error = "UserName is required";
        }
        break;
      case "countryName":
        // Validate userName
        // Make sure the userName is not emtpy
        if (!value) {
          error = "Country is required";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Submit the form.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset form fields
    setEmail("");
    setUserName("");
    setErrors({});
    // Sending data to other screen using context API
    setData({ userName, email, countryName });
    navigate("/password");
  };

  return (
    <div className="loginContainer">
      <p className="headerTitleStyle">Intial Info</p>
      <div className="loginSquare">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="userNameLabel">Username</label>
            <input
              type="text"
              name="userName"
              className="inputUserName"
              placeholder="  username"
              onChange={validateOnChange}
            />
            {errors.userName && (
              <span className="error">{errors.userName}</span>
            )}
          </div>

          <div>
            <label className="userEmailLabel">Email</label>
            <input
              type="text"
              name="email"
              className="inputUserEmail"
              placeholder="  email"
              onChange={validateOnChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label className="countryLabel">Country</label>
            <select
              className="countryDropdown"
              name="country"
              onChange={onChangeCountry}
            >
              <option default>Select Country</option>
              {countries.map((country) => {
                const { name } = country;
                return <option value={country.value}>{name.common}</option>;
              })}
            </select>
            {errors.country && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <button
              type="submit"
              className="continueButton"
              disabled={isButtonDisabled}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
