export class BudgetModel {
    public id: number;
    public userId: number;
    public amount: number;
    public name: string;
    public isActive: boolean
    public startDate: string | Date;
    public endDate: string | Date;
}

export class RenderedBudget {
    moneySpent: number;
    moneyLeft: number;
    percentageUsed: number;
    userName: string
}