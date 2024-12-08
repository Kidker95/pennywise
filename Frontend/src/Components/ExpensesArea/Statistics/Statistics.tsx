// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { ExpenseModel } from "../../../Models/ExpenseModel";
// import { expenseService } from "../../../Services/ExpenseService";
// import { notify } from "../../../Utils/Notify";
// import { userService } from "../../../Services/UserService"; // Import the user service
// import "./Statistics.css";

// export function Statistics(): JSX.Element {
//     const [userExpenses, setUserExpenses] = useState<ExpenseModel[]>([]);
//     const [partnerExpenses, setPartnerExpenses] = useState<ExpenseModel[]>([]);
//     const [highestUserExpense, setHighestUserExpense] = useState<ExpenseModel | null>(null);
//     const [lowestUserExpense, setLowestUserExpense] = useState<ExpenseModel | null>(null);
//     const [highestPartnerExpense, setHighestPartnerExpense] = useState<ExpenseModel | null>(null);
//     const [lowestPartnerExpense, setLowestPartnerExpense] = useState<ExpenseModel | null>(null);
//     const [partnerId, setPartnerId] = useState<number | null>(null); // Add partnerId state

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 // Retrieve userId and partnerId using UserService methods
//                 const userId = userService.getUserIdFromToken();
//                 const retrievedPartnerId = userService.getPartnerId();
//                 setPartnerId(retrievedPartnerId); // Set partnerId state

//                 if (!userId) {
//                     notify.error("User ID not found.");
//                     return;
//                 }

//                 // Fetch all expenses
//                 const allExpenses = await expenseService.getAllExpenses();
//                 const now = dayjs();

//                 // Filter expenses for the current month by user ID and partner ID
//                 const thisMonthUserExpenses = allExpenses.filter(expense => {
//                     const expenseDate = dayjs(expense.dateTime);
//                     return (
//                         expense.userId === userId &&
//                         expenseDate.year() === now.year() &&
//                         expenseDate.month() === now.month()
//                     );
//                 });

//                 const thisMonthPartnerExpenses = retrievedPartnerId
//                     ? allExpenses.filter(expense => {
//                         const expenseDate = dayjs(expense.dateTime);
//                         return (
//                             expense.userId === retrievedPartnerId &&
//                             expenseDate.year() === now.year() &&
//                             expenseDate.month() === now.month()
//                         );
//                     })
//                     : [];

//                 setUserExpenses(thisMonthUserExpenses);
//                 setPartnerExpenses(thisMonthPartnerExpenses);

//                 // Calculate highest and lowest for user
//                 if (thisMonthUserExpenses.length > 0) {
//                     const sortedUserExpenses = [...thisMonthUserExpenses].sort((a, b) => a.amount - b.amount);
//                     setLowestUserExpense(sortedUserExpenses[0]);
//                     setHighestUserExpense(sortedUserExpenses[sortedUserExpenses.length - 1]);
//                 } else {
//                     setLowestUserExpense(null);
//                     setHighestUserExpense(null);
//                 }

//                 // Calculate highest and lowest for partner
//                 if (thisMonthPartnerExpenses.length > 0) {
//                     const sortedPartnerExpenses = [...thisMonthPartnerExpenses].sort((a, b) => a.amount - b.amount);
//                     setLowestPartnerExpense(sortedPartnerExpenses[0]);
//                     setHighestPartnerExpense(sortedPartnerExpenses[sortedPartnerExpenses.length - 1]);
//                 } else {
//                     setLowestPartnerExpense(null);
//                     setHighestPartnerExpense(null);
//                 }
//             } catch (err) {
//                 notify.error(err);
//             }
//         };

//         fetchExpenses();
//     }, []); 

//     return (
//         <div className="Statistics">

//             {(!highestUserExpense && !lowestUserExpense && !highestPartnerExpense && !lowestPartnerExpense) ? (
//                 <p className="no-expenses">No expenses found for this month.</p>
//             ) : (
//                 <div className="stat-cards">
//                     {/* User's Highest and Lowest Expense Cards */}
//                     {highestUserExpense && (
//                         <div className="stat-card">
//                             <h3>Your Highest Expense</h3>
//                             <p><span>Amount:</span> {highestUserExpense.amount}</p>
//                             <p><span>Date:</span> {dayjs(highestUserExpense.dateTime).format("YYYY-MM-DD HH:mm")}</p>
//                             <p><span>Category:</span> {highestUserExpense.expenseName}</p>
//                             <p><span>Description:</span> {highestUserExpense.description}</p>
//                         </div>
//                     )}

//                     {lowestUserExpense && (
//                         <div className="stat-card">
//                             <h3>Your Lowest Expense</h3>
//                             <p><span>Amount:</span> {lowestUserExpense.amount}</p>
//                             <p><span>Date:</span> {dayjs(lowestUserExpense.dateTime).format("YYYY-MM-DD HH:mm")}</p>
//                             <p><span>Category:</span> {lowestUserExpense.expenseName}</p>
//                             <p><span>Description:</span> {lowestUserExpense.description}</p>
//                         </div>
//                     )}

