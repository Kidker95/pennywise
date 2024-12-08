// import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { BudgetModel } from "../../../Models/BudgetModel";
// import { budgetService } from "../../../Services/BudgetService";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";

// export function AddNewBudget(): JSX.Element {
//     const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BudgetModel>();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userId = userService.getUserIdFromToken();
//         if (userId) setValue("userId", userId);
//     }, [setValue]);

//     const startDate = watch("startDate");

//     async function onSubmit(budget: BudgetModel) {
//         const userId = userService.getUserIdFromToken();
//         try {
//             if (userId) budget.userId = userId;
//             await budgetService.addBudgets(budget);
//             notify.success("Budget added successfully");
//             navigate("/personal");
//             const defaultBudget = JSON.parse(localStorage.getItem("defaultBudget") || "null");
//             if (defaultBudget && new Date(budget.startDate) >= new Date(defaultBudget.startDate) && new Date(budget.endDate) <= new Date(defaultBudget.endDate)) {
//                 // Update localStorage default budget if new budget impacts it
//                 const updatedMoneySpent = defaultBudget.moneySpent + budget.amount;
//                 const updatedPercentageUsed = (updatedMoneySpent / defaultBudget.moneyLeft) * 100;

//                 const updatedBudget = { ...defaultBudget, moneySpent: updatedMoneySpent, percentageUsed: updatedPercentageUsed };
//                 localStorage.setItem("defaultBudget", JSON.stringify(updatedBudget));
 
//             }
//         } catch (err: any) {
//             notify.error("Error adding the budget");
//         }
//     }

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Add New Budget
//                 </Typography>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <TextField required label="Budget Name" type="text" fullWidth margin="normal" {...register("name", {
//                         required: "Budget name is required",
//                         minLength: { value: 3, message: "Minimum 3 characters" },
//                         maxLength: { value: 1000, message: "Maximum 1000 characters" }
//                     })} error={!!errors.name} helperText={errors.name?.message} />
//                     <TextField label="Amount" type="number" fullWidth margin="normal" {...register("amount", { required: "Amount is required", min: 0.01 })} required inputProps={{ min: 0.01, step: 0.01 }} error={!!errors.amount} helperText={errors.amount?.message} />
//                     <TextField label="Start Date" type="date" fullWidth margin="normal" {...register("startDate", {
//                         required: "Start date is required",
//                         validate: {
//                             notPast: value => new Date(value) >= new Date(Date.now() - 24 * 60 * 60 * 1000) || "Start date cannot be in the past"
//                         }
//                     })} InputLabelProps={{ shrink: true }} required error={!!errors.startDate} helperText={errors.startDate?.message} />
//                     <TextField label="End Date" type="date" fullWidth margin="normal" {...register("endDate", {
//                         required: "End date is required",
//                         validate: {
//                             afterStart: value => startDate && new Date(value) > new Date(startDate) || "End date must be after start date"
//                         }
//                     })} InputLabelProps={{ shrink: true }} required error={!!errors.endDate} helperText={errors.endDate?.message} />
//                     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Add</Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// }



import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BudgetModel } from "../../../Models/BudgetModel";
import { budgetService } from "../../../Services/BudgetService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./AddNewBudget.css";

export function AddNewBudget(): JSX.Element {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BudgetModel>();
    const navigate = useNavigate();
    const startDate = watch("startDate");

    useEffect(() => {
        const userId = userService.getUserIdFromToken();
        if (userId) setValue("userId", userId);
    }, [setValue]);

    async function onSubmit(budget: BudgetModel) {
        const userId = userService.getUserIdFromToken();
        try {
            if (userId) budget.userId = userId;
            await budgetService.addBudgets(budget);
            notify.success("Budget added successfully");
            navigate("/personal");
            
            const defaultBudget = JSON.parse(localStorage.getItem("defaultBudget") || "null");
            if (defaultBudget && 
                new Date(budget.startDate) >= new Date(defaultBudget.startDate) && 
                new Date(budget.endDate) <= new Date(defaultBudget.endDate)) {
                const updatedMoneySpent = defaultBudget.moneySpent + budget.amount;
                const updatedPercentageUsed = (updatedMoneySpent / defaultBudget.moneyLeft) * 100;
                const updatedBudget = { 
                    ...defaultBudget, 
                    moneySpent: updatedMoneySpent, 
                    percentageUsed: updatedPercentageUsed 
                };
                localStorage.setItem("defaultBudget", JSON.stringify(updatedBudget));
            }
        } catch (err: any) {
            notify.error("Error adding the budget");
        }
    }

    return (
        <div className="AddBudget">
            <div className="budget-card">
                <div className="budget-header">
                    <h1>New Budget Plan</h1>
                    <p className="subtitle">Set your spending limits</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="budget-form">
                    <div className="form-group">
                        <label>Budget Name</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter budget name"
                                className={errors.name ? "error" : ""}
                                {...register("name", {
                                    required: "Budget name is required",
                                    minLength: { 
                                        value: 3, 
                                        message: "Minimum 3 characters" 
                                    },
                                    maxLength: { 
                                        value: 1000, 
                                        message: "Maximum 1000 characters" 
                                    }
                                })}
                            />
                            {errors.name && <div className="error-icon">!</div>}
                        </div>
                        {errors.name && 
                            <span className="error-message">{errors.name.message}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                placeholder="Enter budget amount"
                                step="0.01"
                                min="0.01"
                                className={errors.amount ? "error" : ""}
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: { 
                                        value: 0.01, 
                                        message: "Amount must be greater than 0" 
                                    }
                                })}
                            />
                            {errors.amount && <div className="error-icon">!</div>}
                        </div>
                        {errors.amount && 
                            <span className="error-message">{errors.amount.message}</span>
                        }
                    </div>

                    <div className="date-group">
                        <div className="form-group">
                            <label>Start Date</label>
                            <div className="input-wrapper">
                                <input
                                    type="date"
                                    className={errors.startDate ? "error" : ""}
                                    {...register("startDate", {
                                        required: "Start date is required",
                                        validate: {
                                            notPast: value => 
                                                new Date(value) >= new Date(Date.now() - 24 * 60 * 60 * 1000) || 
                                                "Start date cannot be in the past"
                                        }
                                    })}
                                />
                                {errors.startDate && <div className="error-icon">!</div>}
                            </div>
                            {errors.startDate && 
                                <span className="error-message">{errors.startDate.message}</span>
                            }
                        </div>

                        <div className="form-group">
                            <label>End Date</label>
                            <div className="input-wrapper">
                                <input
                                    type="date"
                                    className={errors.endDate ? "error" : ""}
                                    {...register("endDate", {
                                        required: "End date is required",
                                        validate: {
                                            afterStart: value => 
                                                startDate && new Date(value) > new Date(startDate) || 
                                                "End date must be after start date"
                                        }
                                    })}
                                />
                                {errors.endDate && <div className="error-icon">!</div>}
                            </div>
                            {errors.endDate && 
                                <span className="error-message">{errors.endDate.message}</span>
                            }
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Create Budget
                    </button>
                </form>
            </div>
        </div>
    );
}