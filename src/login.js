import { useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Logo from './logo'
// import VarifyRegister from './varifyregister';

export default function Login() {
  // VarifyRegister()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate()
  let formIsValid = ''

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    validemail: ''
  });

  // const user = sessionStorage.getItem('user');
  // if (sessionStorage.getItem('user')) {
  //   return <Navigate replace to="/editprofile" />;
  // }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!email) {
      newErrors.email = 'Email is missing.';
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is missing.';
      formIsValid = false;
    }
    setErrors(newErrors)

    if (formIsValid) {
      // Handle successful form submission
      console.log('Form is valid and ready for submission');
    }

    let Formdata = {
      email,
      password
    }
    console.log(Formdata);

    try {
      // Send data to the server
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Formdata)
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);

        if (result.success === 'yes') {
          NotificationManager.success('Login successful', 'Success',3000,setTimeout(() => {
          navigate ('/editprofile')  
          }, 2000));
          sessionStorage.setItem('user', JSON.stringify(result.data));
          console.log('result', result.data);
          // Retrieve and parse the user data
          const storedUser = JSON.parse(sessionStorage.getItem('user'));
          console.log('Stored user:', storedUser); // This will log the object without escape characters
          // Perform additional actions on successful login, e.g., redirect
        } else {
          NotificationManager.error(result.message, 'Error');
        }
      } else {
        // Parse the error message from the server
        const errorResult = await response.json();
        console.log('Server error:', errorResult.message);
        NotificationManager.error(errorResult.message || 'An unexpected error occurred', 'Error');
      }
    }
    catch (error) {
      console.error('Error sending form data:', error);
      NotificationManager.error('An error occurred while sending the form data.', 'Error');
    }
  };

  return (<div className='main-body'>
    <NotificationContainer />
    <Logo />
    <div className='headline'>
      <h3>Welcome ,</h3>
      <h1 style={{ fontSize: '36px' }}>Login to Continue</h1>
    </div>
    <form name="register" method="post" onSubmit={handleSubmit}
      id="register" className="form-horizontal" encType="multipart/form-data">
      <div className="form-group">
        <input type="text"
          name="email" value={email}
          id="id" onChange={(e) => setEmail(e.target.value)}
          className="form-control login-textbox"
          placeholder="Email Id" />
        {<div className='text-danger'>{errors.email}</div>}
        <input
          type="password" name="password" id="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="form-control login-textbox" placeholder="Password" />
        {<div className='text-danger'>{errors.password}</div>}
      </div>
      <Link to='/forgot_password' className="forgot text-right">
        Forgot Password?
      </Link>
      <div className="text-center" style={{ marginBottom: 20 }}>
        <button
          type="submit"
          className="btn btn-custom-black register"
          style={{ width: "100%" }}>
          Login Securely
        </button>
      </div>
      <div className="text-center">
        Already have an account?
        <Link to='/' style={{ textDecoration: 'none' }}>
          register
        </Link>
      </div>
    </form>



  </div>
  );
}