import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileQRCode = ({ userId }) => {
  const [profileData, setProfileData] = useState({});
  const [qrCode, setQrCode] = useState(null);
  const [id, setId] = useState('');

  // Fetch user profile data dynamically based on userId
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : {};
    setId(userData.id);
    console.log('user data', userData);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/qrcode/${userData.id}`);
        console.log('get response', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfile();
  }, [userId]); // Dependency on userId for dynamic fetching

  // Generate QR Code after fetching profile data
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await axios.post('http://localhost:5000/generate-qr', profileData);
        setQrCode(response.data);
      } catch (error) {
        console.error('Error generating QR code:', error.message);
      }
    };

    if (Object.keys(profileData).length > 0) {
      generateQRCode(); // Generate QR code if profile data is available
    }
  }, [profileData]); // Generate QR code when profileData changes

  return (
    <div>
      <h1>Profile QR Code</h1>
      {qrCode ? (
        <div>
          <img
            src={`data:image/svg+xml;base64,${btoa(qrCode)}`}
            alt="Profile QR Code"
            style={{ width: '200px', height: '200px' }} // Adjust these values as needed
          />
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default ProfileQRCode;
