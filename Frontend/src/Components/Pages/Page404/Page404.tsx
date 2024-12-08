import "./Page404.css";
import image404 from "../../../Assets/Images/404.jpeg";

export function Page404(): JSX.Element {
    return (
        <div className="Page404">
            
            <img src={image404} alt="404" /><br/><br></br>
            <a href="/home">Back Home</a>
        </div>
    );
}
