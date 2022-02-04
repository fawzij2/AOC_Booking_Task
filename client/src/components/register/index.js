import "./register.css"
import { useState} from "react";
import {useNavigate} from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [userType, setUserType] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault();

      const res = await fetch("http://localhost:5000/user/register",{
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username,
              password,
              email,
              age: parseInt(age),
              userType
          })
      });

      const data = await res.json();

      if(res.ok){
          if (userType === "seller") {
              navigate("/services/create", {replace: true, state: data.user._id})
          }else{
              console.log("buyer")
          }
      }else {
          console.log(data.message)
      }
    }

    return (
        <div className="register-component">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" className="inp-primary" placeholder={"enter username"} onChange={event => setUsername(event.target.value)}/>
                <label htmlFor="password">password</label>
                <input type="password" className="inp-primary" placeholder={"enter password"} onChange={event => setPassword(event.target.value)}/>
                <label htmlFor="email">email</label>
                <input type="text" className="inp-primary" placeholder={"enter your email"} onChange={event => setEmail(event.target.value)}/>
                <label htmlFor="age">age</label>
                <input type="text" className="inp-primary" placeholder={"enter your age"} onChange={event => setAge(event.target.value)}/>
                <label htmlFor="user-Type">User Type</label>
                <select name="user-Type" id="user-Type" className="sel-primary" onChange={event => setUserType(event.target.value)}>
                    <option value="">select a user type</option>
                    <option value="buyer">buyer</option>
                    <option value="seller">seller</option>
                </select>
                <input type="submit" className="btn-submit" value={"Login"}/>
            </form>
        </div>
    )
}

export default Register;