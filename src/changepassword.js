import {  useState,useEffect } from 'react';
import './password.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { NotificationContainer,NotificationManager } from 'react-notifications';
import Logo from './logo'
// import VarifyRegister from './varifyregister';

export default function ChangePassword() {
    // VarifyRegister()
    const [currentpassword,setCurrentpassword] = useState('');
    const [newpassword,setNewpassword] = useState('');
    const [confirmnewpassword,setConfirmpassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const storedUser = sessionStorage.getItem('user');
    // console.log(storedUser)
    let userData = storedUser ? JSON.parse(storedUser) : {};
    let userId = userData.id
    console.log(userData)
    console.log(userId)
  const [id,setId] = useState(userId)
    let navigate = useNavigate() 
    let formIsValid = ''

    const [errors, setErrors] = useState({
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: '',
    });
   
    const handleSubmit =async (event) => {
      event.preventDefault();
      const newErrors = {
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: '',
      };
      
         if (!currentpassword) {
        newErrors.currentpassword ='current password is missing.';
        formIsValid = false;
      }
      if (!newpassword) {
        newErrors.newpassword = 'new Password is missing.';
        formIsValid = false;
      }

      if (!confirmnewpassword) {
        newErrors.confirmnewpassword = 'confirm Password is missing.';
        formIsValid = false;
      }
      
      setErrors(newErrors);
  
      if (formIsValid) {
        // Handle successful form submission
        console.log('Form is valid and ready for submission');
      }
      
      let Formdata = {
         id,
        currentpassword,
        newpassword,
        confirmnewpassword
      }
      console.log(Formdata);
      
      try {
        // Send data to the server
        const response = await fetch('http://localhost:5000/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Formdata)
        });
        console.log(response)
        // Handle the response
        if (response.ok) {
          const result = await response.json();
          console.log('Server response:', result);
          console.log(response)
          if (response.ok === true) {
            NotificationManager.success('change password successful', 'Success',3000,setTimeout(() => {
            navigate ('/editprofile')  
            }, 2000));
              // Perform additional actions on successful login, e.g., redirect
          } else {
            NotificationManager.error(result.message, 'Error');
          }
        } else {
          // Parse the error message from the server
          const errorResult = await response.json();
          console.log('Server error:', errorResult.message);
          console.log(response);
          console.log(userId)
          NotificationManager.error(errorResult.message || 'An unexpected error occurred', 'Error');
        }
      } 
      catch (error) {
        console.error('Error sending form data:', error);
        NotificationManager.error('An error occurred while sending the form data.', 'Error');
      }    
    };
         
    return (<div className='main-body'>
     <NotificationContainer/>
            <Logo/>
          <div className='headline'>
            {/* <h3>Welcome ,</h3> */}
            <h1 style={{ fontSize: '36px' }}>Change Password</h1>
          </div>
          <form name="register" method="post" onSubmit={handleSubmit}
      id="register" className="form-horizontal" encType="multipart/form-data">
      
      <div className="form-group">
        {/* Current Password */}
        <div className="password-input">
          <input type={showCurrentPassword ? "text" : "password"}
            name="currentpassword" value={currentpassword}
            id="current-password" onChange={(e) => setCurrentpassword(e.target.value)}
            className="form-control login-textbox"
            placeholder="Current Password" />
          <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="toggle-password">
            <i className={showCurrentPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {<div className='text-danger'>{errors.currentpassword}</div>}

        {/* New Password */}
        <div className="password-input">
          <input
            type={showNewPassword ? "text" : "password"}
            name="password"
            id="new-password"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            className="form-control login-textbox"
            placeholder="New Password" />
          <span onClick={() => setShowNewPassword(!showNewPassword)} className="toggle-password">
            <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {<div className='text-danger'>{errors.newpassword}</div>}

        {/* Confirm Password */}
        <div className="password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmpassword"
            id="confirm-password"
            value={confirmnewpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="form-control login-textbox"
            placeholder="Confirm New Password" />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-password">
            <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {<div className='text-danger'>{errors.confirmnewpassword}</div>}
        <input type='hidden' value={id} onChange={(e)=>{setId(e.target.value)}}/>
      </div>

      <div className="text-center" style={{ marginBottom: 20 }}>
        <button
          type="submit"
          className="btn btn-custom-black register"
          style={{ width: "100%" }}>
          Change password
        </button>
      </div>
    </form>
      </div>
    );
  }