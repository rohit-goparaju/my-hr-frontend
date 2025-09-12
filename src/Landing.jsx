import { useUserContext } from "./App";
import FindAllUsers from "./FindAllUsers";
import AdminLanding from "./AdminLanding";
import HRLanding from "./HRLanding";
import EmployeeLanding from "./EmployeeLanding";
import AddUser from "./AddUser";

export default function Landing(){
    const {user} = useUserContext();
    return (
        <>
         {/* {user.role === "ADMIN" && <AdminLanding></AdminLanding>}
         {user.role === "HR" && <HRLanding></HRLanding>}
         {user.role === "EMPLOYEE" && <EmployeeLanding></EmployeeLanding>} */}
         <FindAllUsers></FindAllUsers>
         {(user.role === "ADMIN" || user.role === "HR") && <AddUser></AddUser>}
        </>
    );
}