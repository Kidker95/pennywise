import express, { NextFunction, Request, Response } from 'express';
import { ICriteria, Range, StatusCode } from '../3-models/enums';
import { ExpenseModel } from '../3-models/expense-model';
import { expenseService } from '../4-services/expense-service';
import { securityMiddleware } from '../6-middleware/security-middleware';
import { userService } from '../4-services/user-service';

class ExpenseController {

    public readonly router = express.Router();

    public constructor() {
        // Add validate token later, add validate admin on delete expense
        this.router.get("/expenses",securityMiddleware.validateToken, this.getAllExpenses);
        this.router.get("/expenses/:id([0-9]+)", this.getOneExpense);
        this.router.get("/expenses/categories", this.getCategoryNames);
        this.router.get("/expenses/by-date", this.getExpensesByDate);
        this.router.post("/expenses", this.addExpense);
        this.router.put("/expenses/:id([0-9]+)", this.updateExpense);
        this.router.delete("/expenses/:id([0-9]+)", this.deleteExpense);
        this.router.get("/expenses/:range", this.searchExpensesByDateRange);
        this.router.get("/search-expenses", this.searchExpenses);
    }

    private async getAllExpenses(request: Request, response: Response, next: NextFunction) {
        try {
            console.log("User object in request: ", request.user); // Debugging line
            const userId = request.user?.id; 
            const expenses = await expenseService.getAllExpenses(userId);
            response.json(expenses);
        } catch (err: any) {
            next(err);
        }
    }

    private async getCategoryNames(request: Request, response: Response, next: NextFunction) {
        try {
            const categories = await expenseService.getCategoriesNames();
            response.json(categories);
        } catch (err: any) { next(err); }
    }

    private async getOneExpense(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const userId = request.user.id; // Set userId from request
            const expense = await expenseService.getOneExpense(id, userId);
            response.json(expense);
        } catch (err: any) { next(err); }
    }

    private async getExpensesByDate(request: Request, response: Response, next: NextFunction) {
        try {
            const { startDate, endDate } = request.query;
            const userId = request.user.id;
            const expenses = await expenseService.getExpensesByDate(userId, startDate as string, endDate as string);
            response.json(expenses);
        } catch (err: any) { next(err); }
    }

    private async addExpense(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = request.user.id; // Retrieve userId from request
            const expenseData = { ...request.body, userId }; // Include userId in the data
            const expense = new ExpenseModel(expenseData); // Pass the full data, including userId, to the model
            const dbExpense = await expenseService.addExpense(expense);
            response.status(StatusCode.Created).json(dbExpense);
        } catch (err: any) { next(err); }
    }

    public async deleteExpense(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = userService.getUserIdFromToken(request); // Retrieve user ID from token
            const expenseId = +request.params.id; // Get the expense ID from request parameters
    
            await expenseService.deleteExpense(expenseId, userId); // Call the service function with expenseId and userId
    
            response.json({ message: "Expense deleted successfully!" });
        } catch (err: any) {
            next(err); // Pass the error to the error-handling middleware
        }
    }

    public async updateExpense(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = userService.getUserIdFromToken(request);
            const updatedExpense = new ExpenseModel(request.body);
    
            await expenseService.updateExpense(updatedExpense, userId);
            response.json({ message: "Expense updated successfully!" });
        } catch (err: any) {
            next(err);
        }
    }   
    public async searchExpenses(request: Request, response: Response, next: NextFunction) {
        try {
            const criteria = request.query as ICriteria;
            const userId = request.user.id;
            const expenses = await expenseService.searchExpenses(userId, criteria);
            response.json(expenses);
        } catch (err) { next(err); }
    }

    public async searchExpensesByDateRange(request: Request, response: Response, next: NextFunction) {
        try {
            const range = request.params.range as Range;
            const userId = request.user.id;
            const expenses = await expenseService.searchExpensesByDateRange(range);
            response.json(expenses);
        } catch (err: any) { next(err); }
    }
}

export const expenseController = new ExpenseController();
