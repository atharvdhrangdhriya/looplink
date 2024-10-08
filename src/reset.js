import { useState } from "react"
// import { useCookies } from "react-cookie";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useNavigate} from 'react-router-dom'
import 'react-notifications/lib/notifications.css';

export default function Reset() {
    let [newpassword,setNewpassword] = useState('')
    let [confirmpassword,setConfirmpassword] = useState('')
    const navigate = useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)
    const token1 = queryParameters.get("token")
      
    let [token,setToken] = useState('token1')
    let [errors, setErrors] = useState(
        newpassword,
        confirmpassword
    )
    let Resetpassword = async function(e) {
        e.preventDefault();
        
        // Initialize errors object
        const newErrors = {};
    
        // Validate form fields
        if (!newpassword) newErrors.newpassword = 'Missing';
        if (!confirmpassword) newErrors.confirmpassword = 'Missing';
        if (newpassword !== confirmpassword) newErrors.confirmpassword = 'Passwords do not match';
    
        setErrors(newErrors);
    
        // Return if there are validation errors
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        // Prepare form data
        let Formdata = {
            token1,
            newpassword
        };
        
        console.log('Form data:', Formdata);
            console.log(token1);
            
        try {
            // Send data to the server
            const response = await fetch('http://localhost:5000/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Formdata)
            });
    
            // console.log('Server response status:', response.status);
    
            // Check if the response status is OK
            if (response.ok) { // response.ok is true for status codes in the range 200-299
                const result = await response.json();
                console.log('Server response:', result);
                NotificationManager.success('Password changed successfully', 'Success',2000,setTimeout(() => {
                    navigate('/login')
                },2000));
            } else {
                // Handle non-200 responses
                const errorText = await response.text(); // Read the response as text
                console.log('Server error:', errorText);
                NotificationManager.error('Error in changing password', 'Error',2000,setTimeout(() => {
                    navigate('/login') 
                }, 2000));
            }
        } catch (error) {
            console.log(Formdata);
            console.error('Error sending form data:', error);
            alert('An error occurred while sending the form data.');
        }
    };
    
    return (
        <>
        <NotificationContainer/>
          <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow text-bg-dark ">
                            <div className="card-header text-center">
                                <h4>Reset Password</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={Resetpassword}>
                                    <div className="mb-3">
                                        <label htmlFor="new-password" className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            value={newpassword}
                                            onChange={(e)=>setNewpassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            id="new-password"
                                            placeholder="Enter new password" />
                                              {<div className='text-danger'>{errors.newpassword}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmpassword}
                                            onChange={(e)=>setConfirmpassword(e.target.value)}
                                            className="form-control"
                                            id="confirm-password"
                                            placeholder="Confirm new password" />
                                              {<div className='text-danger'>{errors.confirmpassword}</div>}
                                    </div>
                                    <div className="mb-3">  
                                        <input
                                            type="hidden"
                                            value={token}
                                            onChange={(e)=>setToken(e.target.value)}
                                            className="form-control"
                                            id="token"
                                            placeholder="Confirm new password" />
                                              {/* {<div className='text-danger'>{errors.confirmpassword}</div>} */}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Reset Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}