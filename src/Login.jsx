import Welcome from "./Welcome";
import LoginForm from "./LoginForm";

export default function Login(){
    return (
        <div className="row g-0 w-100 h-100">
            <div className="col-sm-6 d-flex align-items-center justify-content-center">
                <Welcome></Welcome>
            </div>
            <div className="popOut col-sm-6 d-flex align-items-center justify-content-center">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
}