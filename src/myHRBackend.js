import axios from 'axios';


const myHRBackend = axios.create(
    {
        baseURL: "http://localhost:8080/myHRBackend"
    }
);


myHRBackend.interceptors.request.use(
    (config)=>{
        const jwt = localStorage.getItem("jwt");
        if(jwt){
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
);


myHRBackend.interceptors.response.use(
    (response)=>response,
    (error)=>{

        if(error.response?.status === 401){
            console.log("Unauthorized! Redirecting to login");
            window.location.href = "http://localhost:5173/myHR/logout";
        }
        if(error.response?.status === 403){
            console.log("forbidden! Redirecting to login");
            window.location.href = "http://localhost:5173/myHR/logout";
        }

        console.error(error);
        return Promise.reject(error);
    }
)


export default myHRBackend;