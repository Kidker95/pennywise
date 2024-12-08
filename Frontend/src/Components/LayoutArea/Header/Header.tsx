// import { NavLink } from "react-router-dom";
// import "./Header.css";

// export function Header(): JSX.Element {
//     return (
//         <div className="Header">
//             <NavLink to="/home"><h1>Pennywise</h1></NavLink> 
//         </div>
//     );
// }


import { NavLink } from "react-router-dom";
import "./Header.css";
import pennywiseIcon from "../../../Assets/Images/pennywise-icon.png";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink to="/home" className="logo-link">
                <div className="logo-container">
                    <img src={pennywiseIcon} alt="Pennywise Logo" className="logo-image" />
                    <h1>Pennywise</h1>
                </div>
            </NavLink>
        </div>
    );
}