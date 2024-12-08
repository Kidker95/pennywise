import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BudgetModel } from "../../../Models/BudgetModel";
import { budgetService } from "../../../Services/BudgetService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function EditBudget(): JSX.Element {
    const { id } = useParams();
    const budgetId = Number(id);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BudgetModel>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!budgetId || isNaN(budgetId)) {
            notify.error("Invalid Budget ID");
            return;
        }

        budgetService.getOneBudget(budgetId)
            .then(budget => {
                if (budget) {
                    setValue("name", budget.name);
                    setValue("amount", budget.amount);
                    setValue("startDate", budget.startDate);
                    setValue("endDate", budget.endDate);
                } else {
                    notify.error("Budget not found");
                }
            })
            .catch(err => notify.error(err));
    }, [budgetId, setValue]);

    const startDate = watch("startDate");

    const onSubmit = async (budget: BudgetModel) => {
        try {
            const userId = userService.getUserIdFromToken();
            if (userId) {
                budget.userId = userId;
            }
            budget.id = budgetId;
            await budgetService.updateBudget(budget);
            notify.success("Budget updated successfully");
            navigate("/budgets");
        } catch (err: any) {
            notify.error("Error updating the budget");
        }
    };


    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>Edit Budget</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Budget Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        {...register("name", {
                            minLength: { value: 3, message: "Minimum 3 characters" },
                            maxLength: { value: 1000, message: "Maximum 1000 characters" }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        {...register("amount", {
                            min: { value: 0.01, message: "Amount must be at least 0.01" }
                        })}
                        inputProps={{ min: 0.01, step: 0.01 }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        {...register("startDate")}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        {...register("endDate", {
                            validate: {
                                afterStart: value =>
                                    startDate && new Date(value) > new Date(startDate) || "End date must be after start date"
                            }
                        })}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
                        Update
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
