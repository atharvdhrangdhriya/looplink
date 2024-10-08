import Logo from "./logo"
import { Link,useNavigate } from "react-router-dom"
import { NotificationContainer,NotificationManager } from "react-notifications"
// import Checkauth from "./Check"
// import Logout from "./logout"
export default function Setting() {
    let navigate = useNavigate()
    let Logout = function()
    {
        const user = sessionStorage.getItem('user');
    if(user)  {
        sessionStorage.removeItem('user');
        NotificationManager.success('logout','Success', setTimeout(() => {
            navigate('/login')
          }, 3000))
        }
     else{
        console.log(user)
        // alert ('hii')
     }
    }
    return (<>
    <NotificationContainer/>
        <div className="main-body">
            <div className="row">
                <div className="col-xs-12">
                    <Logo />
                    <div className="headline text-center">
                        <h3 style={{ marginTop: '-10px' }}>Settings</h3>
                    </div>
                    <div className="text-center" style={{ marginBottom: 20 ,borderRadius:'20px '}}>
                        <Link
                                to='/dashboard'
                            className="btn btn-custom-black"
                            style={{ width: "100%", marginBottom: 20 ,borderRadius:'20px '}}
                        >
                            My Contact Card
                        </Link>
                        <Link
                            href="https://inflowcard.com/"
                            target="_blank"
                            className="btn btn-custom-black"
                            style={{ width: "100%", marginBottom: 20 ,borderRadius:'20px '}}
                        >
                            Shop Now
                        </Link>
                        <Link
                             to='/editprofile'       
                            className="btn btn-custom-black"
                            style={{ width: "100%", marginBottom: 20,borderRadius:'20px ' }}
                        >
                            Edit Profile
                        </Link>
                        <Link
                            to='/changepassword'
                            className="btn btn-custom-black"
                            style={{ width: "100%", marginBottom: 20 ,borderRadius:'20px ' }}
                        >
                            Change Password
                        </Link>
                        <Link to='' 
                        className="btn btn-custom-black"
                        onClick={Logout}
                            style={{ width: "100%", marginBottom: 20,borderRadius:'20px ' }} >
                            Logout
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </>)
}