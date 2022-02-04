import "./login.css"
import {useState} from "react";
import {Link} from "react-router-dom";

const Login = ({setToken, setName}) => {
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
            console.log(data)
            sessionStorage.setItem("token", JSON.stringify(data.token));
            setToken(data.token);
            setName(data.username)
        } else {
            const data = await res.json();
            console.log("error message: " + data.message)
        }
    }

    return (<div className="login-component">
        <h2>Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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