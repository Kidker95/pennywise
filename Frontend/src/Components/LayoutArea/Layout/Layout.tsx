// import { Footer } from "../Footer/Footer";
// import { Header } from "../Header/Header";
// import { Menu } from "../Menu/Menu";
// import { Routing } from "../Routing/Routing";
// import "./Layout.css";

// export function Layout(): JSX.Element {
//     return (
//         <div className="Layout">
//             <header><Header /></header>
//             <nav><Menu /></nav>
//             <main><Routing /></main>
//             <footer><Footer /></footer>
//         </div>
//     );
// }


import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className="top-bar">
                <div className="header-section">
                    <Header />
                </div>
                <nav className="menu-section">
                    <Menu />
                </nav>
            </div>
            <main><Routing /></main>
            <footer><Footer /></footer>
        </div>
    );
}