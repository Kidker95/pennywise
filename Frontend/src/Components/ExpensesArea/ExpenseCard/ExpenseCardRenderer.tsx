// import { Box, Button, Grid, Typography } from "@mui/material";
// import dayjs from "dayjs";
// import { ExpenseModel } from "../../../Models/ExpenseModel";

// class ExpenseCardRenderer {
//     public renderYears(years: string[], setSelectedYear: (year: number) => void) {
//         return (
//             <Grid container spacing={2}>
//                 {years.map(year => (
//                     <Grid item xs={12} sm={6} md={3} key={year}>
//                         <Button fullWidth variant="outlined" onClick={() => setSelectedYear(Number(year))}>
//                             {year}
//                         </Button>
//                     </Grid>
//                 ))}
//             </Grid>
//         );
//     }

//     public renderMonths(
//         monthsWithExpenses: number[],
//         setSelectedMonth: (month: number) => void,
//         handleBack: () => void
//     ) {
//         return (
//             <>
//                 <Grid container spacing={2}>
//                     {monthsWithExpenses.map(month => (
//                         <Grid item xs={12} sm={6} md={3} key={month}>
//                             <Button fullWidth variant="outlined" onClick={() => setSelectedMonth(month)}>
//                                 {dayjs().month(month - 1).format("MMMM")}
//                             </Button>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
//                     Back
//                 </Button>
//             </>
//         );
//     }

//     public renderWeeks(
//         weeksWithExpenses: number[],
//         setSelectedWeek: (week: number) => void,
//         handleBack: () => void
//     ) {
//         return (
//             <>
//                 <Grid container spacing={2}>
//                     {weeksWithExpenses.map(week => (
//                         <Grid item xs={12} sm={6} md={3} key={week}>
//                             <Button fullWidth variant="outlined" onClick={() => setSelectedWeek(week)}>
//                                 Week {week}
//                             </Button>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
//                     Back
//                 </Button>
//             </>
//         );
//     }

//     public renderDays(
//         daysWithExpenses: dayjs.Dayjs[],
//         setSelectedDay: (day: number) => void,
//         handleBack: () => void
//     ) {
//         return (
//             <>
//                 <Grid container spacing={2}>
//                     {daysWithExpenses.map(day => (
//                         <Grid item xs={12} sm={6} md={3} key={day.date()}>
//                             <Button fullWidth variant="outlined" onClick={() => setSelectedDay(day.date())}>
//                                 {day.format("dddd, MMMM D")}
//                             </Button>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
//                     Back
//                 </Button>
//             </>
//         );
//     }

//     public renderExpensesForDay(
//         expensesForDay: ExpenseModel[],
//         handleDeleteExpense: (id: number) => void,
//         handleEditExpense: (expense: ExpenseModel) => void,
//         handleBack: () => void
//     ) {
//         return (
//             <Box>
//                 <Typography variant="h6" gutterBottom>Expenses for Selected Day</Typography>
//                 {expensesForDay.length === 0 ? (
//                     <Typography>No expenses found for this day.</Typography>
//                 ) : (
//                     <Box className="expense-card-container">
//                         {expensesForDay.map(expense => (
//                             <Box key={expense.id} className="expense-card">
//                                 <Typography variant="h6">Amount: {expense.amount}</Typography>
//                                 <Typography variant="body2">Category: {expense.expenseName}</Typography>
//                                 <Typography variant="body2">Description: {expense.description}</Typography>
//                                 <Typography variant="body2">Date and time: {dayjs(expense.dateTime).format("YYYY-MM-DD HH:mm:ss")}</Typography>
//                                 <Box mt={1}>
//                                     <Button variant="contained" color="error" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
//                                     <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={() => handleEditExpense(expense)}>Edit</Button>
//                                 </Box>
//                             </Box>
//                         ))}
//                     </Box>
//                 )}
//                 <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
//             </Box>
//         );
//     }
// }

// export default ExpenseCardRenderer;



import { Dayjs } from "dayjs";
import { ExpenseModel } from "../../../Models/ExpenseModel";

interface ExtendedExpenseModel extends Omit<ExpenseModel, 'dateTime'> {
    dateTime: Dayjs;
    userName: string;
}

class ExpenseCardRenderer {
    public renderYears(years: string[], setSelectedYear: (year: number) => void) {
        return (
            <div className="time-navigation">
                <h2 className="section-title">Select Year</h2>
                <div className="time-grid">
                    {years.map(year => (
                        <button
                            key={year}
                            className="time-button"
                            onClick={() => setSelectedYear(Number(year))}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    public renderMonths(
        monthsWithExpenses: number[],
        setSelectedMonth: (month: number) => void,
        handleBack: () => void
    ) {
        return (
            <div className="time-navigation">
                <div className="nav-header">
                    <h2 className="section-title">Select Month</h2>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="time-grid">
                    {monthsWithExpenses.map(month => (
                        <button
                            key={month}
                            className="time-button"
                            onClick={() => setSelectedMonth(month)}
                        >
                            {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    public renderWeeks(
        weeksWithExpenses: number[],
        setSelectedWeek: (week: number) => void,
        handleBack: () => void
    ) {
        return (
            <div className="time-navigation">
                <div className="nav-header">
                    <h2 className="section-title">Select Week</h2>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="time-grid">
                    {weeksWithExpenses.map(week => (
                        <button
                            key={week}
                            className="time-button"
                            onClick={() => setSelectedWeek(week)}
                        >
                            Week {week}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    public renderDays(
        daysWithExpenses: Dayjs[],
        setSelectedDay: (day: number) => void,
        handleBack: () => void
    ) {
        return (
            <div className="time-navigation">
                <div className="nav-header">
                    <h2 className="section-title">Select Day</h2>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="time-grid">
                    {daysWithExpenses.map(day => (
                        <button
                            key={day.valueOf()}
                            className="time-button"
                            onClick={() => setSelectedDay(day.date())}
                        >
                            {day.format("dddd, MMMM D")}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    public renderExpensesForDay(
        expensesForDay: ExtendedExpenseModel[],
        handleDeleteExpense: (id: number) => void,
        handleEditExpense: (expense: ExpenseModel) => void,
        handleBack: () => void
    ) {
        return (
            <div className="time-navigation">
                <div className="nav-header">
                    <h2 className="section-title">Daily Expenses</h2>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                
                {expensesForDay.length === 0 ? (
                    <div className="empty-state">No expenses found for this day</div>
                ) : (
                    <div className="expense-card-container">
                        {expensesForDay.map(expense => (
                            <div key={expense.id} className="expense-card">
                                <div className="card-header">
                                    <span className="amount">${expense.amount}</span>
                                    <span className="category">{expense.expenseName}</span>
                                </div>
                                
                                <div className="card-content">
                                    <div className="info-row">
                                        <span className="label">Time:</span>
                                        <span className="value">
                                            {expense.dateTime.format("HH:mm")}
                                        </span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">User:</span>
                                        <span className="value">{expense.userName}</span>
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
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default ExpenseCardRenderer;