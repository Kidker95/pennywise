// import { Box, Button, Typography } from "@mui/material";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CategoryModel } from "../../../Models/CategoryModel";
// import { ExpenseModel } from "../../../Models/ExpenseModel";
// import { expenseService } from "../../../Services/ExpenseService";
// import { notify } from "../../../Utils/Notify";
// import "./ExpenseCard.css";
// import { UserModel } from "../../../Models/UserModel";
// import { userService } from "../../../Services/UserService";
// import ExpenseCardRenderer from "./ExpenseCardRenderer"; // Import the renderer

// const ExpenseCard = () => {
//     const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
//     const [users, setUsers] = useState<UserModel[]>([]);
//     const [recentExpenses, setRecentExpenses] = useState<ExpenseModel[]>([]);
//     const [showRecentExpenses, setShowRecentExpenses] = useState(true);
//     const [selectedYear, setSelectedYear] = useState<number | null>(null);
//     const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
//     const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
//     const [selectedDay, setSelectedDay] = useState<number | null>(null);
//     const [categories, setCategories] = useState<CategoryModel[]>([]);
//     const [loadingCategories, setLoadingCategories] = useState(true);
//     const navigate = useNavigate();

//     const renderer = new ExpenseCardRenderer(); // Instantiate the renderer

//     // Fetch users
//     const getAllUsers = async () => {
//         try {
//             const allUsers = await userService.getAllUsers();
//             setUsers(allUsers);
//         } catch (err: any) {
//             console.error("Problem fetching users", err);
//             notify.error("Something went wrong...");
//         }
//     };


//    // Fetch expenses and add user names
// const getAllExpenses = async () => {
//     try {
//         const allExpenses = await expenseService.getAllExpenses();

//         // Map expenses to include userName
//         const parsedExpenses = allExpenses.map(expense => {
//             const user = users.find(user => user.id === expense.userId);
//             return {
//                 ...expense,
//                 dateTime: dayjs(expense.dateTime),
//                 userName: user ? user.firstName : "Unknown" // Assign user's first name or "Unknown" if not found
//             };
//         });

//         setExpenses(parsedExpenses);

//         // Sort and set recent expenses
//         const sortedExpenses = parsedExpenses.sort((a, b) => b.dateTime.valueOf() - a.dateTime.valueOf());
//         setRecentExpenses(sortedExpenses.slice(0, 10));
//     } catch (err: any) {
//         console.error("Error fetching expenses:", err);
//     }
// };

//     // Fetch categories
//     const getAllCategories = async () => {
//         setLoadingCategories(true);
//         try {
//             const categories = await expenseService.getCategories();
//             setCategories(categories);
//         } catch (err) {
//             notify.error(err);
//         } finally {
//             setLoadingCategories(false);
//         }
//     };

//     useEffect(() => {
//         getAllUsers();
//         getAllCategories();
//     }, []);

//     useEffect(() => {
//         if (users.length > 0) getAllExpenses();
//     }, [users]);


//     // Back navigation handler
//     const handleBack = () => {
//         if (selectedDay !== null) {
//             setSelectedDay(null);
//         } else if (selectedWeek !== null) {
//             setSelectedWeek(null);
//         } else if (selectedMonth !== null) {
//             setSelectedMonth(null);
//         } else if (selectedYear !== null) {
//             setSelectedYear(null);
//         } else {
//             setShowRecentExpenses(true);
//         }
//     };

//     // Delete expense handler
//     const handleDeleteExpense = async (id: number) => {
//         try {
//             const confirmed = await notify.confirm("Are you sure you want to delete the expense?");
//             if (confirmed) {
//                 await expenseService.deleteExpenses(id);
//                 // Update the expenses list by removing the deleted expense
//                 setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
//                 notify.success("Expense has been deleted!");
//                 navigate("/personal")
//             }
//         } catch (err: any) {
//             console.error("Error deleting expense:", err);
//         }
//     };

//     // Edit expense handler
//     const handleEditExpense = (expense: ExpenseModel) => {
//         navigate("/expenses/" + expense?.id);
//         window.location.reload();
//     };

