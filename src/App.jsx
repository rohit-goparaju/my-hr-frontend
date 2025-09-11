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

const userContext = createContext();

export function useUserContext(){
  return useContext(userContext);
}

export default function App(){

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState();

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
          <Route path="/test" element={<Test></Test>}></Route>
        </Route>
      </Routes>
    </userContext.Provider>
  );
}