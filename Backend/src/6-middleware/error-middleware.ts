import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../3-models/enums';
import { appConfig } from '../2-utils/app-config';
import { logger } from './logger';
import { NotFoundError } from '../3-models/error-model';

class ErrorMiddleware {

    public async catchAll(err: any, request: Request, response: Response, next: NextFunction): Promise<void> {

        // Display error in console
        console.log(err);

        // Log the error to errors.log
        await logger.logError(err);

        // Extract status code (if no status, it means server crash):
        const status = err.status || StatusCode.InternalServerError;

        const isCrash = status >= 500 && status <= 599; // True/false for "my bad" errors.

        // Extract message:
        const message = isCrash && !appConfig.isDevelopment ? "Some error, please try again." : err.message;

        // Send error back to client:
        response.status(status).send(message);
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        next(new NotFoundError(`Route ${request.originalUrl} not found.`));
    }
}

export const errorMiddleware = new ErrorMiddleware();
