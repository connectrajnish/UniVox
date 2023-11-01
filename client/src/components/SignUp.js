import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.API_URL;

export default function SimpleRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the backend using Axios
    try {
      
      const response = await axios.post(`${API_URL}/user/sign-up`, formData);

      // Handle the response, e.g., show success message or redirect
      // console.log("Registration successful!", response.data);
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 400 &&
          data.msg === "User already exists with that email or userName"
        ) {
          // Handle the case where the user already exists
          // You can display an error message or take any other appropriate action
          alert("User already exists with that email or userName");
          // Example: Show an error message
          // setErrorMsg("A user with the same email or username already exists.");
        } else {
          // Handle other errors, e.g., server errors
          alert("Registration failed")
          console.error("Registration failed:", error);
        }
      } else {
        // Handle network errors
        alert("Network error");
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={true} className="p-3">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              required
              size="lg"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              required
              size="lg"
              label="UserName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <Input
              required
              type="email"
              size="lg"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              required
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              Use at least 6 characters long.
            </Typography>
          </div>
          <Checkbox
            required
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <Link
                  to="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
