import { replace, useNavigate, useParams } from "react-router-dom";
import myHRBackend from "./myHRBackend";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "./App";

export default function DeleteEmployee(){
    const {user} = useUserContext();
    const {username} = useParams(); 
    const navigate = useNavigate();
    const ranOnce = useRef(false);

    const deleteEmployee = async ()=>{
        try{
            const response = await myHRBackend.delete(`/hr/deleteUser/${username}`);

            if(response.data == "SUCCESS"){
                navigate("/landing", {replace: true});
            }else{
                console.log(response);
            }

        }catch(error){
            console.error("Error: ", error);
        }
    };

    useEffect(
        ()=>{
            if(!user || ranOnce.current)
                return;
            ranOnce.current = true;
            if((user?.role === "ADMIN" || user?.role==="HR") && confirm(`confirm delete: ${username}`))
                deleteEmployee();
            else{
                navigate("/landing", {replace:true});
            }
        }, 
        [navigate, user, username]
    );
    return null;
}