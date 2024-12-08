// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
// import { Button, TextField, Box, Grid, Typography } from "@mui/material";
// import "./Selector.css"; 
// import { ExpenseModel } from "../../../Models/ExpenseModel";
// import { expenseService } from "../../../Services/ExpenseService";
// import { notify } from "../../../Utils/Notify";

// dayjs.extend(isBetween);

// type SelectorProps = {
//     onFilterChange: (filteredData: ExpenseModel[]) => void;
// };

// export const Selector = forwardRef(({ onFilterChange }: SelectorProps, ref) => {
//     const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
//     const [showCustomRange, setShowCustomRange] = useState(false);
//     const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });

//     const getAllExpenses = async () => {
//         try {
//             const allExpenses = await expenseService.getAllExpenses();
//             setExpenses(allExpenses);
//             return allExpenses;
//         } catch (err: any) {
//             notify.error("Error fetching expenses");
//             return [];
//         }
//     };

//     useEffect(() => {
//         getAllExpenses();
//     }, []);

//     const mapRecent = () => {
//         const sortedExpenses = [...expenses].sort((a, b) => dayjs(b.dateTime).diff(dayjs(a.dateTime)));
//         const recentExpenses = sortedExpenses.slice(0, 10);
//         onFilterChange(recentExpenses);
//     };

//     const mapDaily = () => {
//         const dailyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "day"));
//         onFilterChange(dailyExpenses);
//     };

//     const mapMonthly = () => {
//         const monthlyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "month"));
//         onFilterChange(monthlyExpenses);
//     };

//     const mapYearly = () => {
//         const yearlyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "year"));
//         onFilterChange(yearlyExpenses);
//     };

//     const handleCustomRange = () => {
//         const customExpenses = expenses.filter(expense =>
//             dayjs(expense.dateTime).isBetween(customRange.startDate, customRange.endDate, null, "[]")
//         );
//         onFilterChange(customExpenses);
//     };

//     useImperativeHandle(ref, () => ({
//         mapRecent,
//     }));

//     return (
//         <Box className="selector" 
//         sx={{
//             marginTop: 2,
//             width: "100%", // Make sure it takes full width in its container
//             maxWidth: 320, // Optional: limit max width
//             mx: "auto", // Center horizontally if it's smaller than its container
//             p: 3, // Padding for internal spacing
//             boxShadow: 3, // Subtle shadow for better appearance
//             borderRadius: 2, // Consistent rounded corners
//         }}
//    >
//     <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
//         Filter Expenses
//     </Typography>
//     <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12} sm={6}>
//             <Button fullWidth variant="contained" color="primary" onClick={mapRecent}>
//                 Recent
//             </Button>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <Button fullWidth variant="contained" color="primary" onClick={mapDaily}>
//                 Daily
//             </Button>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <Button fullWidth variant="contained" color="primary" onClick={mapMonthly}>
//                 Monthly
//             </Button>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <Button fullWidth variant="contained" color="primary" onClick={mapYearly}>
//                 Yearly
//             </Button>
//         </Grid>
//         <Grid item xs={12}>
//             <Button fullWidth variant="outlined" color="secondary" onClick={() => setShowCustomRange(!showCustomRange)}>
//                 Custom Range
//             </Button>
//         </Grid>
//     </Grid>

//     {showCustomRange && (
//         <Box className="custom-range" sx={{ marginTop: 2 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label="Start Date"
//                         type="date"
//                         value={customRange.startDate}
//                         InputLabelProps={{ shrink: true }}
//                         onChange={(e) => setCustomRange({ ...customRange, startDate: e.target.value })}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         fullWidth
//                         label="End Date"
//                         type="date"
//                         value={customRange.endDate}
//                         InputLabelProps={{ shrink: true }}
//                         onChange={(e) => setCustomRange({ ...customRange, endDate: e.target.value })}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button fullWidth variant="contained" color="primary" onClick={handleCustomRange}>
//                         Apply Custom Range
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Box>
//     )}
// </Box>
//     );
// });




import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { expenseService } from "../../../Services/ExpenseService";
import { notify } from "../../../Utils/Notify";
import "./Selector.css";


dayjs.extend(isBetween);

type SelectorProps = {
    onFilterChange: (filteredData: ExpenseModel[]) => void;
};

export const Selector = forwardRef(({ onFilterChange }: SelectorProps, ref) => {
    const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
    const [showCustomRange, setShowCustomRange] = useState(false);
    const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });
    const [activeFilter, setActiveFilter] = useState<string>('');

    const getAllExpenses = async () => {
        try {
            const allExpenses = await expenseService.getAllExpenses();
            setExpenses(allExpenses);
            return allExpenses;
        } catch (err: any) {
            notify.error("Error fetching expenses");
            return [];
        }
    };

    useEffect(() => {
        getAllExpenses();
    }, []);


    const handleFilterClick = (id: string, handler: () => void) => {
        setActiveFilter(id);
        handler();
    };

    const mapRecent = () => {
        const sortedExpenses = [...expenses].sort((a, b) => dayjs(b.dateTime).diff(dayjs(a.dateTime)));
        const recentExpenses = sortedExpenses.slice(0, 10);
        onFilterChange(recentExpenses);
    };

    const mapDaily = () => {
        const dailyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "day"));
        onFilterChange(dailyExpenses);
    };

    const mapMonthly = () => {
        const monthlyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "month"));
        onFilterChange(monthlyExpenses);
    };

    const mapYearly = () => {
        const yearlyExpenses = expenses.filter(expense => dayjs(expense.dateTime).isSame(dayjs(), "year"));
        onFilterChange(yearlyExpenses);
    };

    const handleCustomRange = () => {
        const customExpenses = expenses.filter(expense =>
            dayjs(expense.dateTime).isBetween(customRange.startDate, customRange.endDate, null, "[]")
        );
        onFilterChange(customExpenses);
    };

    useImperativeHandle(ref, () => ({
        mapRecent,
    }));

    const filterButtons = [
        { id: 'recent', label: 'Recent', handler: mapRecent },
        { id: 'daily', label: 'Daily', handler: mapDaily },
        { id: 'monthly', label: 'Monthly', handler: mapMonthly },
        { id: 'yearly', label: 'Yearly', handler: mapYearly }
    ];

    return (
        <div className="selector">
            <div className="filter-grid">
                {filterButtons.map(button => (
                    <button
                        key={button.id}
                        className={`filter-button ${activeFilter === button.id ? 'active' : ''}`}
                        onClick={() => handleFilterClick(button.id, button.handler)}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            <button
                className="custom-range-toggle"
                onClick={() => setShowCustomRange(!showCustomRange)}
            >
                Custom Range
            </button>

            {showCustomRange && (
                <div className="custom-range">
                    <div className="date-inputs">
                        <input
                            type="date"
                            value={customRange.startDate}
                            onChange={(e) => setCustomRange({ ...customRange, startDate: e.target.value })}
                            className="date-input"
                        />
                        <input
                            type="date"
                            value={customRange.endDate}
                            onChange={(e) => setCustomRange({ ...customRange, endDate: e.target.value })}
                            className="date-input"
                        />
                    </div>
                    <button
                        className="apply-button"
                        onClick={handleCustomRange}
                    >
                        Apply Range
                    </button>
                </div>
            )}
        </div>
    );
});