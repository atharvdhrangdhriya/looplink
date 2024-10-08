

import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

const EditProfile = () => {
  const [profileName, setProfileName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [id, setId] = useState('');

  // Function to handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Function to handle form submission and update profile
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const profileData = { Fullname: profileName, Username: username, Bio: bio, id };
    console.log('Edited data:', profileData);
    
    try {
      const response = await fetch('http://localhost:5000/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);

        if (result.updatedProfile) {
          // Update state with the updated profile data
          setProfileName(result.updatedProfile.Fullname || '');
          setUsername(result.updatedProfile.Fullname || '');
          setBio(result.updatedProfile.Bio || '');

          // Update session storage with the updated profile
          sessionStorage.setItem('user', JSON.stringify(result.updatedProfile));

          NotificationManager.success('Profile updated successfully', 'Success');
        } else {
          NotificationManager.error('Failed to update profile.', 'Error');
        }
      } else {
        const errorResult = await response.json();
        console.log('Server error:', errorResult.message);
        NotificationManager.error('An unexpected error occurred', 'Error');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      NotificationManager.error('An error occurred while sending the form data.', 'Error');
    }
  };

  // Load user data from session storage on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    console.log('In edit profile', user);
    
    if (user) {
      const userdata = JSON.parse(user);
      console.log(userdata);
      
      setProfileName(userdata.Fullname || ''); // Adjust keys based on your data structure
      setUsername(userdata.Fullname || '');   // Adjust keys based on your data structure
      setBio(userdata.Bio || ''); 
      setId(userdata.id || '');
    }
  }, []);

  return (
    <form 
      name="edit_profile" 
      method="post"
      onSubmit={handleEditProfile}
      id="edit_profile"
      className="form-horizontal"
      encType="multipart/form-data"
    >
      <div className="my-profile">
        <div className="">
          <div className="row">
            <div className="col-xs-12">
              <div className="my-profile-photo">
                <div
                  className="slim slim_profile_photo"
                  data-label=""
                  data-default-input-name="profile_pic"
                  data-size="100,100"
                  data-save-initial-image="true"
                  data-upload-base64="false"
                  data-did-save="imageUpload"
                  data-max-file-size={4}
                  data-instant-edit="true"
                  data-ratio="1:1"
                >
                  <input type="file" id="profile_pic" />
                </div>
              </div>
              <p className="text-center">Change Photo</p>

              <div className="form-group">
                <label htmlFor="name">Profile Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profileName}
                  onChange={handleInputChange(setProfileName)}
                  id="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange(setUsername)}
                  className="form-control"
                  name="username"
                  id="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <input
                  type="text"
                  value={bio}
                  onChange={handleInputChange(setBio)}
                  className="form-control"
                  name="bio"
                  id="bio"
                />
              </div>

              <input
                type="hidden"
                value={id}
                onChange={handleInputChange(setId)}
                className="form-control"
                name="id"
                id="id"
              />

              <div className="text-center" style={{ marginBottom: 20 }}>
                <button
                  type="submit"
                  className="btn btn-custom-black register"
                  style={{ width: '100%' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
