import { Dayjs } from "dayjs";

export class ExpenseModel {
    public id: number;
    public userId: number;
    public amount: number;
    public expenseId: number;
    public expenseName: string;
    public dateTime: Dayjs | string;
    public description: string;
}
