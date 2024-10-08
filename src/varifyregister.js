import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function VarifyRegister(){
    let [cookies,setCookies,removeCookies]= useCookies(['register'])
    let navigate = useNavigate();
    console.log(cookies['registerid']);
    
    let RedirectRegister = function()
        {
            useEffect(()=>{
                navigate('/')
            })
        }
       if(cookies['registerid']===undefined)   
            RedirectRegister()//display register
        return(<></>)
    }