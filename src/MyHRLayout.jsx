import { Outlet } from "react-router-dom";

export default function MyHRLayout(){
    return (
        <div className="d-flex flex-column align-items-stretch justify-content-center w-100 h-100">
            <header>This is header</header>
            <div className="flex-grow-1">
            <Outlet></Outlet>
            </div>
            <footer>This is footer</footer>
        </div>
    );
}