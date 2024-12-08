import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credentials-model";
import { RoleModel } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { cyber } from "../2-utils/cyber";
import { Request } from "express";

class UserService {

    public async getAllUsers(): Promise<UserModel[]> {
        const sql = "select * from users";
        const users = await dal.execute(sql);
        return users;
    }

    public async register(user: UserModel): Promise<string> {
        user.validateInsert();
        user.roleId = RoleModel.User;
        //hash
        const sql = `insert into users(firstName,lastName,email,password,roleId) values(?,?,?,?,?)`
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];
        const userParams: OkPacketParams = await dal.execute(sql, values);
        user.id = userParams.insertId;
        const token = cyber.getNewToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.validateLogin();
        //hash
        const sql = `select * from users where email = ? and password = ?`;
        const values = [credentials.email, credentials.password];
        const users = await dal.execute(sql, values);
        const user = users[0];
        const token = cyber.getNewToken(user);
        return token;
    }

    public async getRequestById(requestId: number): Promise<any> {
        const sql = `SELECT * FROM partnerRequests WHERE id = ?`;
        const requests = await dal.execute(sql, [requestId]);
        return requests[0]; // Return the first (and should be only) result
    }

    public async requestPartner(requesterId: number, receiverEmail: string): Promise<string> {
        // Find receiver by email
        const sql = "SELECT * FROM users WHERE email = ?";
        const users = await dal.execute(sql, [receiverEmail]);
        const receiver = users[0];
    
        if (!receiver) {
            throw new Error("User not found");
        }
    
        // Check if either user already has a partner
        const requesterPartnerCheck = await dal.execute("SELECT partnerId FROM users WHERE id = ?", [requesterId]);
        const receiverPartnerCheck = await dal.execute("SELECT partnerId FROM users WHERE id = ?", [receiver.id]);
    
        if (requesterPartnerCheck[0].partnerId || receiverPartnerCheck[0].partnerId) {
            throw new Error("One or both users already have a partner.");
        }
    
        // Insert the partner request with "pending" status
        const requestSql = `INSERT INTO partnerRequests (requesterId, receiverId, requestStatus) VALUES (?, ?, ?)`;
        const values = [requesterId, receiver.id, "pending"];
        const result = await dal.execute(requestSql, values);
    
        console.log("Inserted partner request:", result); // Debug log
    
        return "Request sent!";
    }
    

    public async respondToRequest(requestId: number, approved: boolean): Promise<string> {
        console.log("Received request to respond to partner request with ID:", requestId, "Approved:", approved); // Debug log
    
        const request = await this.getRequestById(requestId);
        if (!request) throw new Error("Request not found.");
    
    
        if (request.requestStatus === 'approved' || request.requestStatus === 'rejected') {
            throw new Error("Request has already been processed.");
        }
    
        if (approved) {
            const requester = await dal.execute("SELECT partnerId FROM users WHERE id = ?", [request.requesterId]);
            const receiver = await dal.execute("SELECT partnerId FROM users WHERE id = ?", [request.receiverId]);
    
            if (requester[0].partnerId || receiver[0].partnerId) {
                throw new Error("One or both users already have a partner.");
            }
    
            await dal.execute(`UPDATE users SET partnerId = ? WHERE id = ?`, [request.receiverId, request.requesterId]);
            await dal.execute(`UPDATE users SET partnerId = ? WHERE id = ?`, [request.requesterId, request.receiverId]);
    
            await dal.execute(`UPDATE partnerRequests SET requestStatus = 'approved' WHERE id = ?`, [requestId]);
    
            return "Partner request accepted!";
        } else {
            await dal.execute(`UPDATE partnerRequests SET requestStatus = 'rejected' WHERE id = ?`, [requestId]);
    
            return "Partner request rejected.";
        }
    }
    
    

    public async getUserDetails(userId: number): Promise<UserModel> {
        const sql = `SELECT id, firstName, lastName, email, partnerId FROM users WHERE id = ?`;
        const users = await dal.execute(sql, [userId]);

        const user = users[0];
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
    
    public getUserIdFromToken(request: Request): number | null {
        const token = request.headers["authorization"]?.split(" ")[1]; // Get the token from headers
        if (!token) throw new Error("Token not provided");

        const decoded = cyber.decodeToken(token); // Use the Cyber class to decode the token
        if (!decoded) throw new Error("Invalid token");

        return decoded.id; // Return the user ID from the decoded token
    }

    public async getPendingRequests(userId: number): Promise<any[]> {
        const sql = `
            SELECT pr.*, u.firstName as requesterName, u.lastName as requesterLastName 
            FROM partnerRequests pr
            JOIN users u ON pr.requesterId = u.id
            WHERE pr.receiverId = ? AND pr.requestStatus = 'pending'
        `;
        const requests = await dal.execute(sql, [userId]);
    
        console.log("Pending requests found:", requests); // Debug log
    
        return requests;
    }
    


}

export const userService = new UserService();
