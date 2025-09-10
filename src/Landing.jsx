import { useUserContext } from "./App";
import FindAllUsers from "./FindAllUsers";
import AdminLanding from "./AdminLanding";
import HRLanding from "./HRLanding";
import EmployeeLanding from "./EmployeeLanding";

export default function Landing(){
    const {user} = useUserContext();
    return (
        <>
         {user.role === "ADMIN" && <AdminLanding></AdminLanding>}
         {user.role === "HR" && <HRLanding></HRLanding>}
         {user.role === "EMPLOYEE" && <EmployeeLanding></EmployeeLanding>}
         <FindAllUsers></FindAllUsers>
        </>
    );
}