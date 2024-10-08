import React, { useState } from "react";
import { NotificationContainer,NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import Logo from './logo'
export default function Forgotpassword()
{

  let [validemail,setValidemail] = useState()
  let [errors, setErrors] = useState(
    {
      email: '',
    }
  )
      const Validatemail = async (e) => {
        alert('hii')
      e.preventDefault();
  
  //     // Assuming `validemail` comes from state or props
      if (!validemail) {
          setErrors({ validemail: 'Email is missing.' });
          return;
      }
      let ValidData = { validemail};
      console.log(ValidData);
  
      try {
          const response = await fetch('http://localhost:5000/sendlink', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(ValidData),
          });
          if (response.ok) {
              const result = await response.json();
              console.log('Server response:', result);
              if (result.success) {  // Assuming success is a boolean
                NotificationManager.success('email sent successfully', 'Success');
              } else {
                  NotificationManager.error('Failed to send email.', 'Error');
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

  return(<>
<div className="main-body">
<NotificationContainer/>
  <div className="">
      <div className="col-xs-12">    
            <Logo/>
          <div className='headline'>
            <h1 style={{ fontSize: '36px' }}><b>Reset Password</b></h1>
          </div>
          <form  name="reset_pass" 
          // className="form-horizontal"
          // encType="multipart/form-data"
          method="post" onSubmit={Validatemail}
            id="register" className="form-horizontal" encType="multipart/form-data">
            <div className="form-group">
              <input type="text"
                name="email"  value={validemail}
                id="id" onChange={(e)=>setValidemail(e.target.value)}
                className="form-control login-textbox"
                placeholder="Email Id"/>
               {<div className='text-danger'>{errors.validemail} </div>}

            </div>
            <div className="text-center" style={{ marginBottom: 20 }}>
              <button
                type="submit"
                className="btn btn-custom-black"
                style={{ width: "100%" }}>
                    Reset Password
              </button>
            </div>
            <div className="text-center">
              Back to 
              <Link to='/login' style={{textDecoration:'none'}}>
                &nbsp; Login
              </Link>
              &nbsp; or
              <Link to='/register' style={{textDecoration:'none'}}>
               &nbsp; register
              </Link>
            </div>
          </form>

        </div>
      </div>
      </div>
      {/* </div> */}
    {/* </div> */}
  </>)
}