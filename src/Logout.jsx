import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App";

export default function Logout(){
   
    const navigate = useNavigate();
    const {setUser} = useUserContext();

    useEffect(
        ()=>{
            setUser(null);
            localStorage.clear();
            navigate("/", {replace:true});
        },
        [navigate, setUser]
    );

    return (
        <>
        </>
    );
}