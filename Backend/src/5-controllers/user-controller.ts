import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { CredentialsModel } from "../3-models/credentials-model";

class UserController {

    public readonly router = express.Router();
    public constructor() {
        this.router.post("/register",this.register);
        this.router.post("/login",this.login);
        this.router.get("/users",this.getAllUsers);
        this.router.post("/request-partner", this.requestPartner);
        this.router.post("/respond-request", this.respondToRequest);
        this.router.get("/users/pending-requests/:userId", this.getPendingRequests);
        this.router.get("/users/:userId", this.getUserDetails); 

    }
    public async getUserDetails(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = Number(request.params.userId);
            const user = await userService.getUserDetails(userId);
            response.json(user);
        } catch (err: any) {
            next(err);
        }
    }


    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = new UserModel(request.body);
            const token = await userService.register(user);
            response.json(token);
        } catch (err: any) { next(err) };
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await userService.login(credentials);
            response.json(token);
        } catch (err: any) { next(err) };
    }

    public async getAllUsers(request: Request, response: Response, next: NextFunction){
        try{
            const users = await userService.getAllUsers();
            response.json(users);

        }catch (err: any) { next(err) };
    }

    public async requestPartner(request: Request, response: Response, next: NextFunction) {
        try {
            const { requesterId, receiverEmail } = request.body;
            const message = await userService.requestPartner(requesterId, receiverEmail);
            response.json({ message });
        } catch (err: any) { next(err); }
    }

    public async respondToRequest(request: Request, response: Response, next: NextFunction) {
        try {
            const { requestId, approved } = request.body;
    
            console.log("Responding to partner request:", requestId, "Approved:", approved); // Debug log
    
            const message = await userService.respondToRequest(requestId, approved);
            console.log("Response from service:", message); // Debug log
    
            response.json({ message });
        } catch (err: any) {
            console.error("Error in respondToRequest controller:", err); // Debug log for errors
            next(err);
        }
    }
    

    public async getPendingRequests(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = Number(request.params.userId); // Extract userId from params
            const requests = await userService.getPendingRequests(userId); // Implement this function in userService
            response.json(requests);
        } catch (err: any) {
            next(err);
        }
    }
    

    
}

export const userController = new UserController();