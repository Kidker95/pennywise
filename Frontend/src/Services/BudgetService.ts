import axios, { AxiosRequestConfig } from "axios";
import { BudgetModel } from "../Models/BudgetModel";
import { appConfig } from "../Utils/appConfig";
import { notify } from "../Utils/Notify";
import { store } from "../Redux/Store";

class BudgetService {

    public async getAllBudgets(): Promise<BudgetModel[]> {
        if (store.getState().budget.length > 0) return store.getState().budget;
        const response = await axios.get(appConfig.budgets);
        const budgets = response.data;
        return budgets;
    }

    public async getOneBudget(id: number): Promise<BudgetModel> {
        const globalBudget = (store.getState().budget.find(e => e.id === id))
        if (globalBudget) return globalBudget;
        const response = await axios.get(appConfig.budgets + id);
        const budget = response.data;
        return budget;

    }

    public async addBudgets(budget: BudgetModel): Promise<void> {
        const options: AxiosRequestConfig = { headers: { "Content-Type": "application/json" } };
        const response = await axios.post(appConfig.budgets, budget, options);
        notify.success("Budget added!");
        const dbBudget = response.data;
    }

    public async updateBudget(budget: BudgetModel): Promise<void> {
        const options: AxiosRequestConfig = { headers: { "Content-Type": "application/json" } };
        const response = await axios.put(appConfig.budgets+budget.id,budget, options);
        const dbBudget = response.data;
    }

    public async deleteBudget(id: number): Promise<void> {
        await axios.delete(appConfig.budgets + id);
    }

}

export const budgetService = new BudgetService();