import "./navigation.css"
import {Link} from "react-router-dom";

const Navigation = ({token, name}) => {
    return (
        <nav className="navbar">
            <h1 className="nav-logo">bookingApp</h1>
            <ul className="nav-items">
                <li className="nav-item">
                    Home
                </li>
                <li className="nav-item">

                    reservations

                </li>
                <li>
                    services
                </li>
                {token === "null" ? (
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                ) : (
                    <li>
                        welcome {name}
                    </li>
                )
                }
            </ul>
        </nav>
    )
}

export default Navigation;