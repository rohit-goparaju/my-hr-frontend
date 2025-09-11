import { useRef, useState } from "react";
import { useUserContext } from './App';
import { matchPasswords, validateImageFileFormat } from "./myHRUtil";
import myHRBackend from "./myHRBackend";

export default function AddUser(){
    const [userFields, setUserFields] = useState({role:"EMPLOYEE"});
    const {user} = useUserContext();
    const [addStatus, setAddStatus] = useState("");
    const [invalidImage, setInvalidImage] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const fileRef = useRef(null);
    
    const addUser = async()=>{
        try{
            if(validateImageFileFormat(userFields.profilePicture) && matchPasswords(userFields.password, userFields.confirmPwd)){
                setInvalidImage(false);
                setPasswordMismatch(false);
                let path = null;
                switch(user.role){
                    case "ADMIN": 
                        path = "/admin";
                        break;
                    case "HR":
                        path = "/hr";
                        break;
                }

                const formData = new FormData();
                formData.append(
                    "user",
                    new Blob(
                        [JSON.stringify(
                            {
                                username : userFields.username,
                                password : userFields.password,
                                role : userFields.role,
                            })
                        ],
                        {
                            type: "application/json"
                        }
                    )
                );

                formData.append(
                    "profilePicture",
                    userFields.profilePicture
                );


                const response = await myHRBackend.post(`${path}/addUser`,
                    formData
                );
                if(response.data){
                    setAddStatus("SUCCESS");
                    // console.log(response.data);
                }else{
                    setAddStatus("FAILED");
                }
            }else{
                if(!validateImageFileFormat(userFields.profilePicture)){
                    setInvalidImage(true);
                }
                if(!matchPasswords(userFields.password, userFields.confirmPwd)){
                    setPasswordMismatch(true);
                }
            }
        }catch(error){
            setAddStatus("FAILED");
            console.error("Error: ", error);
        }
    };


    function handleChange(event){
        const {name,value, type, files} = event.target;

        setUserFields((prev)=>({...prev, [name] : type==="file" ? files[0] : value}));
    }

    function handleSubmit(event){
        event.preventDefault();
        addUser();
            // console.log(userFields);
            // console.log(validateImageFileFormat(userFields.profilePicture));
            // console.log(matchPasswords(userFields.password, userFields.confirmPwd));
    }

    function handleReset(event){
        setUserFields({role:"EMPLOYEE"});
        setAddStatus("");
        setInvalidImage(false);
        setPasswordMismatch(false);
        fileRef.current.value = "";
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="d-flex flex-column shadow rounded border border-1 w-75 p-5 m-5 gap-3">
            <label>
                username:
                <input className="form-control" type="text" name="username" value={userFields.username||""} onChange={handleChange}  pattern="^([a-z]{1}[a-z0-9]{1,})(@myHR\.in)$" required></input>
            </label>
            <label>
                password:
                <input className="form-control" type="password" name="password" value={userFields.password||""} onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*@)(?=.*\d+)[a-zA-Z][a-zA-Z0-9@]{5,}$" required></input>
            </label>
            <label>
                confirm password:
                <input className="form-control" type="password" name="confirmPwd" value={userFields.confirmPwd||""} onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*@)(?=.*\d+)[a-zA-Z][a-zA-Z0-9@]{5,}$" required></input>
            </label>
            <label>
                role:
                <select className="form-select" name="role" value={userFields.role||"EMPLOYEE"} onChange={handleChange} required>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="HR">HR</option>
                    {user.role === "ADMIN" && <option value="ADMIN">ADMIN</option>}
                </select>
            </label>
            <label>
                profile picture:
                <input ref={fileRef} className="form-control" type="file" name="profilePicture" onChange={handleChange} required></input>
            </label>
            {invalidImage && <span className="text-danger">Profile picture needs to be one of <b>JPG | JPEG | PNG</b>.</span>}
            {passwordMismatch && <span className="text-danger">Passwords do not match.</span>}
            {addStatus === "FAILED" && <span className="text-danger">Failed to add user, check if <b>{userFields.username}</b> already exists.</span>}
            {addStatus === "SUCCESS" && <span className="text-success">Successfully added user <b>{userFields.username}.</b> </span>}
            <div className="d-flex gap-3">
                <input className="btn btn-primary flex-grow-1" type="submit" value="Add User"></input>
                <input className="btn btn-primary flex-grow-1" type="reset"></input>
            </div>
        </form>
    );
}