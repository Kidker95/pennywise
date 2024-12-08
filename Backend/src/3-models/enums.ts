export enum StatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

export enum RoleModel {
    Admin = 1,
    User = 2
}

export interface ICriteria {
    amount?: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    dateTime?: string;
}

export enum Range {
    Daily = "daily",
    Recent = "recent",
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
