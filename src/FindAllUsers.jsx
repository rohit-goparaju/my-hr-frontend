import { useEffect, useState } from "react";
import myHRBackend from "./myHRBackend";
import { Link } from "react-router-dom";

export default function FindAllUsers(){

    const [users, setUsers] = useState([]);

    const findAllUsers = async()=>{
        try{
            const response = await myHRBackend.get("/admin/findAllUsers");

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
            <Link to="/logout">logout</Link>
        </>
    );


}