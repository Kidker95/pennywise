import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber"; // Import the cyber utility
import jwt from 'jsonwebtoken'; // Make sure this import is present
import { UnauthorizedError } from "../3-models/error-model";
import striptags from "striptags";
import { appConfig } from "../2-utils/app-config";

class SecurityMiddleware {

    public validateToken(request: Request, response: Response, next: NextFunction): void {
        const header = request.headers.authorization;
        
        // Extract token from the Authorization header
        const token = header?.substring(7); // Assumes format: "Bearer <token>"

        // Validate the token
        if (!token || !cyber.validateToken(token)) {
            next(new UnauthorizedError("You are not logged-in")); 
            return;
        }

        try {
            // Verify the token and extract the payload
            const payload = jwt.verify(token, appConfig.jwtPassword) as { user: { id: number } };
            // Set user ID in the request object
            request.user = { id: payload.user.id }; // Now you can access request.user.id
            next();
        } catch (err) {
            next(new UnauthorizedError("Invalid token"));
        }
    }

    public preventXssAttack(request: Request, response: Response, next: NextFunction): void {
        // Strip out any potentially harmful scripts from the request body
        for (const prop in request.body) {
            const value = request.body[prop];
            if (typeof value === "string") {
                request.body[prop] = striptags(value);
            }
        }
        next();
    }
}

export const securityMiddleware = new SecurityMiddleware();