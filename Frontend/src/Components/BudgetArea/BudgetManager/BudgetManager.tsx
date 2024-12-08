// import { Box, Button, Card, CardContent, CardActions, Typography } from "@mui/material";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BudgetModel, RenderedBudget } from "../../../Models/BudgetModel";
// import { budgetService } from "../../../Services/BudgetService";
// import { expenseService } from "../../../Services/ExpenseService";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";
// import { UserModel } from "../../../Models/UserModel";

// export function BudgetManager(): JSX.Element {
//     const [budgets, setBudgets] = useState<BudgetModel[]>([]);
//     const [users, setUsers] = useState<UserModel[]>([]);
//     const [expensesMap, setExpensesMap] = useState<{ [key: number]: RenderedBudget }>({});
//     const [showInactiveBudgets, setShowInactiveBudgets] = useState(true); // State to control inactive budgets visibility
//     const navigate = useNavigate();

//     useEffect(() => {
//         getAllUsers();
//         loadBudgets();
//     }, []);

//     const getAllUsers = async () => {
//         try {
//             const allUsers = await userService.getAllUsers();
//             setUsers(allUsers);
//         } catch (err: any) {
//             console.error("Problem fetching users", err);
//             notify.error("Something went wrong...");
//         }
//     };


//     async function loadBudgets() {
//         try {
//             const budgets = await budgetService.getAllBudgets();
//             const allUsers = await userService.getAllUsers();

//             const usersMap = allUsers.reduce((acc, user) => {
//                 acc[user.id] = user.firstName;
//                 return acc;
//             }, {} as { [key: number]: string });

//             // Determine if each budget is active
//             const updatedBudgets = budgets.map(budget => ({
//                 ...budget,
//                 isActive: new Date(budget.endDate) >= new Date() // Check if end date is in the future
//             }));

//             setBudgets(updatedBudgets);

//             const expensesMap: { [key: number]: RenderedBudget } = {};
//             for (const budget of updatedBudgets) {
//                 const expenses = await getExpensesInRange(budget.startDate, budget.endDate, budget.userId);
//                 const moneySpent = expenses.reduce((sum: number, expense) => sum + Number(expense.amount), 0);
//                 const moneyLeft = budget.amount - moneySpent;
//                 const percentageUsed = budget.amount > 0 ? (moneySpent / budget.amount) * 100 : 0;

//                 expensesMap[budget.id] = { 
//                     moneySpent, 
//                     moneyLeft, 
//                     percentageUsed, 
//                     userName: usersMap[budget.userId] || "Unknown" 
//                 };
//             }
//             setExpensesMap(expensesMap);
//         } catch (err) {
//             notify.error("Failed to load budgets or expenses");
//         }
//     }

//     async function getExpensesInRange(startDate: string | Date, endDate: string | Date, userId: number) {
//         const start = dayjs.isDayjs(startDate) ? startDate.toDate() : new Date(startDate);
//         const end = dayjs.isDayjs(endDate) ? endDate.toDate() : new Date(endDate);
//         const expenses = await expenseService.getAllExpenses();

//         return expenses.filter(expense => {
//             const expenseDate = dayjs.isDayjs(expense.dateTime) ? expense.dateTime.toDate() : new Date(expense.dateTime);
//             return expenseDate >= start && expenseDate <= end && expense.userId === userId;
//         });
//     }

//     function handleEdit(budgetId: number) {
//         navigate(`/budgets/${budgetId}`);
//     }

//     async function handleDelete(budgetId: number) {
//         try {
//             const confirmed = await notify.confirm("Are you sure you want to delete this budget?");
//             if (confirmed) {
//                 await budgetService.deleteBudget(budgetId);
//                 setBudgets(budgets.filter(b => b.id !== budgetId));
//                 notify.success("Budget Deleted.");
//             }
//         } catch (err) {
//             notify.error("Failed to delete budget");
//         }
//     }

//     // Toggle function for showing or hiding inactive budgets
//     const toggleShowInactiveBudgets = () => {
//         setShowInactiveBudgets(!showInactiveBudgets);
//     };

//     // Filter budgets based on showInactiveBudgets state
//     const displayedBudgets = showInactiveBudgets ? budgets : budgets.filter(budget => budget.isActive);

