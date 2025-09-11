import { useState } from "react";
import { matchPasswords } from "./myHRUtil";
import myHRBackend from "./myHRBackend";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({username, securityAnswer}){
    const [passwords, setPasswords] = useState({});
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target;
        setPasswords((prev)=>({...prev, [name]: value}));
    }

    const resetPassword = async()=>{
        try{
            const response = await myHRBackend.put("/getSecurityQuestion/resetPassword", {
                username : username,
                password : passwords.pwdOne,
                securityAnswer : securityAnswer
            });

            if(response.data === "SUCCESS"){
                setRequestFailed(false);
                setInvalidPassword(false);
                navigate("/logout", {replace:true});
            }else{
                setRequestFailed(true);
            }

        }catch(error){
            
            const errorMessage = error?.response?.data?.newPassword;
            if(errorMessage){
                setInvalidPassword(true);
            }else{
                setRequestFailed(true);
            }

            console.error("Error: ", error);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        if(matchPasswords(passwords.pwdOne, passwords.pwdTwo)){
            setPasswordMismatch(false); 
            resetPassword();
        }
        else{
            setPasswordMismatch(true);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-75">
        <form onSubmit={handleSubmit} className={`d-flex flex-column shadow rounded-4 border border-dark border-1 w-50 p-5 m-5 gap-3`}>
            <label className="form-label">
                Enter new password:
                <input className="form-control" type="password" name="pwdOne" value={passwords.pwdOne||""} onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*@)(?=.*\d+)[a-zA-Z][a-zA-Z0-9@]{5,}$" required></input>
            </label>
            <label>
                Confirm new password:
                <input className="form-control" type="password" name="pwdTwo" value={passwords.pwdTwo||""} onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*@)(?=.*\d+)[a-zA-Z][a-zA-Z0-9@]{5,}$" required></input>
            </label>
            {passwordMismatch && <span className="text-danger">Passwords do not match.</span>}
            {requestFailed && <span className="text-danger">Request failed!! contact support.</span>}
            {invalidPassword && <span className="text-danger">Invalid password.</span>}
            <input className="btn btn-primary" type="submit" value="Change Password"></input>
        </form>
        </div>
    );
}