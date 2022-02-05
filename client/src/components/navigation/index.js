import "./navigation.css"
import {Link, useNavigate} from "react-router-dom";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";



const Navigation = ({token, setToken}) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchQuery = new FormData(e.target).get("serviceName");
        navigate(`/services/show?search=${searchQuery}`)
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        setToken(null)
    }

    const handleAppRedirect = async ()=>{
        const token = JSON.parse(sessionStorage.getItem("token"))

        const res = await fetch("http://localhost:5000/userType",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await res.json();

        if(res.ok){
            if (data.userType === "buyer"){
                navigate("/appointments/buyer")
            } else if (data.userType === "seller"){
                navigate("/appointments/seller")
            }
            console.log(data)
        } else {
            toast.error("an error occurred, try again")
        }
    }

    return (
        <header className="header">
            <div>
                <h1 className="nav-logo">
                    <Link to="/">
                        bookingApp
                    </Link>
                </h1>
            </div>

            <div className="search">
                <form onChange={handleSubmit}>
                    <input type="text" placeholder="search for a service" name="search"/>
                </form>
            </div>

            <nav className="navbar">
                <ul className="nav-items">

                    <li>
                        <Link to="/services/show">
                            services
                        </Link>
                    </li>
                    {token === null ? (
                        <li style={{width:"100px"}}>
                            <Link to="/login">
                                Login <FaSignInAlt />
                            </Link>
                        </li>
                    ) : (<>
                            <li className="nav-item" onClick={handleAppRedirect}>
                                Appointments
                            </li>
                            <li onClick={handleLogout} style={{width:"75px"}}>
                                <Link to="/login">
                                    Logout <FaSignOutAlt/>
                                </Link>
                            </li>
                        </>
                    )
                    }
                </ul>
            </nav>
            <ToastContainer />
        </header>
    )
}

export default Navigation;