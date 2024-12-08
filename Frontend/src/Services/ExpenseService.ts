import axios, { AxiosRequestConfig } from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { ExpenseModel } from "../Models/ExpenseModel";
import { store } from "../Redux/Store";
import { expenseActions } from "../Redux/ExpenseSlice";
import { notify } from "../Utils/Notify";
import { appConfig } from "../Utils/appConfig";

class ExpenseService {

    public async getAllExpenses(): Promise<ExpenseModel[]> {
        if (store.getState().expense.length > 0) return store.getState().expense;

        const response = await axios.get(appConfig.expenses)
        const expenses = response.data;
        const action = expenseActions.initExpenses(expenses);
        store.dispatch(action);
        return expenses;
    }

    public async getOneExpense(id: number): Promise<ExpenseModel> {
        const globalExpense = store.getState().expense.find(e => e.id === id);
        if (globalExpense) return globalExpense;
        const response = await axios.get(appConfig.expenses + id);
        const expense = response.data;
        return expense;
    }

    public async addExpense(expense: ExpenseModel): Promise<void> {

        const options: AxiosRequestConfig = {
            headers: { "Content-Type": "application/json" }
        };
        const response = await axios.post(appConfig.expenses, expense, options);
        notify.success("expense added!")
        const dbExpense = response.data;
        const action = expenseActions.addExpense(dbExpense);
        store.dispatch(action);
    }

    public async updateExpenses(expense: ExpenseModel): Promise<void> {

        const options: AxiosRequestConfig = { headers: { "Content-Type": "application/json" } };
        const response = await axios.put(appConfig.expenses + expense.id, expense, options)
        const dbExpense = response.data;
        const action = expenseActions.updateExpense(dbExpense);
        store.dispatch(action);

    }

    public async deleteExpenses(id: number): Promise<void> {
        await axios.delete(appConfig.expenses + id);
        const action = expenseActions.deleteExpense(id);
        store.dispatch(action);

    }

    public async getExpensesByRange(range: Range): Promise<ExpenseModel[]> {
        try {

            const response = await axios.get(appConfig.expenses, { params: { range } });
            return response.data;
        } catch (err: any) {
            notify.error(err.message || "Failed to fetch expenses by range.");
            throw err;
        }
    }

    public async getCategories(): Promise<CategoryModel[]> {
        try {
            const response = await axios.get(appConfig.expenseCategories);
            return response.data;
        } catch (err) {
            console.error("Error fetching categories", err);
            throw err; 
        }
    }


}


export const expenseService = new ExpenseService();