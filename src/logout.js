
import { NotificationContainer,NotificationManager } from "react-notifications"
import 'react-notifications/lib/notifications.css';
import { Navigate } from "react-router";   
export default function Logout ()
{

    const user = sessionStorage.getItem('user');
    // let remove = sessionStorage.removeItem('user')
    if(user)  
        { sessionStorage.removeItem('user');
             console.log('hii')
          NotificationManager.success('logout','success')
        // navigate('/login')
      return  <Navigate replace to='./login'/>
        }
     else{
        console.log(user)
        alert ('hii')
     }
          return(<>
              <NotificationContainer/>
          </>)
    }

