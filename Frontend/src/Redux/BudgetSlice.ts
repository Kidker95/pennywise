import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { BudgetModel } from "../Models/BudgetModel";

export function initBudget(currentState: BudgetModel[], action: PayloadAction<BudgetModel[]>): BudgetModel[] {
    return action.payload; // Initialize state with an array of budgets from the action payload
}



export function addBudget(currentState: BudgetModel[], action: PayloadAction<BudgetModel>): BudgetModel[] {
    return [...currentState, action.payload];
}

export function updateBudget(currentState: BudgetModel[], action: PayloadAction<BudgetModel>): BudgetModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(budget => budget.id === action.payload.id);

    if (index !== -1) newState[index] = action.payload;
    return newState;
}

export function deleteBudget(currentState: BudgetModel[],action: PayloadAction<number>): BudgetModel[]{
    return currentState.filter(budget => budget.id !== action.payload);
}

export const budgetSlice = createSlice({
    name: "budget",
    initialState: [] as BudgetModel[],  // Initialize as an empty array
    reducers: { 
        initBudget, 
        addBudget, 
        updateBudget, 
        deleteBudget 
    }
});

export const budgetActions = budgetSlice.actions;

export default budgetSlice.reducer;