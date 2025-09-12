import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ProfileCard from "./ProfileCard";
import styles from './UserProfile.module.css';
import UpdateProfile from "./UpdateProfile";

export default function UserProfile(){
    return (
        <div className={`${styles.userProfileContainer} p-1`}>
            <div className={`${styles.profileCardContainer}`}>
                <ProfileCard></ProfileCard>
            </div>
            <div className={`${styles.buttonsContainer} d-flex flex-column gap-3 px-5`}>
                <Link className="btn btn-outline-dark" to="/changePassword">Change Password</Link>
                <Link className="btn btn-outline-dark" to="/logout">Logout</Link>
            </div>
            <div className={`${styles.content} p-5`}>
                <h1>User Profile: </h1>
                <UpdateProfile></UpdateProfile>
            </div>
        </div>
    );
}