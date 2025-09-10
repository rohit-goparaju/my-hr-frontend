import { Outlet } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";

export default function MyHRLayout(){
    return (
        <div className="d-flex flex-column align-items-stretch justify-content-center w-100 h-100">
            <MyHeader></MyHeader>
            <div className="flex-grow-1">
            <Outlet></Outlet>
            </div>
            <MyFooter></MyFooter>
        </div>
    );
}