//     return (
//         <Box sx={{ padding: 4 }}>
//             <Typography variant="h4" gutterBottom>Manage Budgets</Typography>
//             <Button 
//                 variant="contained" 
//                 color="primary" 
//                 onClick={() => navigate("/add-budget")} 
//                 sx={{ marginBottom: 3 }}
//             >
//                 Add New Budget
//             </Button>
//             <Button 
//                 variant="contained" 
//                 color="secondary" 
//                 onClick={toggleShowInactiveBudgets} 
//                 sx={{ marginBottom: 3, marginLeft: 2 }}
//             >
//                 {showInactiveBudgets ? "Hide Inactive Budgets" : "Show Inactive Budgets"}
//             </Button>
//             <Box 
//                 display="flex" 
//                 flexWrap="wrap" 
//                 gap={4} 
//                 justifyContent="center" 
//                 alignItems="center"
//             >
//                 {displayedBudgets.map(budget => (
//                     <Card 
//                         key={budget.id} 
//                         sx={{
//                             width: 300, 
//                             padding: 2, 
//                             borderRadius: 2, 
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
//                             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                             backgroundColor: budget.isActive ? "white" : "#f5f5f5", // Gray background for inactive budgets
//                             opacity: budget.isActive ? 1 : 0.7, // Slight opacity change for inactive budgets
//                             "&:hover": {
//                                 transform: "translateY(-10px)",
//                                 boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//                             },
//                         }}
//                     >
//                         <CardContent>
//                             <Typography variant="h6" gutterBottom>{budget.name}</Typography>
//                             <Typography variant="body2" color={budget.isActive ? "green" : "red"}>
//                                 {budget.isActive ? "Active" : "Inactive"}
//                             </Typography>
//                             <Typography>User: {expensesMap[budget.id]?.userName || "Unknown"}</Typography>
//                             <Typography>Total Budget: {budget.amount}</Typography>
//                             <Typography>Spent: {Number(expensesMap[budget.id]?.moneySpent || 0).toFixed(2)}</Typography>
//                             <Typography>Date Range: {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}</Typography>
//                             <Typography>Remaining: {Number(expensesMap[budget.id]?.moneyLeft || 0).toFixed(2)}</Typography>
//                             <Typography>Percentage Used: {Number(expensesMap[budget.id]?.percentageUsed || 0).toFixed(2)}%</Typography>
//                         </CardContent>
//                         <CardActions>
//                             <Button variant="contained" color="primary" onClick={() => handleEdit(budget.id)} fullWidth>Edit</Button>
//                             <Button variant="contained" color="secondary" onClick={() => handleDelete(budget.id)} fullWidth sx={{ marginLeft: 1 }}>Delete</Button>
//                         </CardActions>
//                     </Card>
//                 ))}
//             </Box>
//         </Box>
//     );
// }

// export default BudgetManager;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BudgetModel, RenderedBudget } from "../../../Models/BudgetModel";
import { UserModel } from "../../../Models/UserModel";
import { budgetService } from "../../../Services/BudgetService";
import { expenseService } from "../../../Services/ExpenseService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import dayjs from "dayjs";
import "./BudgetManager.css";

