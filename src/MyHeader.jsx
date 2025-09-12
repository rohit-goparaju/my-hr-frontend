import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "./App";
import logo from "./assets/anger-symbol-svgrepo-com.svg";
import styles from "./MyHeader.module.css";
import { useEffect } from "react";
import avtar from './assets/avtar.jpg';
import myHRBackend from "./myHRBackend";

export default function MyHeader(){

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
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand ms-1" href="/">
        <img alt="myHR logo" src={logo} width="40px" height="40px"></img>
        <span className={`specialElite fs-3 ms-1`}>myHR <span className={`fs-5 navbar-text`}>portal</span></span>
        </a> 
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>           

        <div id="collapsibleNavbar" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto me-4 d-flex gap-3">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li> 
                {
                user && 
                   <li className="nav-item">
                        <NavLink className="nav-link" to="/landing">Dashboard</NavLink>
                    </li>
                }
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                {
                    user && 
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" role="button" to="#" data-bs-toggle="dropdown">
                            <img src={profilePicture} alt="profile picture" width="25px" height="25px" className={`${styles.profilePicture} rounded-circle me-2`}></img>
                            {user.username}
                            </NavLink>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" to="/userProfile">User Profile</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/changePassword">Change password</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </li>
                }

            </ul>
        </div>

        </nav>
    
    );
}