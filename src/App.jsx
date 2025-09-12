import { Route, Routes } from "react-router-dom";
import MyHRLayout from "./MyHRLayout";
import Test from "./Test";
import LoginForm from "./LoginForm";
import FindAllUsers from "./FindAllUsers";
import Logout from "./logout";
import { createContext, useContext, useEffect, useState } from "react";
import About from "./About";
import Landing from "./Landing";
import RequireAuthentication from "./RequireAuthentication";
import Login from "./Login";
import avtar from "./assets/avtar.jpg";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import UserProfile from "./UserProfile";
import ViewEmployeeDetails from "./EditEmployeeDetails";
import DeleteEmployee from "./DeleteEmployee";

const userContext = createContext();

export function useUserContext(){
  return useContext(userContext);
}

export default function App(){

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(avtar);

  function updateUserFromLocalStorage(){
     const userString = localStorage.getItem("user");
      // console.log(userString);
      if(userString){
        const savedUser = JSON.parse(userString);
        setUser(savedUser);
      }
  }

  useEffect(
    ()=>{
      updateUserFromLocalStorage();
      window.addEventListener("storage", updateUserFromLocalStorage);

      return ()=>{window.removeEventListener("storage", updateUserFromLocalStorage);};
    },
    []
  );

  return (
    <userContext.Provider value={{user, setUser, profilePicture, setProfilePicture}}>
      <Routes>
        <Route path="/" element={<MyHRLayout></MyHRLayout>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="/landing" element={<RequireAuthentication><Landing></Landing></RequireAuthentication>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/changePassword" element={<RequireAuthentication><ChangePassword></ChangePassword></RequireAuthentication>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path="/userProfile" element={<RequireAuthentication><UserProfile></UserProfile></RequireAuthentication>}></Route>
          <Route path="/editEmployeeDetails/:username" element={<RequireAuthentication><ViewEmployeeDetails></ViewEmployeeDetails></RequireAuthentication>}></Route>
          <Route path="/deleteEmployee/:username" element={<RequireAuthentication><DeleteEmployee></DeleteEmployee></RequireAuthentication>}></Route>
          {/* <Route path="/test" element={<Test></Test>}></Route> */}
          
          
          <Route path="*" element={<Logout></Logout>}></Route>
        </Route>
      </Routes>
    </userContext.Provider>
  );
}