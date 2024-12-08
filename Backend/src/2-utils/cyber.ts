import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import { appConfig } from "./app-config";

class Cyber {
    public getNewToken(user: UserModel): string {
        delete user.password;
        const payload = { user };
        const options: SignOptions = { expiresIn: "3h" }; // Token expires in 3 hours
        const token = jwt.sign(payload,appConfig.jwtPassword, options);
        return token;
    }

    public validateToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token,appConfig.jwtPassword); // Verify token
            return true;
        } catch (err: any) {
            return false; // Return false if verification fails
        }
    }

    public decodeToken(token: string): { id: number; roleId: number } | null {
        try {
            const payload = jwt.verify(token, appConfig.jwtPassword) as { user: UserModel };
            return { id: payload.user.id, roleId: payload.user.roleId }; // Return decoded payload
        } catch (error) {
            return null; // Return null if the token is invalid
        }
    }
}

export const cyber = new Cyber();