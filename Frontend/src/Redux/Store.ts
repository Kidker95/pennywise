import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./Middleware";
import { UserSlice } from "./UserSlice";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import { BudgetModel } from "../Models/BudgetModel";
import { budgetSlice } from "./BudgetSlice";
import { ExpenseModel } from "../Models/ExpenseModel";
import { expenseSlice } from "./ExpenseSlice";


export type AppState = {
    expense: ExpenseModel[];
    budget: BudgetModel[];
    user: UserModel;
    credentials: CredentialsModel;

};

export const store = configureStore<AppState>({
    reducer: {
        expense: expenseSlice.reducer,
        user: UserSlice.reducer,
        credentials: UserSlice.reducer,
        budget: budgetSlice.reducer,


    },
    middleware: (getMiddleWare) => getMiddleWare().concat(loggerMiddleware) as any
});


export type AppDispatch = typeof store.dispatch;