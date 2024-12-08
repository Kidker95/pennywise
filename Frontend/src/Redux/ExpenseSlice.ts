import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseModel } from "../Models/ExpenseModel";

// Initialize expenses state as an empty array
const initialState: ExpenseModel[] = [];

// Create the slice with reducers defined inside it
export const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        initExpenses: (state, action: PayloadAction<ExpenseModel[]>) => {
            return action.payload; // Set state to fetched expenses
        },
        addExpense: (state, action: PayloadAction<ExpenseModel>) => {
            state.push(action.payload); // Add new expense to the array
        },
        updateExpense: (state, action: PayloadAction<ExpenseModel>) => {
            const index = state.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload; // Update the specific expense
            }
        },
        deleteExpense: (state, action: PayloadAction<number>) => {
            return state.filter(expense => expense.id !== action.payload); // Remove the expense by ID
        }
    }
});

// Export actions
export const expenseActions = expenseSlice.actions;

// Export reducer
export default expenseSlice.reducer;
