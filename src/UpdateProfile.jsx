import { useEffect, useRef, useState } from "react";
import { useUserContext } from "./App";
import myHRBackend from "./myHRBackend";
import { validateImageFileFormat } from "./myHRUtil";
import avtar from './assets/avtar.jpg';

export default function UpdateProfile(){
    const {user, profilePicture, setProfilePicture} = useUserContext();
    const [userFields, setUserFields] = useState({});
    const fileRef = useRef();
    const [initialUserFields, setInitialUserFields] = useState({securityQuestion: "", securityAnswer : ""});
    const [valuesChanged, setValuesChanged] = useState(false);
    const [invalidImage, setInvalidImage] = useState(false);
    const [updateStatus, setUpdateStatus] = useState("");
    const [noProfilePictureInDB, setNoProfilePictureInDB] = useState(false);

    function checkValueUpdates(){
        // console.log(initialUserFields);
        // console.log(userFields);
        return ((userFields.securityQuestion !== initialUserFields.securityQuestion || userFields.securityAnswer !== initialUserFields.securityAnswer || fileRef.current.value));
    }

    function handleChange(event){
        const {name, files, type} = event.target;   
        let {value} = event.target;

        if(value === "" && type !== "file"){
            if(name==="securityQuestion")
            {
                value = initialUserFields.securityQuestion;
            }else{
                value=initialUserFields.securityAnswer;
            }
        }

        setUserFields((prev)=>({...prev, [name] : type==="file"?files[0]:value}));
    }

    const getSecurityDetails = async()=>{
        try{
            const response = await myHRBackend.post("/getSecurityQuestion",{
                username : user.username
            });

            if(response.data){
                // console.log(response.data);
                setInitialUserFields({securityQuestion: response.data?.securityQuestion, securityAnswer: response.data?.securityAnswer});
                setUserFields((prev)=>({...prev, securityQuestion: response.data?.securityQuestion, securityAnswer: response.data?.securityAnswer}));
            }else{
                setInitialUserFields({securityQuestion : "", securityAnswer : ""});
                setUserFields((prev)=>({...prev, securityQuestion: "", securityAnswer: ""}));
            }

        }catch(error){
            setInitialUserFields({securityQuestion : "", securityAnswer : ""});
            setUserFields((prev)=>({...prev, securityQuestion: "", securityAnswer: ""}));
            console.error("Error: ", error);
        }
    };

    useEffect(()=>{
        getSecurityDetails();
        // console.log("getting security");
    },[])

    useEffect(()=>{
        setValuesChanged(checkValueUpdates());
        // console.log(checkValueUpdates());
    }, [userFields]);

    function handleSubmit(event){
        event.preventDefault();
        console.log(userFields);

        if(userFields.profilePicture){
            if(validateImageFileFormat(userFields.profilePicture)){
                setInvalidImage(false);
                updateProfile();
            }else{
                setInvalidImage(true);
            }
        }else{
            updateProfile();
        }
    }

    function handleReset(event){
        fileRef.current.value="";
        setUserFields((prev)=>({...prev, securityQuestion: initialUserFields.securityQuestion, securityAnswer: initialUserFields.securityAnswer}));
        setInvalidImage(false);
        setUpdateStatus("");
    }

    const updateProfile = async ()=>{
        try{

            const formData = new FormData();

            formData.append("securityDetails", 
                new Blob(
                    [
                        JSON.stringify(
                            {
                                securityQuestion : userFields.securityQuestion,
                                securityAnswer : userFields.securityAnswer
                            }
                        )
                    ],
                    {
                        type : "application/json"
                    }
                )
            );
            if(userFields.profilePicture){
                formData.append("profilePicture", userFields.profilePicture);
            }else{
                if(!noProfilePictureInDB)
                    formData.append("profilePicture", new Blob([], {type : "application/octet-stream"}), "empty.png");
                else{
                    const defaultImageResponse = await fetch(avtar);
                    const blob = await defaultImageResponse.blob();
                    formData.append("profilePicture", blob, "avtar.jpg");
                }
            }

            const response = await myHRBackend.put("/updateProfile", formData);

            if(response.data){
                // console.log(response.data);
                setUpdateStatus(response.data);
                window.location.reload();
            }else{
                setUpdateStatus("FAILED");
            }

        }catch(error){
            console.error(error);
            setUpdateStatus("FAILED");
        }
    }

    useEffect(()=>{
        if(user){
            myHRBackend.get(`/profilePicture/${user.username}`, {responseType : "blob"})
            .then(
                (res)=>{
                    setNoProfilePictureInDB(false);
                    setProfilePicture(URL.createObjectURL(res.data));
                }
            )
            .catch(error=>{
                setNoProfilePictureInDB(true);
                console.error("Error: ",error);
            });
            
        }else{
            setProfilePicture(avtar);
        }
    },
    [user]);

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="d-flex flex-column py-5 rounded gap-1">
            <label className="form-label">
                Security question:
                <input className="form-control" type="text" name="securityQuestion" value={userFields.securityQuestion||initialUserFields.securityQuestion} onChange={handleChange}></input>
            </label>
            <label className="form-label">
                Security answer:
                <input className="form-control" type="text" name="securityAnswer" value={userFields.securityAnswer||initialUserFields.securityAnswer} onChange={handleChange}></input>
            </label>
            <label className="form-label">
                profile picture:
                <input ref={fileRef} className="form-control" type="file" name="profilePicture" onChange={handleChange}></input>
            </label>
            {invalidImage && <span className="text-danger">Profile picture needs to be one of <b>JPG | JPEG | PNG</b>.</span>}
            {updateStatus === "FAILED" && <span className="text-danger">Failed to update user <b>{user.username}</b>, contact support.</span>}
            {updateStatus === "SUCCESS" && <span className="text-success">Successfully updated user <b>{user.username}.</b> </span>}
            {
               valuesChanged  &&
                <div className="d-flex gap-3">
                    <input className="btn btn-outline-primary flex-grow-1" type="submit" value="Update Profile"></input>
                    <input className="btn btn-outline-primary flex-grow-1" type="reset"></input>
                </div>
            }
        </form>
    );
}