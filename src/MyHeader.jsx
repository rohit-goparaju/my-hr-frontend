import { NavLink } from "react-router-dom";
import { useUserContext } from "./App";
import logo from "./assets/anger-symbol-svgrepo-com.svg";
import styles from "./MyHeader.module.css";

export default function MyHeader(){

    const {user} = useUserContext();

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
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                {
                user && 
                <>
                   <li className="nav-item">
                        <NavLink className="nav-link" to="/landing">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
                }
            </ul>
        </div>

        </nav>
    
    );
}