//     // Group expenses by year
//     const expensesByYear = () => {
//         return expenses.reduce((acc, expense) => {
//             const year = dayjs(expense.dateTime).year();
//             if (!acc[year]) acc[year] = [];
//             acc[year].push(expense);
//             return acc;
//         }, {} as { [key: number]: ExpenseModel[] });
//     };

//    // Render recent expenses
// const renderRecentExpenses = () => (
//     <Box>
//         <Typography variant="h6" gutterBottom>Recent Expenses</Typography>
//         {recentExpenses.length === 0 ? (
//             <Typography>No recent expenses found.</Typography>
//         ) : (
//             <Box className="expense-card-container">
//                 {recentExpenses.map(expense => (
//                     <Box key={expense.id} className="expense-card">
//                         <Typography variant="h6">Amount: {expense.amount}</Typography>
//                         <Typography variant="body2">Category: {expense.expenseName}</Typography>
//                         <Typography variant="body2">User: {(expense as Record<string, any>).userName ?? "Unknown"}</Typography> {/* Use dynamic property */}
//                         <Typography variant="body2">Description: {expense.description}</Typography>
//                         <Typography variant="body2">Date and time: {dayjs(expense.dateTime).format("YYYY-MM-DD HH:mm:ss")}</Typography>
//                         <Box mt={1}>
//                             <Button variant="contained" color="error" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
//                             <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={() => handleEditExpense(expense)}>Edit</Button>
//                         </Box>
//                     </Box>
//                 ))}
//             </Box>
//         )}
//         <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowRecentExpenses(false)}>
//             View Expenses by Years
//         </Button>
//     </Box>
// );


//     // Generate the JSX based on current state
//     return (
//         <Box>
//             <Typography variant="h4">ExpenseCard</Typography>
//             <Button variant="contained" color="secondary" onClick={() => navigate("/personal")}>Back to Personal Page</Button>
//             {showRecentExpenses ? (
//                 renderRecentExpenses()
//             ) : selectedYear === null ? (
//                 renderer.renderYears(Object.keys(expensesByYear()), setSelectedYear) // Use renderer for years
//             ) : selectedMonth === null ? (
//                 renderer.renderMonths(
//                     [...Array(12).keys()].map(month => month + 1).filter(month => expenses.some(expense => dayjs(expense.dateTime).year() === selectedYear && dayjs(expense.dateTime).month() === (month - 1))),
//                     setSelectedMonth,
//                     handleBack
//                 ) // Use renderer for months
//             ) : selectedWeek === null ? (
//                 renderer.renderWeeks(
//                     [1, 2, 3, 4].filter(week => {
//                         const startOfMonth = dayjs().year(selectedYear!).month(selectedMonth! - 1).startOf("month");
//                         const daysInMonth = startOfMonth.daysInMonth();
//                         let startDay = 0;
//                         let endDay = 0;
//                         switch (week) {
//                             case 1: startDay = 1; endDay = Math.min(7, daysInMonth); break;
//                             case 2: startDay = 8; endDay = Math.min(14, daysInMonth); break;
//                             case 3: startDay = 15; endDay = Math.min(21, daysInMonth); break;
//                             case 4: startDay = 22; endDay = daysInMonth; break;
//                         }
//                         return expenses.some(expense => {
//                             const expenseDate = dayjs(expense.dateTime);
//                             return expenseDate.year() === selectedYear && expenseDate.month() === (selectedMonth! - 1) && expenseDate.date() >= startDay && expenseDate.date() <= endDay;
//                         });
//                     }),
//                     setSelectedWeek,
//                     handleBack
//                 ) // Use renderer for weeks
//             ) : selectedDay === null ? (
//                 renderer.renderDays(
//                     (() => {
//                         const startOfMonth = dayjs().year(selectedYear!).month(selectedMonth! - 1).startOf("month");
//                         const daysInMonth = startOfMonth.daysInMonth();
//                         let startDay = 0;
//                         let endDay = 0;
//                         switch (selectedWeek) {
//                             case 1: startDay = 1; endDay = Math.min(7, daysInMonth); break;
//                             case 2: startDay = 8; endDay = Math.min(14, daysInMonth); break;
//                             case 3: startDay = 15; endDay = Math.min(21, daysInMonth); break;
//                             case 4: startDay = 22; endDay = daysInMonth; break;
//                         }
//                         const daysWithExpenses = [];
//                         for (let day = startDay; day <= endDay; day++) {
//                             const currentDate = dayjs().year(selectedYear!).month(selectedMonth! - 1).date(day);
//                             if (expenses.some(expense => dayjs(expense.dateTime).isSame(currentDate, 'day'))) {
//                                 daysWithExpenses.push(currentDate);
//                             }
//                         }
//                         return daysWithExpenses;
//                     })(),
//                     setSelectedDay,
//                     handleBack
//                 ) // Use renderer for days
//             ) : (
//                 renderer.renderExpensesForDay(
//                     expenses.filter(expense => {
//                         const expenseDate = dayjs(expense.dateTime);
//                         return expenseDate.date() === selectedDay && expenseDate.month() === (selectedMonth! - 1) && expenseDate.year() === selectedYear;
//                     }),
//                     handleDeleteExpense,
//                     handleEditExpense,
//                     handleBack
//                 ) // Use renderer for expenses of the day
//             )}
//         </Box>
//     );
// };

