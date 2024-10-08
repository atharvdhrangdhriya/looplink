import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './register'
import Forgotpassword from './forgotpassword';
import Login from './login'
import Dashboard from './dashboard';
import Profile from './profile';
import EditProfile from './editprofile';
import ChangePassword from './changepassword';
import ProfileQRCode from './qrcode';
// import Profile from './profile';
// import Checkauth from './Check';
import Quality from './quality';
import Setting from './setting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
function MyRoutes() //functional component
{
    return (
    <BrowserRouter>
        <Routes>
           {/* <Route path='/' element={<Home />} />  */}
           <Route path='/' element={<Register />} /> 
           <Route path='/forgot_password' element={<Forgotpassword/>} /> 
             <Route path='/changepassword' element={<ChangePassword/>} /> 
             <Route path='/login' element={<Login />} />
             <Route path='/dashboard' element={<Dashboard/>}/> 
             <Route path='/setting' element={<Setting/>}/> 
            <Route path='/editprofile' element={<EditProfile/>}/>
            {/* <Route path='/checking' element={<Checkauth/>}/> */}
            {/* <Route path='/' element={<Quality/>}/> */}
            <Route path='/qrcode' element={<ProfileQRCode/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </BrowserRouter>)
}
root.render(<MyRoutes />);