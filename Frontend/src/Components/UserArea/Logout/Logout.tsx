// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";
// import "./Logout.css";

// export function Logout(): JSX.Element {
//     const navigate = useNavigate();
//     const logoutUser = async (): Promise<void> => {
//         const confirmed = await notify.confirm("Are You sure you want to logout?");
//         if (confirmed) {
//             userService.logout();
//             notify.success("Goodbye 🤡");
//             navigate("/home");
//         }
//     }
//     return (
//         <div className="Logout">
//             <Button variant="contained" onClick={logoutUser}>Log out</Button>
//         </div>
//     );
// }

import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import pennywiseIcon from "../../../Assets/Images/pennywise-icon.png";
import "./Logout.css";

export function Logout(): JSX.Element {
    const navigate = useNavigate();
    
    const logoutUser = async (): Promise<void> => {
        const confirmed = await notify.confirm("Are you sure you want to logout?");
        if (confirmed) {
            userService.logout();
            notify.success("See you soon! 🎪");
            navigate("/home");
        }
    }
    
    return (
        <div className="Logout">
            <button className="logout-button" onClick={logoutUser}>
                <img src={pennywiseIcon} className="logout-icon" alt="Pennywise" />
                <span className="logout-text">Sign Out</span>
            </button>
        </div>
    );
}