// export default ExpenseCard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { UserModel } from "../../../Models/UserModel";
import { expenseService } from "../../../Services/ExpenseService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs type
import "./ExpenseCard.css";
import ExpenseCardRenderer from "./ExpenseCardRenderer";

// Extended ExpenseModel with additional properties
interface ExtendedExpenseModel extends Omit<ExpenseModel, 'dateTime'> {
    dateTime: Dayjs;
    userName: string;
}

const ExpenseCard = () => {
    const [expenses, setExpenses] = useState<ExtendedExpenseModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [recentExpenses, setRecentExpenses] = useState<ExtendedExpenseModel[]>([]);
    const [showRecentExpenses, setShowRecentExpenses] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const navigate = useNavigate();

    const renderer = new ExpenseCardRenderer();

    useEffect(() => {
        getAllUsers();
        getAllCategories();
    }, []);

    useEffect(() => {
        if (users.length > 0) getAllExpenses();
    }, [users]);

    const getAllUsers = async () => {
        try {
            const allUsers = await userService.getAllUsers();
            setUsers(allUsers);
        } catch (err: any) {
            notify.error("Error fetching users");
        }
    };

    const getAllExpenses = async () => {
        try {
            const allExpenses = await expenseService.getAllExpenses();
            const parsedExpenses: ExtendedExpenseModel[] = allExpenses.map(expense => ({
                ...expense,
                dateTime: dayjs(expense.dateTime),
                userName: users.find(user => user.id === expense.userId)?.firstName || "Unknown"
            }));

            setExpenses(parsedExpenses);
            const sortedExpenses = [...parsedExpenses].sort((a, b) =>
                b.dateTime.valueOf() - a.dateTime.valueOf()
            );
            setRecentExpenses(sortedExpenses.slice(0, 10));
        } catch (err: any) {
            notify.error("Error fetching expenses");
        }
    };

    const getAllCategories = async () => {
        try {
            const categories = await expenseService.getCategories();
            setCategories(categories);
        } catch (err) {
            notify.error(err);
        }
    };

    const handleBack = () => {
        if (selectedDay !== null) setSelectedDay(null);
        else if (selectedWeek !== null) setSelectedWeek(null);
        else if (selectedMonth !== null) setSelectedMonth(null);
        else if (selectedYear !== null) setSelectedYear(null);
        else setShowRecentExpenses(true);
    };

    const handleDeleteExpense = async (id: number) => {
        try {
            const confirmed = await notify.confirm("Are you sure you want to delete this expense?");
            if (confirmed) {
                await expenseService.deleteExpenses(id);
                setExpenses(prev => prev.filter(e => e.id !== id));
                notify.success("Expense deleted successfully");
                navigate("/personal");
            }
        } catch (err: any) {
            notify.error("Error deleting expense");
        }
    };

    const handleEditExpense = (expense: ExpenseModel) => {
        navigate(`/expenses/${expense.id}`);
    };

    const expensesByYear = () => {
        return expenses.reduce((acc: { [key: number]: ExtendedExpenseModel[] }, expense) => {
            const year = expense.dateTime.year();
            if (!acc[year]) acc[year] = [];
            acc[year].push(expense);
            return acc;
        }, {});
    };

    return (
        <div className="Expense">
            <div className="container">
                <div className="header">
                    <h1>Expense Manager</h1>
                    <button className="back-button" onClick={() => navigate("/personal")}>
                        Back to Dashboard
                    </button>
                </div>

                <div className="content">
                    {showRecentExpenses ? (
                        <div className="recent-expenses">
                            <div className="section-header">
                                <h2>Recent Expenses</h2>
                                <button className="view-all" onClick={() => setShowRecentExpenses(false)}>
                                    View All Expenses
                                </button>
                            </div>

                            <div className="expense-card-container">
                                {recentExpenses.length === 0 ? (
                                    <div className="no-expenses">No recent expenses found</div>
                                ) : (
                                    recentExpenses.map(expense => (
                                        <div key={expense.id} className="expense-card">
                                            <div className="card-header">
                                                <span className="amount">${expense.amount}</span>
                                                <span className="category">{expense.expenseName}</span>
                                            </div>

                                            <div className="card-content">
                                                <div className="info-row">
                                                    <span className="label">User:</span>
                                                    <span className="value">{expense.userName}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="label">Date:</span>
                                                    <span className="value">
                                                        {expense.dateTime.format("MMMM D, YYYY")}
                                                    </span>
                                                </div>
                                                {expense.description && (
                                                    <div className="info-row">
                                                        <span className="label">Description:</span>
                                                        <span className="value">{expense.description}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="card-actions">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEditExpense(expense)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteExpense(expense.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="expense-navigation">
                            {selectedYear === null ? (
                                renderer.renderYears(
                                    Object.keys(expensesByYear()),
                                    setSelectedYear
                                )
                            ) : selectedMonth === null ? (
                                renderer.renderMonths(
                                    [...Array(12)].map((_, i) => i + 1)
                                        .filter(month => expenses.some(expense =>
                                            expense.dateTime.year() === selectedYear &&
                                            expense.dateTime.month() === (month - 1)
                                        )),
                                    setSelectedMonth,
                                    handleBack
                                )
                            ) : selectedWeek === null ? (
                                renderer.renderWeeks(
                                    [1, 2, 3, 4].filter(week => {
                                        const startOfMonth = dayjs().year(selectedYear).month(selectedMonth - 1).startOf("month");
                                        const daysInMonth = startOfMonth.daysInMonth();
                                        let startDay = 1;
                                        let endDay = 7;

                                        switch (week) {
                                            case 2: startDay = 8; endDay = 14; break;
                                            case 3: startDay = 15; endDay = 21; break;
                                            case 4: startDay = 22; endDay = daysInMonth; break;
                                        }

                                        return expenses.some(expense => {
                                            const expenseDate = expense.dateTime;
                                            return expenseDate.year() === selectedYear &&
                                                expenseDate.month() === (selectedMonth - 1) &&
                                                expenseDate.date() >= startDay &&
                                                expenseDate.date() <= endDay;
                                        });
                                    }),
                                    setSelectedWeek,
                                    handleBack
                                )
                            ) : selectedDay === null ? (
                                renderer.renderDays(
                                    (() => {
                                        const startOfMonth = dayjs().year(selectedYear).month(selectedMonth! - 1);
                                        const weekStart = (selectedWeek! - 1) * 7 + 1;
                                        const weekEnd = Math.min(weekStart + 6, startOfMonth.daysInMonth());

                                        return expenses
                                            .filter(expense => {
                                                const expenseDate = expense.dateTime;
                                                return expenseDate.year() === selectedYear &&
                                                    expenseDate.month() === (selectedMonth! - 1) &&
                                                    expenseDate.date() >= weekStart &&
                                                    expenseDate.date() <= weekEnd;
                                            })
                                            .map(expense => expense.dateTime);
                                    })(),
                                    setSelectedDay,
                                    handleBack
                                )
                            ) : (
                                renderer.renderExpensesForDay(
                                    expenses.filter(expense => {
                                        const expenseDate = expense.dateTime;
                                        return expenseDate.date() === selectedDay &&
                                            expenseDate.month() === (selectedMonth! - 1) &&
                                            expenseDate.year() === selectedYear;
                                    }),
                                    handleDeleteExpense,
                                    handleEditExpense,
                                    handleBack
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;