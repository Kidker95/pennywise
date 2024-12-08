import { NextFunction, Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

class Logger {

    // Define paths for both log files
    static errorLogPath: string = join(__dirname, '../logs/errors.log');
    static requestLogPath: string = join(__dirname, '../logs/requests.log');

    // Middleware to log requests to console and to requests.log
    public async logRequests(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            // Console log the request (first functionality)
            console.log("start-------------");
            console.log("Method: " + request.method);
            console.log("Route: " + request.originalUrl);
            console.log("Body: ", request.body);
            console.log("-------------end");

            // Append the request log to requests.log 
            const data = `
            Method: ${request.method},\n
            Route: ${request.originalUrl},\n
            Body: ${JSON.stringify(request.body)},\n
            Time: ${new Date().toISOString()}
            ------------\n`;

        
            await fsPromises.appendFile(Logger.requestLogPath, data);
        } catch (err: any) {
            next(err);
        }

        // Move to the next middleware/controller
        next();
    }

    // Error logging method (not middleware, to be called directly inside error middleware)
    public async logError(err: any): Promise<void> {
        try {
            let message = "";
            const now = new Date();

            message += "Time: " + now.toLocaleString() + "\n";
            message += "Error: " + err.message + "\n";
            if (err.stack) message += "Stack: " + err.stack + "\n";
            message += "\n-------------------------------------------------\n\n";

            // Append the error log to errors.log
            await fsPromises.appendFile(Logger.errorLogPath, message);
        } catch (error: any) {
            console.error("Failed to log error:", error);
        }
    }
}

export const logger = new Logger();
