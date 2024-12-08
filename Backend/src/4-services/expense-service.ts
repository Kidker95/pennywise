import { CategoryModel } from './../../../Frontend/src/Models/CategoryModel';
import moment from 'moment';
import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ICriteria, Range } from "../3-models/enums";
import { NotFoundError } from "../3-models/error-model";
import { ExpenseModel } from "../3-models/expense-model";
import { cyber } from '../2-utils/cyber';


class ExpenseService {

    public formatDateTime(expense: ExpenseModel): ExpenseModel {
        expense.dateTime = moment(expense.dateTime).format('YYYY-MM-DD HH:mm:ss');
        return expense;
    }

    public async getCategoriesNames(): Promise<CategoryModel[]> {
        const sql = `select * from expenseCategories`;
        const expenses = await dal.execute(sql);
        if (!expenses) throw new NotFoundError("Can't find categories");
        return expenses;
    }

    public async getAllExpenses(userId: number): Promise<ExpenseModel[]> {
        // First, retrieve the partnerId for the logged-in user
        const partnerSql = `SELECT partnerId FROM users WHERE id = ?`;
        const partnerResult = await dal.execute(partnerSql, [userId]);
        const partnerId = partnerResult[0]?.partnerId;
        if (!userId || isNaN(userId)) {
            throw new Error("Invalid user ID.");
        }
        // Query to get expenses for both user and partner
        const sql = `SELECT exp.id, exp.userId, exp.amount, expCat.name AS expenseName, exp.description, exp.dateTime
        FROM expenses exp JOIN expensecategories expCat ON exp.expenseId = expCat.id WHERE exp.userId = ? ${partnerId ? 'OR exp.userId = ?' : ''}`;
        const values = partnerId ? [userId, partnerId] : [userId];
        const expenses: ExpenseModel[] = await dal.execute(sql, values);
        return expenses.map(expense => this.formatDateTime(expense));
    }



    public async getOneExpense(id: number, userId: number): Promise<ExpenseModel> {
        const sql = `SELECT * FROM expenses WHERE id = ? AND userId = ?`;
        const values = [id, userId];
        const expenses = await dal.execute(sql, values);
        const expense = expenses[0];
        if (!expense) throw new NotFoundError("No Expense Found");
        return this.formatDateTime(expense);
    }



    public async getExpensesByDate(userId: number, startDate: string, endDate: string): Promise<ExpenseModel[]> {
        const sql = `SELECT * FROM expenses WHERE userId = ? AND dateTime BETWEEN ? AND ?`;
        const values = [userId, startDate, endDate];
        const expenses: ExpenseModel[] = await dal.execute(sql, values);
        if (!expenses) throw new NotFoundError("Something went wrong..");
        return expenses.map(expense => this.formatDateTime(expense));
    }


    public async addExpense(expense: ExpenseModel): Promise<ExpenseModel> {
        expense.validateInsert();
        const sql = `insert into expenses (userId, amount, expenseId, dateTime, description) values (?, ?, ?, ?, ?)`;
        const values = [expense.userId, expense.amount, expense.expenseId, expense.dateTime, expense.description];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        const dbExpense = await this.getOneExpense(successParams.insertId, expense.userId); // Pass userId here
        return dbExpense;
    }


    public async deleteExpense(expenseId: number, userId: number): Promise<void> {
        const expense = await this.getExpenseById(expenseId);

        if (!expense) throw new Error("Expense not found.");

        const partnerId = await this.getUserPartnerId(userId);

        // Check if the user or their partner owns the expense
        if (expense.userId !== userId && expense.userId !== partnerId) {
            throw new Error("Unauthorized access. You can only delete your or your partner's expenses.");
        }

        const sql = `DELETE FROM expenses WHERE id = ?`;
        await dal.execute(sql, [expenseId]);
    }


    private async getUserPartnerId(userId: number): Promise<number | null> {
        const sql = `SELECT partnerId FROM users WHERE id = ?`;
        const [result] = await dal.execute(sql, [userId]);
        return result ? result.partnerId : null;
    }
    private async getExpenseById(expenseId: number): Promise<ExpenseModel> {
        const sql = `SELECT * FROM expenses WHERE id = ?`;
        const [expense] = await dal.execute(sql, [expenseId]);
        return expense;
    }
    // Update expense with partner permission check
    public async updateExpense(updatedExpense: ExpenseModel, userId: number): Promise<void> {
        updatedExpense.validateUpdate()
        const expense = await this.getExpenseById(updatedExpense.id);

        if (!expense) throw new Error("Expense not found.");

        const partnerId = await this.getUserPartnerId(userId);

        // Check if the user or their partner owns the expense
        if (expense.userId !== userId && expense.userId !== partnerId) {
            throw new Error("Unauthorized access. You can only edit your or your partner's expenses.");
        }

        const sql = `
            UPDATE expenses
            SET amount = ?, description = ?, dateTime = ?, expenseId = ?
            WHERE id = ?`;

        const values = [updatedExpense.amount, updatedExpense.description, updatedExpense.dateTime, updatedExpense.expenseId, updatedExpense.id];
        await dal.execute(sql, values);
    }


    public async searchExpenses(userId: number, criteria: ICriteria): Promise<ExpenseModel[]> {
        let sql = "SELECT * FROM expenses WHERE userId = ?";
        const values: any[] = [userId];

        if (criteria.amount !== undefined) {
            sql += " AND amount = ?";
            values.push(criteria.amount);
        }

        if (criteria.description) {
            sql += " AND description LIKE ?";
            values.push(`%${criteria.description}%`);
        }

        if (criteria.dateTime) {
            sql += " AND DATE(dateTime) = ?";
            values.push(criteria.dateTime);
        }

        const expenses = await dal.execute(sql, values);
        if (expenses.length === 0) throw new NotFoundError("No expenses found.");
        return expenses.map((expense: ExpenseModel) => this.formatDateTime(expense));
    }


    // donut chart 
    public async searchExpensesByDateRange(range: Range): Promise<ExpenseModel[]> {
        let sql = "SELECT * FROM expenses WHERE 1=1";
        const values: any[] = [];
        switch (range) {
            case Range.Daily:
                sql += " AND DATE(dateTime) = CURDATE()"; // Expenses from today
                break;
            case Range.Recent:
                sql += " AND DATE(dateTime) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)"; // Expenses from the last 7 days
                break;
            case Range.Weekly:
                sql += " AND YEARWEEK(dateTime, 1) = YEARWEEK(CURDATE(), 1)"; // Expenses from the current week (starting Monday)
                break;
            case Range.Monthly:
                sql += " AND MONTH(dateTime) = MONTH(CURDATE()) AND YEAR(dateTime) = YEAR(CURDATE())"; // Expenses from the current month
                break;
            case Range.Yearly:
                sql += " AND YEAR(dateTime) = YEAR(CURDATE())"; // Expenses from the current year
                break;
            default:
                return [];
        }

        const expenses = await dal.execute(sql, values);

        if (expenses.length === 0) {
            return [];
        }
        return expenses.map((expense: ExpenseModel) => this.formatDateTime(expense));
    }


}

export const expenseService = new ExpenseService();