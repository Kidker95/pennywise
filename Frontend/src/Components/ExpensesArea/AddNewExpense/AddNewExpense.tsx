// import { Box, Button, Container, MenuItem, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { CategoryModel } from "../../../Models/CategoryModel";
// import { ExpenseModel } from "../../../Models/ExpenseModel";
// import { expenseService } from "../../../Services/ExpenseService";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";
// import "./AddNewExpense.css";

// export function AddNewExpense(): JSX.Element {
//     const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExpenseModel>();
//     const [categories, setCategories] = useState<CategoryModel[]>([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const categories = await expenseService.getCategories();
//                 setCategories(categories);
//             } catch (err) {
//                 notify.error("Failed to fetch categories");
//             }
//         };
//         fetchCategories();

//         // Set userId from token
//         const userId = userService.getUserIdFromToken();
//         if (userId) setValue("userId", userId);
//     }, [setValue]);

//     // Function to handle form submission
//     async function onSubmit(expense: ExpenseModel) {
//         const userId = userService.getUserIdFromToken();
//         try {
//             if (userId) expense.userId = userId;
//             if (!expense.dateTime) expense.dateTime = new Date().toISOString();
    
//             // Pass an inline function as the second argument for updating budgets
//             await expenseService.addExpense(expense);

//             notify.success("Expense added successfully");
//             navigate("/personal");
//             window.location.reload();
//         } catch (err: any) {
//             notify.error(err.response?.data?.message || "Error adding the expense");
//         }
//     }

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5 }}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <TextField
//                         label="Amount"
//                         type="number"
//                         fullWidth
//                         margin="normal"
//                         {...register("amount", {
//                             required: "Amount is required",
//                             min: { value: 0.01, message: "Amount must be greater than 0" }
//                         })}
//                         error={!!errors.amount}
//                         helperText={errors.amount?.message}
//                         inputProps={{ min: 0.01, step: 0.01 }}
//                     />

//                     <TextField
//                         select
//                         label="Expense Category"
//                         fullWidth
//                         margin="normal"
//                         {...register("expenseId", { required: "Expense category is required" })}
//                         error={!!errors.expenseId}
//                         helperText={errors.expenseId ? "Select an expense category" : ""}
//                     >
//                         <MenuItem disabled>Select Expense Category</MenuItem>
//                         {categories.map((category) => (
//                             <MenuItem key={category.id} value={category.id}>
//                                 {category.name}
//                             </MenuItem>
//                         ))}
//                     </TextField>

//                     <TextField
//                         label="Date"
//                         type="datetime-local"
//                         fullWidth
//                         margin="normal"
//                         {...register("dateTime", { required: "Date is required" })}
//                         InputLabelProps={{ shrink: true }}
//                         error={!!errors.dateTime}
//                         helperText={errors.dateTime?.message}
//                     />

//                     <TextField
//                         label="Description"
//                         type="text"
//                         fullWidth
//                         margin="normal"
//                         {...register("description", {
//                             maxLength: { value: 10000, message: "Maximum 10000 characters" }
//                         })}
//                         inputProps={{ maxLength: 10000 }}
//                         error={!!errors.description}
//                         helperText={errors.description?.message}
//                     />

//                     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
//                         Add
//                     </Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// }



import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { expenseService } from "../../../Services/ExpenseService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./AddNewExpense.css";

export function AddNewExpense(): JSX.Element {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExpenseModel>();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await expenseService.getCategories();
                setCategories(categories);
            } catch (err) {
                notify.error("Failed to fetch categories");
            }
        };
        fetchCategories();

        const userId = userService.getUserIdFromToken();
        if (userId) setValue("userId", userId);
    }, [setValue]);

    async function onSubmit(expense: ExpenseModel) {
        const userId = userService.getUserIdFromToken();
        try {
            if (userId) expense.userId = userId;
            if (!expense.dateTime) expense.dateTime = new Date().toISOString();
            
            await expenseService.addExpense(expense);
            notify.success("Expense added successfully");
            navigate("/personal");
        } catch (err: any) {
            notify.error(err.response?.data?.message || "Error adding the expense");
        }
    }

    return (
        <div className="AddExpense">
            <div className="expense-card">
                <div className="expense-header">
                    <h1>Add New Expense</h1>
                    <p className="subtitle">Track your spending</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="expense-form">
                    <div className="form-group">
                        <label>Amount</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                placeholder="Enter amount"
                                step="0.01"
                                min="0.01"
                                className={errors.amount ? "error" : ""}
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: { value: 0.01, message: "Amount must be greater than 0" }
                                })}
                            />
                            {errors.amount && <div className="error-icon">!</div>}
                        </div>
                        {errors.amount && 
                            <span className="error-message">{errors.amount.message}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <div className="input-wrapper">
                            <select
                                className={errors.expenseId ? "error" : ""}
                                {...register("expenseId", { 
                                    required: "Expense category is required" 
                                })}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.expenseId && <div className="error-icon">!</div>}
                        </div>
                        {errors.expenseId && 
                            <span className="error-message">Please select a category</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <div className="input-wrapper">
                            <input
                                type="datetime-local"
                                className={errors.dateTime ? "error" : ""}
                                {...register("dateTime", { 
                                    required: "Date is required" 
                                })}
                            />
                            {errors.dateTime && <div className="error-icon">!</div>}
                        </div>
                        {errors.dateTime && 
                            <span className="error-message">{errors.dateTime.message}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <div className="input-wrapper">
                            <textarea
                                placeholder="Add a description"
                                className={errors.description ? "error" : ""}
                                {...register("description", {
                                    maxLength: { 
                                        value: 10000, 
                                        message: "Description is too long" 
                                    }
                                })}
                            />
                            {errors.description && <div className="error-icon">!</div>}
                        </div>
                        {errors.description && 
                            <span className="error-message">{errors.description.message}</span>
                        }
                    </div>

                    <button type="submit" className="submit-button">
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}