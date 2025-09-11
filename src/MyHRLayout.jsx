import { Outlet } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";

export default function MyHRLayout(){
    return (
        <div className="d-flex flex-column align-items-stretch justify-content-center w-100 h-100">
            <div className="flex-shrink-0">
                <MyHeader></MyHeader>
            </div>
            <div className="flex-grow-1 overflow-auto">
                <Outlet></Outlet>
            </div>
            <div className="flex-shrink-0">
                <MyFooter></MyFooter>
            </div>
        </div>
    );
}