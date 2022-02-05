import "./login.css"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = ({setToken}) => {
    const navigate =useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/user/login", {
            method: "POST", headers: {
                "Content-Type": "application/json",

            }, body: JSON.stringify({
                username, password
            })
        })

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem("token", JSON.stringify(data.token));
            setToken(data.token);
            if(data.userType == "61fabec95c4040a732c3e70c"){
                navigate("/appointments/buyer")
            } else{
                navigate("/appointments/seller")
            }
        } else {
            const data = await res.json();
            console.log("error message: " + data.message)
        }
    }

    return (<div className="login-component">
        <h2>Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <p>Welcome to BookingApp, please log in to proceed</p>
            <label htmlFor="username">username</label>
            <input type="text" className="inp-primary" placeholder={"enter username"}
                   onChange={event => setUsername(event.target.value)}/>
            <label htmlFor="password">password</label>
            <input type="password" className="inp-primary" placeholder={"enter password"}
                   onChange={event => setPassword(event.target.value)}/>
            <input type="submit" className="btn-submit" value={"Login"}/>

            <span>
                Don't have an account? <Link to="/register">Register</Link>
            </span>
        </form>
    </div>)
}


export default Login;