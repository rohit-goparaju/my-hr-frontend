import { useNavigate } from "react-router-dom";
import myHRBackend from "./myHRBackend";
import { useState } from "react";

export default function LoginForm(){

    const [credentials, setCredentials] = useState({});
    const [badCredentials, setBadCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userDoesNotExist, setUserDoesNotExist] = useState(false);

    const navigate = useNavigate();

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setCredentials(prev=>({...prev, [name] : value}));
    }

    const login = async ()=>{
        try{
            const response = await myHRBackend.post("/login",
                {
                    username: `${credentials.username}`,
                    password: `${credentials.password}`
                }
            );

            // console.log(JSON.stringify(response));
            setBadCredentials(false);
            setUserDoesNotExist(false);
            localStorage.setItem("jwt", response.data.jwt);
            localStorage.setItem("user", response.data.user);

            navigate("/findAllUsers",{replace:true});
        }catch(error){

            const errorData = error.response?.data;    


            if(errorData?.message?.includes('"this.user" is null')){
                setErrorMessage("User does not exist");
                setUserDoesNotExist(true);
                console.log("User does not exist");
            }

            if(errorData?.message === "Bad credentials" || errorData?.password || errorData?.username){
                setBadCredentials(true);
                setErrorMessage("Invalid username or password");
                console.log("Invalid username or password");
            }

            console.error("Error: ", errorData);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        login();
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column shadow rounded border border-1 m-5 p-5"> 
            <label className="form-label" >
                username:
                <input type="text" className="form-control" name="username" value={credentials.username||""} onChange={handleChange} required></input>
            </label>
            <label className="form-label">
                password:
                <input type="password" className="form-control" name="password" value={credentials.password||""} onChange={handleChange} required></input>
            </label>
            {(badCredentials || userDoesNotExist) && <span className="text-danger">{errorMessage}</span>}
            <input className="btn btn-primary" type="submit" value="Login"></input>
        </form>
    );
}