import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "./App";
import myHRBackend from "./myHRBackend";

export default function EditEmployeeDetails(){
    const {username, role} = useParams();
    const [userRole, setUserRole] = useState(role);
    const {user} = useUserContext();
    const [requestFailed, setRequestFailed] = useState(false);
    const navigate = useNavigate();

    function handleChange(event){
        setUserRole(event.target.value);
    }

    const updateRole = async ()=>{
        try{
               let path = null;
                switch(user.role){
                    case "ADMIN": 
                        path = "/admin";
                        break;
                    case "HR":
                        path = "/hr";
                        break;
                }

            const response = await myHRBackend.put(`${path}/updateRole`, {
                username : username,
                role : userRole
            });

            if(response.data){
                setRequestFailed(false);
                navigate("/landing", {replace:true});
            }else{
                setRequestFailed(true);
            }

        }catch(error){
            setRequestFailed(true);
            console.error(error);
        }
    };

    function handleSubmit(event){
        event.preventDefault();
        updateRole();
        // console.log(userRole);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <h1>Editing user: {username}</h1><h1>Current role: {role}</h1>
            <form onSubmit={handleSubmit} className={`d-flex flex-column shadow rounded-4 border border-dark border-1 w-50 p-5 m-5 gap-3`}>
                <label className="form-label">
                    Role:
                    <select className="form-select" name="role" value={userRole||{role}} onChange={handleChange} required>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="HR">HR</option>
                    {user.role === "ADMIN" && <option value="ADMIN">ADMIN</option>}
                </select>
                </label>
                {requestFailed && <span className="text-danger">Request Failed, contact support.</span>}
                <input className="btn btn-primary" type="submit"></input>
            </form>
        </div>
    );
}