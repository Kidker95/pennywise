import moment from "moment";
import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { BudgetModel } from "../3-models/budget-model";
import { ICriteria } from "../3-models/enums";
import { BadRequestError, NotFoundError } from "../3-models/error-model";

class BudgetService {

    public formatDateTime(budget: BudgetModel): BudgetModel {
        budget.startDate = moment(budget.startDate).format('YYYY-MM-DD');
        budget.endDate = moment(budget.endDate).format('YYYY-MM-DD');
        return budget;
    }

   // Get all budgets for the logged-in user and their partner, with formatted startDate and endDate
public async getAllBudgets(userId: number): Promise<BudgetModel[]> {
    // Retrieve the partnerId for the logged-in user
    const partnerSql = `SELECT partnerId FROM users WHERE id = ?`;
    const partnerResult = await dal.execute(partnerSql, [userId]);
    const partnerId = partnerResult[0]?.partnerId;

    if (!userId || isNaN(userId)) {
        throw new Error("Invalid user ID.");
    }

    // Query to get budgets for both the user and their partner
    const sql = `SELECT * FROM budgets WHERE userId = ? ${partnerId ? 'OR userId = ?' : ''}`;
    const values = partnerId ? [userId, partnerId] : [userId];
    const budgets: BudgetModel[] = await dal.execute(sql, values);

    // Format the dates for each budget and return
    return budgets.map(budget => this.formatDateTime(budget));
}


public async getOneBudget(id: number, userId: number): Promise<BudgetModel> {
    // Retrieve the partnerId for the logged-in user
    const partnerSql = `SELECT partnerId FROM users WHERE id = ?`;
    const partnerResult = await dal.execute(partnerSql, [userId]);
    const partnerId = partnerResult[0]?.partnerId;

    if (!userId || isNaN(userId)) {
        throw new Error("Invalid user ID.");
    }

    // Query to get the budget for either the user or their partner
    const sql = `SELECT * FROM budgets WHERE id = ? AND (userId = ? ${partnerId ? 'OR userId = ?' : ''})`;
    const values = partnerId ? [id, userId, partnerId] : [id, userId];
    const budgets = await dal.execute(sql, values);
    const budget = budgets[0];

    if (!budget) throw new NotFoundError(`Budget with id ${id} not found.`);

    // Format the dates for the single budget
    return this.formatDateTime(budget);
}


    public async addBudget(budget: BudgetModel): Promise<BudgetModel> {
        budget.validateInsert();
        const sql = "insert into budgets (userId, amount, name, startDate, endDate) values (?, ?, ?, ?, ?)";
        const values = [budget.userId, budget.amount, budget.name, budget.startDate, budget.endDate];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        const dbBudget = await this.getOneBudget(successParams.insertId,budget.userId);
        if (!successParams.affectedRows) throw new BadRequestError("Error adding budget.");
        return dbBudget;
    }

    public async updateBudget(budget: BudgetModel): Promise<BudgetModel> {
        budget.validateUpdate();
        const sql = "update budgets set userId = ?, amount = ?, name = ?, startDate = ?, endDate = ? WHERE id = ?";
        const values = [budget.userId, budget.amount, budget.name, budget.startDate, budget.endDate, budget.id];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        if (successParams.affectedRows === 0) throw new NotFoundError(`Budget with id ${budget.id} not found.`);
        const dbBudget = await this.getOneBudget(budget.id,budget.userId);
        return dbBudget;
    }

    public async deleteBudget(id: number): Promise<void> {
        const sql = `delete from budgets where id = ?`;
        const values = [id];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        if (successParams.affectedRows === 0) throw new Error(`Budget with id ${id} not found.`);
    }

    // Search budgets based on various criteria
    public async searchBudgets(criteria: ICriteria): Promise<BudgetModel[]> {
        let sql = "select * from budgets where userId = ?"; // Base query
        const values: any[] = []; // Store dynamic query parameters
        let hasCriteria = false; // Flag to check if any criteria is applied

        // Add conditions based on the criteria provided
        if (criteria.amount !== undefined) {
            sql += " and amount = ?";
            values.push(criteria.amount);
            hasCriteria = true;
        }
        if (criteria.name) {
            sql += " and name LIKE ?";
            values.push(`%${criteria.name}%`); // Use LIKE for partial matching
            hasCriteria = true;
        }
        if (criteria.startDate) {
            sql += " and startDate >= ?";
            values.push(criteria.startDate);
            hasCriteria = true;
        }
        if (criteria.endDate) {
            sql += " and endDate <= ?";
            values.push(criteria.endDate);
            hasCriteria = true;
        }

        // If no criteria was provided, return an empty result
        if (!hasCriteria) {
            throw new BadRequestError("Need at least one parameter to search by."); // No filters, return empty array
        }

        // Execute the query with the dynamic values
        const budgets = await dal.execute(sql, values);

        // If no budgets match the query, return an empty array
        if (budgets.length === 0) {
            throw new NotFoundError("No budgets found."); // No matching records found
        }

        // Format the dates for each budget and return
        return budgets.map(budget => this.formatDateTime(budget));
    }

}

export const budgetService = new BudgetService();
