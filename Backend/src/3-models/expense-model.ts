import Joi from "joi";
import { BadRequestError } from "./error-model";

declare module "express" {
    export interface Request {
        user?: { id: number }; 
    }
}


export class ExpenseModel {
    public id: number;
    public userId: number;
    public amount: number;
    public expenseId: number;
    public dateTime: string | null; //if null, trigger in sql will add dateTime
    public description: string;


    public constructor(expense: ExpenseModel) { // copy constructor
        this.id = expense.id;
        this.userId = expense.userId;
        this.amount = expense.amount;
        this.expenseId = expense.expenseId;
        this.dateTime = expense.dateTime;
        this.description = expense.description;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        userId: Joi.number().required().positive().integer(),
        amount: Joi.number().required().positive(),
        expenseId: Joi.number().required().integer().min(1).max(15),
        dateTime: Joi.date().optional().max('now').iso().allow(null),
        description: Joi.string().optional().max(5000)
    });

    private static updateValidationSchema = Joi.object({
        id: Joi.number().required(),
        userId: Joi.number().optional().positive().integer(),
        amount: Joi.number().optional().positive().integer(),
        expenseId: Joi.number().optional().integer().min(1).max(15),
        dateTime: Joi.date().optional().max('now').iso(),
        description: Joi.string().optional().max(5000)
    });

    public validateInsert(): void {
        const result = ExpenseModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
    public validateUpdate(): void {
        const result = ExpenseModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}

