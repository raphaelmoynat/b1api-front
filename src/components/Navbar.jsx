import {Link, useNavigate} from "react-router-dom";
import {useContext} from 'react'
import {AuthContext} from "../context/AuthContext.jsx";

function Navbar() {
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a href="" className="navbar-brand">CarApp</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Cars
                                </Link>
                            </li>

                            {currentUser ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cars/create">
                                            Add car
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;