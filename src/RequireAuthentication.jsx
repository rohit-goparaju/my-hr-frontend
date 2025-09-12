import { useEffect } from "react";
import { useUserContext } from "./App";
import { useNavigate } from "react-router-dom";

export default function RequireAuthentication({children}){
    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(!user && !localStorage.getItem("user") && !localStorage.getItem("jwt")){
                navigate("/", {replace: true});
            }
        }
        ,[user, navigate]
    );

    if(user !== null){
        return children;
    }else{
        return null;
    }

}