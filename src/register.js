import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Logo from './logo';
import 'react-notifications/lib/notifications.css';
// import Session from './Session';
// import Checkauth from './Check';
import { useCookies } from 'react-cookie'
export default function Register() {
  // Checkauth();
  let [fullname, setFullname] = useState('')
  let [emailId, setEmailId] = useState('')
  let [password, setPassword] = useState('')
  let [cookies,setCookies] = useCookies(['userdata'])
  const navigate = useNavigate()
  let [errors, setErrors] = useState(
    {
      fullname: '',
      emailId: '',
      password: '',
    }
  )

  // if(sessionStorage.getItem("user"))
  //   {
  //     return <Navigate replace to="/editprofile"/>; 
  //   } 
  //   if(!sessionStorage.getItem("user"))
  //   {
  //     return<Navigate replace to='/login'/>
  //   }
    //  
  let Showdetails = async (e) => {
    e.preventDefault()
    // alert('hii')
    const newErrors = {}
    if (!fullname) newErrors.fullname = 'fullname is missing'
    if (!emailId) newErrors.emailId = 'Email ID is missing';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailId)) {
      newErrors.emailId = 'Email is invalid';
    }
    if (!password) newErrors.password = 'password is missing'
    setErrors(newErrors)
    // setCookies('firstname', firstname, { path: '/' });
    // setCookies('lastname', lastname, { path: '/' });
    // setCookies('emailId', emailId, { path: '/' });
    // setCookies('password',password,{path:'/'})
    // setCookies('dob', dob, { path: '/' });
    // setCookies('contact', contact, { path: '/' });
    // setCookies('course', course, { path: '/' });
    // setCookies('city', city, { path: '/' });
    // setCookies('state', state, { path: '/' });
    //  console.log('firstname is' ,cookies['firstname']);
    let Formdata = {
      fullname,
      emailId,
      password,
    };
    setCookies('userdata', JSON.stringify(Formdata),{path:'/',maxAge:3600})
    console.log('cookies' , cookies.userdata);
    
    console.log(Formdata);
    try {
      // Send data to the server
      const response = await fetch('http://localhost:5000/Admin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(Formdata)
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        NotificationManager.success('Registered successfully', 'Success', 3000, setTimeout(() => {
          navigate('/login')
        }, 3000));
      }

      else {
        console.log('Server error:', response.statusText);
        NotificationManager.error('email or number already exist', 'error')
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      alert('An error occurred while sending the form data.');
    }
  }

  return (<>
    <div className='main-body'>
      <NotificationContainer />
      {/* <div className="d-flex justify-content-center align-items-center vh-100"> */}
        {/* <div className="looplink" style={{ width: '40rem', backgroundColor: '#EEEEEE' }}> */}
        <Logo/>
          <div className='headline'>
            <h3>Welcome ,</h3>
            <h1 style={{ fontSize: '36px' }}><b>Set up your Loop Link</b></h1>
          </div>
          <form name="register" method="post" onSubmit={Showdetails}
            id="register" className="form-horizontal" encType="multipart/form-data">
            <div className="form-group">
              <input type="text" name="name"  id="name"
                 value={fullname} onChange={(e)=>{setFullname(e.target.value)}} 
               className="form-control login-textbox" placeholder="Full Name"/>
          {<div className='text-danger'>{errors.fullname} </div>}
              <input
                type="text"
                name="email"  value={emailId}
                id="id" onChange={(e)=>setEmailId(e.target.value)}
                className="form-control login-textbox"
                placeholder="Email Id"/>
             {<div className='text-danger'>{errors.emailId} </div>}
              <input
                type="password" name="password" id="password" 
                value={password} onChange={(e)=>setPassword(e.target.value)} 
                className="form-control login-textbox" placeholder="Password"/>
              {<div className='text-danger'>{errors.password} </div>}
            </div>
            <Link to='/forgot_password' className="forgot text-right">
              Forgot Password?
            </Link>
            <div className="text-center" style={{ marginBottom: 20 }}>
              <button
                type="submit"
                className="btn btn-custom-black register"
                style={{ width: "100%" }}>
                Register Now!
              </button>
            </div>
            <div className="text-center">
              Already have an account?
              <Link to='/login' style={{textDecoration:'none', color:'#337ab7'}}>
                Login
              </Link>
            </div>
          </form>

        </div>
      {/* </div> */}
      {/* </div> */}
  </>)
}