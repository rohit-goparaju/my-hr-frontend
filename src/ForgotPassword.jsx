import { useState } from "react";
import myHRBackend from './myHRBackend';

export default function ForgotPassword(){

    const [username, setUsername] = useState("");

    function handleChange(event){
        const {value} = event.target;
        setUsername(value);
    }

    const getSecurityQuestion = async ()=>{
        try{
            const response = await myHRBackend.post("/getSecurityQuestion",{
                username: username
            });

            if(response.data){
                console.log(response.data);
            }else{
                console.log("no response");
            }
        }catch(error){
            console.error("Error: ",error);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-75">
            <form onSubmit={handleSubmit} className={`d-flex flex-column shadow rounded-4 border border-dark border-1 w-50 p-5 m-5 gap-3`}>
                <label className="form-label">
                    Enter username:
                    <input className="form-control" type="text" name="username" value={username||""} onChange={handleChange} pattern="^([a-z]{1}[a-z0-9]{1,})(@myHR\.in)$" required></input>
                </label>   
                <input className="btn btn-primary" type="submit"></input>
            </form>
        </div>
    );
}