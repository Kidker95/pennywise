import Joi from "joi";
import { BadRequestError } from "./error-model";

export class BudgetModel {
    public id: number;
    public userId: number;
    public amount: number;
    public name: string;
    public startDate: Date | string;
    public endDate: Date | string;

    public constructor(budget: BudgetModel) {
        this.id = budget.id;
        this.userId = budget.userId;
        this.amount = budget.amount;
        this.name = budget.name;
        this.startDate = budget.startDate instanceof Date ? budget.startDate.toLocaleDateString() : budget.startDate; //if date, you can use .toLocaleDateString()
        this.endDate = budget.endDate instanceof Date ? budget.endDate.toLocaleDateString() : budget.endDate;
    }

    // Validation schema for inserting a new budget
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(), 
        userId: Joi.number().required().positive().integer(),
        amount: Joi.number().required().positive().min(0.01), 
        name: Joi.string().required().min(3).max(1000),
        startDate: Joi.date().required().min(new Date(Date.now() - 24 * 60 * 60 * 1000)).iso(),
        endDate: Joi.date().required().greater(Joi.ref('startDate')) // End date must be after start date
    });

    // Validation schema for updating an existing budget
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required(), // ID is required for updating
        userId: Joi.number().optional().positive().integer(),
        amount: Joi.number().optional().positive().min(0.01),
        name: Joi.string().optional().min(3).max(1000),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional().greater(Joi.ref('startDate')) // End date must still be after start date
    });

    // Insert validation function
    public validateInsert(): void {
        const result = BudgetModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    // Update validation function
    public validateUpdate(): void {
        const result = BudgetModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}
