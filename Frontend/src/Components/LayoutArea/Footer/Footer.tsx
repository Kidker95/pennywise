// import "./Footer.css";

// export function Footer(): JSX.Element {

//     const year = new Date().getFullYear();

//     return (
//         <div className="Footer">
//             <p>Pennywise©️ | {year}</p>
//         </div>
//     );
// }


import "./Footer.css";
import pennywiseIcon from "../../../Assets/Images/pennywise-icon.png";

export function Footer(): JSX.Element {
    const year = new Date().getFullYear();

    return (
        <div className="Footer">
            <p>
                <img src={pennywiseIcon} className="footer-icon" alt="Pennywise" />
                Pennywise <span>|</span> © {year}
            </p>
        </div>
    );
}