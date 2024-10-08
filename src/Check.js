// import React, { useEffect } from "react";         
import {Navigate } from "react-router-dom";
export default function Checkauth() {
    // let navigate = useNavigate()
  const isAuthenticated = () => {
    return sessionStorage.getItem("user"); // Assuming user info is stored in session storage
  };

  // Login component
  const Login = () => {
    // Check if the user is already logged in
    // console.log('Stored user:', sessionStorage.getItem('user')); 
    if (isAuthenticated()) {
        console.log('Stored user:', sessionStorage.getItem('user'));
        // alert('you are logged in')
        //   return <Navigate to="/editprofile" />; // Redirect to dashboard or other page if logged in
        return <Navigate replace to="/editprofile"/>;    }
        else{
          return <Navigate replace to="/login"/>; 
        }
    return null; // Don't return any UI if not logged in
  };

  return <Login />;
}