export function BudgetManager(): JSX.Element {
    const [budgets, setBudgets] = useState<BudgetModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [expensesMap, setExpensesMap] = useState<{ [key: number]: RenderedBudget }>({});
    const [showInactiveBudgets, setShowInactiveBudgets] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
        loadBudgets();
    }, []);

    const getAllUsers = async () => {
        try {
            const allUsers = await userService.getAllUsers();
            setUsers(allUsers);
        } catch (err: any) {
            notify.error("Error fetching users");
        }
    };

    async function loadBudgets() {
        try {
            const budgets = await budgetService.getAllBudgets();
            const allUsers = await userService.getAllUsers();

            const usersMap = allUsers.reduce((acc, user) => {
                acc[user.id] = user.firstName;
                return acc;
            }, {} as { [key: number]: string });

            const updatedBudgets = budgets.map(budget => ({
                ...budget,
                isActive: new Date(budget.endDate) >= new Date()
            }));

            setBudgets(updatedBudgets);

            const expensesMap: { [key: number]: RenderedBudget } = {};
            for (const budget of updatedBudgets) {
                const expenses = await getExpensesInRange(budget.startDate, budget.endDate, budget.userId);
                const moneySpent = expenses.reduce((sum: number, expense) => sum + Number(expense.amount), 0);
                const moneyLeft = budget.amount - moneySpent;
                const percentageUsed = budget.amount > 0 ? (moneySpent / budget.amount) * 100 : 0;

                expensesMap[budget.id] = {
                    moneySpent,
                    moneyLeft,
                    percentageUsed,
                    userName: usersMap[budget.userId] || "Unknown"
                };
            }
            setExpensesMap(expensesMap);
        } catch (err) {
            notify.error("Failed to load budgets");
        }
    }

    async function getExpensesInRange(startDate: string | Date, endDate: string | Date, userId: number) {
        const start = dayjs.isDayjs(startDate) ? startDate.toDate() : new Date(startDate);
        const end = dayjs.isDayjs(endDate) ? endDate.toDate() : new Date(endDate);
        const expenses = await expenseService.getAllExpenses();

        return expenses.filter(expense => {
            const expenseDate = dayjs.isDayjs(expense.dateTime) ? expense.dateTime.toDate() : new Date(expense.dateTime);
            return expenseDate >= start && expenseDate <= end && expense.userId === userId;
        });
    }

    const handleEdit = (budgetId: number) => {
        navigate(`/budgets/${budgetId}`);
    };

    const handleDelete = async (budgetId: number) => {
        try {
            const confirmed = await notify.confirm("Are you sure you want to delete this budget?");
            if (confirmed) {
                await budgetService.deleteBudget(budgetId);
                setBudgets(prev => prev.filter(b => b.id !== budgetId));
                notify.success("Budget deleted successfully");
            }
        } catch (err) {
            notify.error("Failed to delete budget");
        }
    };

    const displayedBudgets = showInactiveBudgets ? budgets : budgets.filter(budget => budget.isActive);

    return (
        <div className="budget-manager">
            <div className="container">
                <div className="header">
                    <h1>Budget Manager</h1>
                    <div className="header-actions">
                        <button 
                            className="primary-button"
                            onClick={() => navigate("/add-budget")}
                        >
                            Add New Budget
                        </button>
                        <button 
                            className="secondary-button"
                            onClick={() => setShowInactiveBudgets(!showInactiveBudgets)}
                        >
                            {showInactiveBudgets ? "Hide Inactive" : "Show All"}
                        </button>
                    </div>
                </div>

                <div className="budget-grid">
                    {displayedBudgets.map(budget => (
                        <div 
                            key={budget.id} 
                            className={`budget-card ${!budget.isActive ? 'inactive' : ''}`}
                        >
                            <div className="budget-header">
                                <h3>{budget.name}</h3>
                                <span className={`status ${budget.isActive ? 'active' : 'inactive'}`}>
                                    {budget.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="budget-details">
                                <div className="detail-row">
                                    <span className="label">User</span>
                                    <span className="value">{expensesMap[budget.id]?.userName}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Total Budget</span>
                                    <span className="value">${budget.amount}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Spent</span>
                                    <span className="value">
                                        ${Number(expensesMap[budget.id]?.moneySpent || 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Remaining</span>
                                    <span className="value">
                                        ${Number(expensesMap[budget.id]?.moneyLeft || 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Progress</span>
                                    <span className="value">
                                        {Number(expensesMap[budget.id]?.percentageUsed || 0).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Period</span>
                                    <span className="value">
                                        {dayjs(budget.startDate).format("MMM D")} - {dayjs(budget.endDate).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>

                            <div className="budget-progress">
                                <div 
                                    className="progress-bar"
                                    style={{
                                        width: `${Math.min(expensesMap[budget.id]?.percentageUsed || 0, 100)}%`
                                    }}
                                />
                            </div>

                            <div className="budget-actions">
                                <button 
                                    className="action-button"
                                    onClick={() => handleEdit(budget.id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="action-button delete"
                                    onClick={() => handleDelete(budget.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BudgetManager;