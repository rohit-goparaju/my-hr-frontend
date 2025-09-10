import { Route, Routes } from "react-router-dom";
import MyHRLayout from "./MyHRLayout";
import Test from "./Test";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<MyHRLayout></MyHRLayout>}>
        <Route index element={<Test></Test>}></Route>
      </Route>
    </Routes>
  );
}