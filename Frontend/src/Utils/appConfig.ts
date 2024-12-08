class AppConfig {
    private readonly baseUrl = "http://localhost:4000/api";

    public readonly expenses = `${this.baseUrl}/expenses/`;
    public readonly expenseCategories = `${this.baseUrl}/expenses/categories`;
    public readonly budgets = `${this.baseUrl}/budgets`;
    public readonly users = `${this.baseUrl}/users`;
    
    public readonly login = `${this.baseUrl}/login`;
    public readonly register = `${this.baseUrl}/register`;

    public readonly requestPartner = `${this.baseUrl}/request-partner`;
    public readonly respondRequest = `${this.baseUrl}/respond-request`;

    // Update these two URLs to include "/users"
    public readonly pendingRequests = (userId: number) => `${this.baseUrl}/users/pending-requests/${userId}`;
    public readonly requestStatus = (userId: number) => `${this.baseUrl}/users/request-status/${userId}`;
}

export const appConfig = new AppConfig();
