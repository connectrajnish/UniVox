import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL;

export default function Help() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to your backend server using Axios or fetch
      const response = await axios.post(`${API_URL}/help`, formData);

      // Handle the response as needed
      console.log("Form data sent successfully:", response.data);

      // Clear the form
      setFormData({
        username: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Error")
      console.error("Error sending form data:", error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl m-auto text-blue-gray-900">
      <div className="flex items-center justify-between">
        <Typography variant="h4">Reach out to us</Typography>
      </div>
      <hr className="my-3" />
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Input
            required
            type="text"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            required
            type="email"
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <Textarea
            required
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <hr className="my-3" />
        <div className="flex justify-end">
          <Button variant="outlined" color="red" className="mx-2" onClick={()=>{navigate('/')}}>
            Discard
          </Button>
          <Button type="submit" variant="gradient" color="green">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
