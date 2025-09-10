import { useEffect, useState } from "react";
import myHRBackend from "./myHRBackend";
import { Link } from "react-router-dom";
import { useUserContext } from "./App";

export default function FindAllUsers(){

    const [users, setUsers] = useState([]);
    const {user} = useUserContext();

    const findAllUsers = async()=>{
        try{
            let path = null;
            switch(user.role){
                case "ADMIN": 
                    path = "/admin";
                    break;
                case "HR":
                    path = "/hr";
                    break;
                case "EMPLOYEE":
                    path = "/employee";
                    break;
            }
            const response = await myHRBackend.get(`${path}/findAllUsers`);

            setUsers(response.data);

        }catch(error){
            console.error("Error: ", error);
        }
    }

    useEffect(
        ()=>{
            findAllUsers()
        },
        []
    );

    return (
        <>
            <ul>
                {users.map(
                    (myHRUser, index, users)=><li key={myHRUser.username}>{myHRUser.username}</li>
                )}
            </ul>
        </>
    );


}