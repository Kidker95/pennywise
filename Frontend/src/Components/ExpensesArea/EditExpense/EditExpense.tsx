import { Box, Button, Container, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import "./EditExpense.css";
import { ExpenseModel } from "../../../Models/ExpenseModel";
import { expenseService } from "../../../Services/ExpenseService";
import { notify } from "../../../Utils/Notify";
import { CategoryModel } from "../../../Models/CategoryModel";

export function EditExpense(): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<ExpenseModel>();
    const [expense, setExpense] = useState<ExpenseModel | null>(null);
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.expId
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categories = await expenseService.getCategories();
                setCategories(categories);
            } catch (err) {
                alert("Failed to fetch categories");
            }
        }
        async function fetchExpense() {
            try {
                const expense = await expenseService.getOneExpense(id);
                setExpense(expense)
                console.log("Expense:", expense);
                setValue("amount", expense.amount);
                setValue("id", expense.id);
                setValue("dateTime", expense.dateTime);
                setValue("description", expense.description);
                setValue("expenseId", expense.expenseId); // Set the category ID here
            } catch (err) {
                notify.error(err);
            }
        }
        fetchCategories();
        fetchExpense();

    }, [id, setValue])
    async function onSubmit(updatedExpense: ExpenseModel) {

        const userId = userService.getUserIdFromToken();
        if (userId) {
            updatedExpense.userId = userId;
        } else {
            notify.error("User ID is not available.");
            return;
        }

        try {
            await expenseService.updateExpenses(updatedExpense); // Send the updated expense to the backend
            notify.success("Expense updated successfully!");
            navigate("/personal");
        } catch (err: any) {
            notify.error("Failed to update expense.");
        }
    }
    if (!expense) {
        // Render a loading message or spinner until expense data is loaded
        return <p>Loading...</p>;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Expense Amount"
                        fullWidth
                        margin="normal"
                        {...register("amount", { required: true })}
                    />
                    <TextField
                        label="Expense Description"
                        fullWidth
                        margin="normal"
                        {...register("description", { required: true })}
                    />
                    <TextField
                        label="Expense Date"
                        fullWidth
                        margin="normal"
                        type="datetime-local"
                        {...register("dateTime", { required: true })}
                    />
                    <TextField
                        select
                        label="Expense Category"
                        fullWidth
                        margin="normal"
                        defaultValue={expense.expenseId || ""}
                        {...register("expenseId", { required: true })}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}