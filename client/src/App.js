import './App.css';
import Login from "./components/login";
import Navigation from "./components/navigation";
import {Route, Routes} from "react-router-dom";
import Register from "./components/register";
import CreateService from "./components/createService";
import {useEffect, useState} from "react";
import ServicesShowcase from "./components/servicesShowcase";
import BuyerAppointments from "./components/Appointments/buyerAppointments";
import SellerAppointments from "./components/Appointments/sellerAppointments";
import AcceptedAppointments from "./components/Appointments/acceptedAppointments";
import HomeRedirector from "./components/homeRedirector";


function App() {
    const [token, setToken] = useState("");

    useEffect(()=>{
       setToken(JSON.parse(sessionStorage.getItem("token")))
    },[])
    return (
        <div className="App">
            <Navigation token={token} setToken={setToken}/>
            <Routes>
                <Route path={"/"} element={<HomeRedirector />}/>
                <Route path="/login" element={<Login setToken={setToken} />}/>
                <Route path="/register" element={<Register/>} />
                <Route path="/services/create" element={<CreateService/>} />
                <Route path={"/services/show"} element={<ServicesShowcase />} />
                <Route path={"appointments/buyer"} element={<BuyerAppointments />} />
                <Route path={"appointments/seller"} element={<SellerAppointments/>} />
                <Route path={"appointments/seller/accepted"} element={<AcceptedAppointments />} />
            </Routes>
        </div>
    );
}

export default App;
