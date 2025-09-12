import { useLocation, useParams } from "react-router-dom";

export default function EditEmployeeDetails(){
    const {username} = useParams();

    return (
        <h1>Edit employee details {username}</h1>
    );
}