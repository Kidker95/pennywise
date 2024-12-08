import express, { NextFunction, Request, Response } from 'express';
import { BudgetModel } from '../3-models/budget-model';
import { ICriteria, StatusCode } from '../3-models/enums';
import { budgetService } from '../4-services/budget-service';

class BudgetController {
    public readonly router = express.Router();

    public constructor() {
        // Add validate token later, add validate admin too on delete expense
        this.router.get("/budgets", this.getAllBudgets);
        this.router.get("/budgets/:id([0-9]+)", this.getOneBudget);
        this.router.get("/budgets/search/", this.searchBudgets);
        this.router.post("/budgets", this.addBudget);
        this.router.put("/budgets/:id([0-9]+)", this.updateBudget);
        this.router.delete("/budgets/:id([0-9]+)", this.deleteBudget);
    };


    private async getAllBudgets(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.user?.id; 
            const budget = await budgetService.getAllBudgets(userId);
            response.json(budget);
        } catch (err: any) { next(err); }
    }

    private async getOneBudget(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const userId = request.user.id;
            const budget = await budgetService.getOneBudget(id,userId);
            response.json(budget);
        } catch (err: any) { next(err); }
    }


    private async addBudget(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.user.id;
            const budgetData = {...request.body,userId};
            const budget = new BudgetModel(budgetData);
            const dbBudget = await budgetService.addBudget(budget);
            response.status(StatusCode.Created).json(dbBudget);
        } catch (err: any) { next(err); }
    }

    private async deleteBudget(request: Request, response: Response, next: NextFunction) {
        try {
            const id = + request.params.id;
            await budgetService.deleteBudget(id);
            response.sendStatus(StatusCode.NoContent);
        } catch (err: any) { next(err); }
    }

    private async updateBudget(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.id = +request.params.id;
            const budget = new BudgetModel(request.body);
            const dbBudget = await budgetService.updateBudget(budget)
            response.json(dbBudget)
        } catch (err: any) { next(err); }
    }

    public async searchBudgets(request: Request, response: Response, next: NextFunction) {
        try {
            const criteria = request.query as ICriteria;
            const budgets = await budgetService.searchBudgets(criteria)
            response.json(budgets);
        } catch (err) { next(err) }
    }
}
export const budgetController = new BudgetController();