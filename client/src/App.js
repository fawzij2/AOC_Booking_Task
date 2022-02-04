import './App.css';
import Login from "./components/login";
import Navigation from "./components/navigation";
import {Route, Routes} from "react-router-dom";
import Register from "./components/register";
import CreateService from "./components/createService";
import {useEffect, useState} from "react";


function App() {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");

    useEffect(()=>{
       setToken(JSON.stringify(sessionStorage.getItem("token")))
    },[])
    return (
        <div className="App">
            <Navigation token={token} name={name}/>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} setName={setName} />}/>
                <Route path="/register" element={<Register/>} />
                <Route path="/services/create" element={<CreateService/>} />
            </Routes>
        </div>
    );
}

export default App;
