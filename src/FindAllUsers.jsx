import { useEffect, useState } from "react";
import myHRBackend from "./myHRBackend";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./App";

export default function FindAllUsers(){

    const [users, setUsers] = useState([]);
    const {user} = useUserContext();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const findAllUsers = async()=>{
        try{
            let path = null;
            switch(user.role){
                case "ADMIN": 
                    path = "/admin";
                    break;
                case "HR":
                    path = "/hr";
                    break;
                case "EMPLOYEE":
                    path = "/employee";
                    break;
            }
            const response = await myHRBackend.get(`${path}/findAllUsers?page=${page}&size=${size}`);

            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);

        }catch(error){
            console.error("Error: ", error);
        }
    }

    useEffect(
        ()=>{
            findAllUsers()
            // console.log("find users");
        },
        [page, size]
    );

    function handlePrevious(event){
        setPage(p=>p-1);
        // console.log("previous");
    }

    function handleNext(event){
        setPage(p=>p+1);
    }

    function handleSize(event){
        setSize(event.target.value);
    }

    function handlePageNumber(num){
        setPage(num);
    }

    function printPageNumbers(){
        const pageNumbers = [];
        for(let i = 0; i < totalPages ; i++){
            pageNumbers.push(<li key={i+1} className="page-item"><a className="page-link" href="#" onClick={()=>handlePageNumber(i)}>{i+1}</a></li>)
        }
        return pageNumbers;
    }

    return (
        <div>
            <h2>Employee List:</h2>
            <table className="table table-hover table-responsive">
                <thead className="table-dark">
                    <tr>
                        <th>
                            USERNAME
                        </th>
                        <th>
                            ROLE
                        </th>
                        {
                        user.role !== "EMPLOYEE" && 
                        <th>
                            ACTIONS
                        </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {users.map(
                        (myHRUser, index, users)=>
                        <tr key={myHRUser.username} className={`${myHRUser.username === user.username ? "table-success" : ""}`}>
                            <td>{myHRUser.username}</td>
                            <td>{myHRUser.role} {(myHRUser.role === "EMPLOYEE" && myHRUser.username === user.username) && <Link className="ms-2" to="/userProfile"><i className="bi bi-eye"></i></Link>}</td>
                            {
                               (user.role !== "EMPLOYEE" &&  myHRUser.username !== user.username) &&
                                <td className="d-flex gap-3">
                                    <a href="#" onClick={(e)=>{navigate(`/editEmployeeDetails/${myHRUser.username}`, {replace:true})}}><i className="bi bi-pencil-square"></i></a>
                                    <a href="#" onClick={(e)=>{navigate(`/deleteEmployee/${myHRUser.username}`, {replace:true})}}><i className="bi bi-trash"></i></a>
                                </td>
                            }
                            {
                                (user.role !== "EMPLOYEE" &&  myHRUser.username === user.username) && 
                                <td>
                                    <Link to="/userProfile"><i className="bi bi-eye"></i></Link>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>

            {/* pagination controls */}
            <div className="d-flex flex-column justify-content-center align-items-center mx-5">
                <ul className="pagination">
                    <li key={"prev"} className="page-item"><a className={`page-link ${page === 0 ? "disabled" : ""}`} href="#" onClick={handlePrevious}>previous</a></li>
                    {
                        printPageNumbers()
                    }
                    <li key={"next"} className="page-item"><a className={`page-link ${page===totalPages-1 ? "disabled" : ""}`} href="#" onClick={handleNext}>next</a></li>
                    <li key={"options"} className="page-item">
                        <select className="page-link" value={size} onChange={handleSize}>
                            <option vlaue={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={100}>100</option>
                        </select>
                    </li>
                </ul>
                <span> page {page+1} of {totalPages} </span>
            </div>

        </div>
    );


}