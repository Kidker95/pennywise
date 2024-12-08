// import { useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { UserModel } from "../../../Models/UserModel";
// import { AppState } from "../../../Redux/Store";
// import { Logout } from "../../UserArea/Logout/Logout";
// import Button from "@mui/material/Button";
// import "./Menu.css";

// export function Menu(): JSX.Element {
//     const user = useSelector<AppState, UserModel>(state => state.user);
//     const navigate = useNavigate();

//     return (
//         <div className="Menu">
//             {/* If no user is logged in */}
//             {!user && (
//                 <div>
//                     <span>Hello Guest</span>
//                     <NavLink to="/login">Login</NavLink>
//                     <NavLink to="/register">Register</NavLink>
//                 </div>
//             )}
            
//             {/* If user is logged in */}
//             {user && (
//                 <div>
//                     <span>Hello </span>
//                     <NavLink to={"/personal"}>{user.firstName} {user.lastName}</NavLink>
//                     <Logout />
//                 </div>
//             )}

//             {/* Show 'Add Partner' button only if the user has no partner */}
//             {user && !user.partnerId && (
//                 <Button onClick={() => navigate("add-partner")} variant="contained" color="primary">Add Partner</Button>
//             )}

//             <NavLink to="/home">Home</NavLink>
//             <NavLink to="/about">About</NavLink>
//         </div>
//     );
// }


import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { Logout } from "../../UserArea/Logout/Logout";
import Button from "@mui/material/Button";
import "./Menu.css";

export function Menu(): JSX.Element {
    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();

    return (
        <div className="Menu">
            <div className="nav-links">
                <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
                    Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                    About
                </NavLink>
            </div>

            <div className="user-section">
                {!user && (
                    <div className="auth-buttons">
                        <NavLink to="/login" className="auth-link">
                            Sign In
                        </NavLink>
                        <Button variant="contained" onClick={() => navigate("/register")} className="register-button">
                            Get Started
                        </Button>
                    </div>
                )}

                {user && (
                    <div className="user-menu">
                        {!user.partnerId && (
                            <Button onClick={() => navigate("add-partner")} variant="outlined" className="add-partner-button">
                                Add Partner
                            </Button>
                        )}
                        
                        <div className="user-info">
                            <NavLink to="/personal" className="user-profile">
                                <div className="avatar">
                                    {user.firstName.charAt(0)}
                                </div>
                                <span>{user.firstName} {user.lastName}</span>
                            </NavLink>
                            <Logout />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}