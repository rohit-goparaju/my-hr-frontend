import { useState } from "react";
import ResetPassword from "./ResetPassword";

export default function SecurityQuestion({securityQuestion , securityAnswer, username}){

    const [givenAnswer, setGivenAnswer] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(false);

    function handleChange(event){
        const {value} = event.target;
        setGivenAnswer(value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(securityAnswer === givenAnswer.trim()){
            setWrongAnswer(false);
            setCorrectAnswer(true);
        }else{
            setWrongAnswer(true);
            setCorrectAnswer(false);
        }
    }

    if(correctAnswer){
        return (
            <ResetPassword username={username} securityAnswer={givenAnswer}></ResetPassword>
        );
    }
    else{
        return (
            <div className="d-flex justify-content-center align-items-center h-75">
                <form onSubmit={handleSubmit} className={`d-flex flex-column shadow rounded-4 border border-dark border-1 w-50 p-5 m-5 gap-3`}>
                    <label className="form-label">
                        {securityQuestion}{securityQuestion.endsWith("?")?"":"?"}
                        <input className="form-control" type="text" value={givenAnswer||""} onChange={handleChange} required></input>
                    </label>
                    {wrongAnswer && <span className="text-danger">Wrong answer.</span>}
                    <input className="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    }

}