//                     {/* Partner's Highest and Lowest Expense Cards */}
//                     {partnerId && highestPartnerExpense && (
//                         <div className="stat-card">
//                             <h3>Partner's Highest Expense</h3>
//                             <p><span>Amount:</span> {highestPartnerExpense.amount}</p>
//                             <p><span>Date:</span> {dayjs(highestPartnerExpense.dateTime).format("YYYY-MM-DD HH:mm")}</p>
//                             <p><span>Category:</span> {highestPartnerExpense.expenseName}</p>
//                             <p><span>Description:</span> {highestPartnerExpense.description}</p>
//                         </div>
//                     )}

//                     {partnerId && lowestPartnerExpense && (
//                         <div className="stat-card">
//                             <h3>Partner's Lowest Expense</h3>
//                             <p><span>Amount:</span> {lowestPartnerExpense.amount}</p>
//                             <p><span>Date:</span> {dayjs(lowestPartnerExpense.dateTime).format("YYYY-MM-DD HH:mm")}</p>
//                             <p><span>Category:</span> {lowestPartnerExpense.expenseName}</p>
//                             <p><span>Description:</span> {lowestPartnerExpense.description}</p>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }



import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { expenseService } from "../../../Services/ExpenseService";
import { userService } from "../../../Services/UserService";
import "./Statistics.css";
import { notify } from "../../../Utils/Notify";

export function Statistics(): JSX.Element {
    const [userExpenses, setUserExpenses] = useState<ExpenseModel[]>([]);
    const [partnerExpenses, setPartnerExpenses] = useState<ExpenseModel[]>([]);
    const [highestUserExpense, setHighestUserExpense] = useState<ExpenseModel | null>(null);
    const [lowestUserExpense, setLowestUserExpense] = useState<ExpenseModel | null>(null);
    const [highestPartnerExpense, setHighestPartnerExpense] = useState<ExpenseModel | null>(null);
    const [lowestPartnerExpense, setLowestPartnerExpense] = useState<ExpenseModel | null>(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                // Retrieve userId and partnerId using UserService methods
                const userId = userService.getUserIdFromToken();
                const retrievedPartnerId = userService.getPartnerId();

                if (!userId) {
                    notify.error("User ID not found.");
                    return;
                }

                // Fetch all expenses
                const allExpenses = await expenseService.getAllExpenses();
                const now = dayjs();

                // Filter expenses for the current month by user ID and partner ID
                const thisMonthUserExpenses = allExpenses.filter(expense => {
                    const expenseDate = dayjs(expense.dateTime);
                    return (
                        expense.userId === userId &&
                        expenseDate.year() === now.year() &&
                        expenseDate.month() === now.month()
                    );
                });

                const thisMonthPartnerExpenses = retrievedPartnerId
                    ? allExpenses.filter(expense => {
                        const expenseDate = dayjs(expense.dateTime);
                        return (
                            expense.userId === retrievedPartnerId &&
                            expenseDate.year() === now.year() &&
                            expenseDate.month() === now.month()
                        );
                    })
                    : [];

                setUserExpenses(thisMonthUserExpenses);
                setPartnerExpenses(thisMonthPartnerExpenses);

                // Calculate highest and lowest for user
                if (thisMonthUserExpenses.length > 0) {
                    const sortedUserExpenses = [...thisMonthUserExpenses].sort((a, b) => a.amount - b.amount);
                    setLowestUserExpense(sortedUserExpenses[0]);
                    setHighestUserExpense(sortedUserExpenses[sortedUserExpenses.length - 1]);
                } else {
                    setLowestUserExpense(null);
                    setHighestUserExpense(null);
                }

                // Calculate highest and lowest for partner
                if (thisMonthPartnerExpenses.length > 0) {
                    const sortedPartnerExpenses = [...thisMonthPartnerExpenses].sort((a, b) => a.amount - b.amount);
                    setLowestPartnerExpense(sortedPartnerExpenses[0]);
                    setHighestPartnerExpense(sortedPartnerExpenses[sortedPartnerExpenses.length - 1]);
                } else {
                    setLowestPartnerExpense(null);
                    setHighestPartnerExpense(null);
                }
            } catch (err) {
                notify.error(err);
            }
        };

        fetchExpenses();
    }, []);

    const StatCard = ({ title, expense }: { title: string, expense: ExpenseModel | null }) => {
        if (!expense) return null;
        return (
            <div className="stat-card">
                <h3>{title}</h3>
                <div className="stat-details">
                    <div className="stat-row">
                        <span className="stat-label">Amount:</span>
                        <span className="stat-value">${expense.amount}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Category:</span>
                        <span className="stat-value">{expense.expenseName}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Date:</span>
                        <span className="stat-value">{dayjs(expense.dateTime).format("MMM D")}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="statistics">
            <h2 className="stats-title">Monthly Statistics</h2>
            <div className="stats-grid">
                <StatCard title="Highest Expense" expense={highestUserExpense} />
                <StatCard title="Lowest Expense" expense={lowestUserExpense} />
                {highestPartnerExpense && (
                    <StatCard title="Partner's Highest" expense={highestPartnerExpense} />
                )}
                {lowestPartnerExpense && (
                    <StatCard title="Partner's Lowest" expense={lowestPartnerExpense} />
                )}
            </div>
        </div>
    );
}