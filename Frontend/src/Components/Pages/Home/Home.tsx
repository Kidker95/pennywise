// import "./Home.css";
// import homePagePic from "../../../Assets/Images/homePagePic.jpeg"

// export function Home(): JSX.Element {
//     return (
//         <div className="Home">
//             <h3>don't be a clown with your money</h3>
//             <div className="side-by-side">
//                 <img src={homePagePic} alt="HomePage" />
//                 <p>The <strong>Pennywise</strong> platform is a comprehensive financial tracking and budgeting tool designed to help users gain better control over their personal expenses. Users can track their spending by logging detailed expenses, setting up monthly or custom budgets, and viewing insightful statistics that highlight their spending patterns. For users who share finances with a partner, Pennywise allows account integration, enabling each partner to see both individual and joint spending. The site provides a clean, user-friendly interface with interactive charts, spending breakdowns, and customizable notifications, making it easier to manage personal and shared finances with transparency and clarity.</p>
//             </div>
//         </div>
//     );
// }


import "./Home.css";
import homePagePic from "../../../Assets/Images/homePagePic.jpeg";
import { useNavigate } from "react-router-dom";

export function Home(): JSX.Element {

    const navigate = useNavigate();
    
    return (
        <div className="Home">
            <div className="hero-section">
                <h1 className="main-title">
                    Don't be a clown with your money
                    <span className="title-emoji">🎪</span>
                </h1>
                <div className="subtitle">Smart financial tracking for you and your partner</div>
            </div>

            <div className="content-section">
                <div className="image-container">
                    <img src={homePagePic} alt="Financial Management" className="feature-image" />
                    <div className="image-overlay">
                        <div className="stat-card">
                            <span className="stat-number">30%</span>
                            <span className="stat-text">Average Savings</span>
                        </div>
                    </div>
                </div>

                <div className="text-content">
                    <h2>Take Control of Your Finances</h2>
                    
                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-icon">📊</div>
                            <div className="feature-text">
                                <h3>Comprehensive Tracking</h3>
                                <p>Monitor your expenses with detailed insights and spending patterns</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">👥</div>
                            <div className="feature-text">
                                <h3>Partner Integration</h3>
                                <p>Share finances seamlessly with your partner for better transparency</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">📱</div>
                            <div className="feature-text">
                                <h3>User-Friendly Interface</h3>
                                <p>Interactive charts and customizable notifications at your fingertips</p>
                            </div>
                        </div>
                    </div>

                    <div className="cta-section">
                        <button className="cta-button" onClick={() => navigate("/login")}>Get Started Today</button>
                        <span className="cta-text">Join thousands of smart savers</span>
                    </div>
                </div>
            </div>
        </div>
    );
}