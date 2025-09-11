import { useState } from "react";
import myHRBackend from './myHRBackend';
import SecurityQuestion from "./SecurityQuestion";

export default function ForgotPassword(){

    const [username, setUsername] = useState("");
    const [userNotFound, setUserNotFound] = useState(false);
    const [securityQuestion, setSecurityQuestion] = useState(null);
    const [securityAnswer, setSecurityAnswer] = useState(null);

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
                setUserNotFound(false);
                setSecurityQuestion(response.data.securityQuestion);
                setSecurityAnswer(response.data.securityAnswer);
                // console.log(response.data);
            }else{
                setUserNotFound(true);
                setSecurityAnswer(null);
                setSecurityQuestion(null);
            }
        }catch(error){
            setUserNotFound(true);
            setSecurityAnswer(null);
            setSecurityQuestion(null);
            console.error("Error: ",error);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        getSecurityQuestion();   
    }

    if(securityQuestion && securityAnswer){
        return (
            <SecurityQuestion securityQuestion={securityQuestion} securityAnswer={securityAnswer} username={username}></SecurityQuestion>
        );
    }
    else{
        return (
            <div className="d-flex justify-content-center align-items-center h-75">
                <form onSubmit={handleSubmit} className={`d-flex flex-column shadow rounded-4 border border-dark border-1 w-50 p-5 m-5 gap-3`}>
                    <label className="form-label">
                        Enter username:
                        <input className="form-control" type="text" name="username" value={username||""} onChange={handleChange} pattern="^([a-z]{1}[a-z0-9]{1,})(@myHR\.in)$" required></input>
                    </label>   
                    {userNotFound && <span className="text-danger">User not found.</span>}
                    <input className="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    }
}