import React, { useState } from 'react';

function ProfileUpdateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userName: '',
    agreedToTerms: false,
    about: '',
    college: '',
    yearOfStudy: '',
    linkedin: '',
    github: '',
    twitter: '',
    profilePhoto: '',
    backgroundBanner: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to your backend for processing
    // You can use formData to send the data to your API.

    console.log('Form Data:', formData);
  };

  return (
    <div>
      <h1>Update Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        /><br /><br>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        /><br /><br>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        /><br /><br>

        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
        /><br /><br>

        <label htmlFor="agreedToTerms">Agreed to Terms:</label>
        <input
          type="checkbox"
          id="agreedToTerms"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleInputChange}
          required
        /><br /><br>

        {/* Add other input fields for the remaining profile properties in a similar manner */}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileUpdateForm;
