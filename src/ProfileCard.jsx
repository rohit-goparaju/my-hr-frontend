import { useEffect } from "react";
import { useUserContext } from "./App";
import styles from './ProfileCard.module.css';
import avtar from './assets/avtar.jpg';
import myHRBackend from "./myHRBackend";

export default function ProfileCard(){
    
    const {user, profilePicture, setProfilePicture} = useUserContext();

     useEffect(()=>{
        if(user){
            myHRBackend.get(`/profilePicture/${user.username}`, {responseType : "blob"})
            .then(
                (res)=>setProfilePicture(URL.createObjectURL(res.data))
            )
            .catch(error=>console.error("Error: ",error));
        }else{
            setProfilePicture(avtar);
        }
    },
    [user]);


    return (
        <div className={`d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100`}>
            <div className={`${styles.profilePictureContainer}`}>
            {
                profilePicture && 
                <img src={profilePicture} className={`${styles.profilePicture} shadow rounded-circle`}  alt="profile picture" width="100%" height="100%"></img>
            }
            {
                !profilePicture && 
                <img src={avtar} className={`${styles.profilePicture} shadow rounded-circle`} alt="profile picture" width="100%" height="100%"></img>
            }
            </div>
            <div className="display-6 text-dark fw-bold text-break">{user.role}  |  {user.username}</div>
        </div>
    );




}