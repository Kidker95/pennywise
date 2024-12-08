// import Button from "@mui/material/Button/Button";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ExpenseModel } from "../../../Models/ExpenseModel";
// import { AppState, store } from "../../../Redux/Store";
// import { notify } from "../../../Utils/Notify";
// import CircleChart from "../../ChartsArea/CircleChart/CircleChart";
// import { Selector } from "../../ExpensesArea/Selector/Selector";
// import "./PersonalPage.css";
// import { Statistics } from "../../ExpensesArea/Statistics/Statistics";
// import { AddPartner } from "../../UserArea/AddPartner/AddPartner";
// import { PendingRequests } from "../../UserArea/PendingRequest/PendingRequest";

// export function PersonalPage(): JSX.Element {
//     const expenses = useSelector((state: AppState) => state.expense); // Get expenses from Redux store
//     const userId = useSelector((state: AppState) => state.user.id); // Get user ID from Redux store
//     const [filteredExpenses, setFilteredExpenses] = useState<ExpenseModel[]>(expenses);
//     const selectorRef = useRef<any>(null); // Ref for the Selector component
//     const navigate = useNavigate();

//     const updateFilteredExpenses = (filteredData: ExpenseModel[]) => {
//         setFilteredExpenses(filteredData);
//     };

//     const addNewExpensePath = () => navigate("/add-expense");
//     const addNewBudgetPath = () => navigate("/add-budget");
//     const viewExpensesPath = () => navigate("/expenses");
//     const budgetManagerPath = () => navigate("/budgets");

//     useEffect(() => {
//         setFilteredExpenses(expenses); // Set initial expenses state
//     }, [expenses]);

//     useEffect(() => {
//         if (!store.getState().user) {
//             notify.error("you are not logged in!")
//             sessionStorage.setItem("targetUrl", "/personal")
//             navigate("/login");
//             return;
//         }
//     }, [])

//     return (
//         <div className="PersonalPage">
//             {/* Left Column */}
//             <div className="leftColumn">
//                 <div className="selector">
//                     <Selector onFilterChange={updateFilteredExpenses} ref={selectorRef} />
//                 </div>
//                 <div className="buttonsGrid">
//                     <Button variant="contained" onClick={addNewExpensePath}>Add New Expense</Button>
//                     <Button variant="contained" onClick={viewExpensesPath}>View Expenses</Button>
//                     <Button variant="contained" onClick={addNewBudgetPath}>Add New Budget</Button>
//                     <Button variant="contained" onClick={budgetManagerPath}>View Budgets</Button>
//                 </div>
//             </div>
    
//             {/* Right Column */}
//             <div className="rightColumn">
//                 <div className="circleChart">
//                     <CircleChart expenses={filteredExpenses} userId={userId} />
//                 </div>
//                 <div className="statistics">
//                 <Statistics />

//                 <PendingRequests/>

//                 </div>
//             </div>
//         </div>
//     );    
// }


import { LineChart, Plus, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { AppState, store } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";
import CircleChart from "../../ChartsArea/CircleChart/CircleChart";
import { Selector } from "../../ExpensesArea/Selector/Selector";
import { Statistics } from "../../ExpensesArea/Statistics/Statistics";
import { PendingRequests } from "../../UserArea/PendingRequest/PendingRequest";
import "./PersonalPage.css";

interface ActionButtonProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    primary?: boolean;
}

const ActionButton = ({ icon: Icon, label, onClick, primary = true }: ActionButtonProps) => (
    <button 
        onClick={onClick} 
        className={`action-button ${primary ? 'primary' : 'secondary'}`}
    >
        <div className="action-content">
            <div className="icon-wrapper">
                <Icon className="action-icon" />
            </div>
            <span className="action-label">{label}</span>
        </div>
    </button>
);

export function PersonalPage(): JSX.Element {
    const expenses = useSelector((state: AppState) => state.expense);
    const userId = useSelector((state: AppState) => state.user.id);
    const [filteredExpenses, setFilteredExpenses] = useState<ExpenseModel[]>(expenses);
    const selectorRef = useRef<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.getState().user) {
            notify.error("You are not logged in!");
            sessionStorage.setItem("targetUrl", "/personal");
            navigate("/login");
        }
        setFilteredExpenses(expenses);
    }, [expenses]);

    return (
        <div className="personal-page">
            <div className="dashboard-grid">
                <div className="card actions-section">
                    <h2 className="card-title">Quick Actions</h2>
                    <div className="actions-wrapper">
                        <div className="actions-group">
                            <ActionButton 
                                icon={Plus}
                                label="Add Expense"
                                onClick={() => navigate("/add-expense")}
                            />
                            <ActionButton 
                                icon={LineChart}
                                label="View History"
                                onClick={() => navigate("/expenses")}
                                primary={false}
                            />
                        </div>
                        <div className="actions-group">
                            <ActionButton 
                                icon={Plus}
                                label="Add Budget"
                                onClick={() => navigate("/add-budget")}
                            />
                            <ActionButton 
                                icon={Wallet}
                                label="View Budgets"
                                onClick={() => navigate("/budgets")}
                                primary={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="card filter-section">
                    <h2 className="card-title">Filters</h2>
                    <Selector onFilterChange={setFilteredExpenses} ref={selectorRef} />
                </div>

                <div className="card stats-section">
                    <Statistics />
                    <PendingRequests />
                </div>

                <div className="card chart-section">
                    <h2 className="card-title">Expense Overview</h2>
                    <CircleChart expenses={filteredExpenses} userId={userId} />
                </div>
            </div>
        </div>
    );
}