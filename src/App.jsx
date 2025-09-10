import { Route, Routes } from "react-router-dom";
import MyHRLayout from "./MyHRLayout";
import Test from "./Test";
import LoginForm from "./LoginForm";
import FindAllUsers from "./FindAllUsers";
import Logout from "./logout";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<MyHRLayout></MyHRLayout>}>
        <Route index element={<LoginForm></LoginForm>}></Route>
        <Route path="/findAllUsers" element={<FindAllUsers></FindAllUsers>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
      </Route>
    </Routes>
  );
}