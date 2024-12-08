import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import { expenseActions } from "../Redux/ExpenseSlice";
import { store } from "../Redux/Store";
import { userActions } from "../Redux/UserSlice";
import { appConfig } from "../Utils/appConfig";

class UserService {

    public constructor() {
        const token = sessionStorage.getItem("token");

        if (!token) return;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        this.initUser(token);

    }

    public async register(user: UserModel) {

        const response = await axios.post<string>(appConfig.register, user);
        const token = response.data;


        this.initUser(token);

        sessionStorage.setItem("token", token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    public async login(Credentials: CredentialsModel) {
        console.log('Logging in with:', Credentials);
        const response = await axios.post<string>(appConfig.login, Credentials);

        const token = response.data;

        this.initUser(token);

        //save token:
        sessionStorage.setItem("token", token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        store.dispatch(expenseActions.initExpenses());
    }

    public getUserIdFromToken(): number | null {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode<{ user: UserModel }>(token);
            return decodedToken.user.id; 
           

        }
        return null;
    }

    public getPartnerId(): number{
       const token = sessionStorage.getItem("token");
       if(token){
        const decodedToken = jwtDecode<{user: UserModel}>(token);
        return decodedToken.user.partnerId;
       }
    }

    public logout() {
        const action = userActions.logoutUser();
        store.dispatch(action);
        store.dispatch(expenseActions.initExpenses([]));
        sessionStorage.clear();
        
    }

    private initUser(token: string): void {

        const container = jwtDecode<{ user: UserModel }>(token)
        const dbUser = container.user;
        const action = userActions.initUser(dbUser)
        store.dispatch(action)

    }

    public async getAllUsers(): Promise<UserModel[]>{
        const response = await axios.get(appConfig.users);
        const users = response.data;
        return users;

    }
    public async getUserDetails(userId: number): Promise<any> {
        try {
            const response = await axios.get(`${appConfig.users}/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user details", error);
            throw new Error("Unable to retrieve user details.");
        }
    }

    /**
     * Sends a partner request by email.
     * @param {string} email - The email of the user to be added as a partner.
     * @returns {Promise<string>} - Returns a success message if the request is sent.
     */
    public async requestPartner(email: string): Promise<string> {
        const requesterId = this.getUserIdFromToken();
        if (!requesterId) throw new Error("User is not logged in.");
   
        try {
            const response = await axios.post(appConfig.requestPartner, {
                requesterId,
                receiverEmail: email,
            });
            return response.data.message; // Return success message to notify
        } catch (error: any) {
            console.error("Error while sending request: ", error);
            throw new Error(error.response?.data?.message || "Failed to send request.");
        }
    }
   

    /**
     * Responds to a partner request (approve or reject).
     * @param {number} requestId - The ID of the partner request.
     * @param {boolean} approved - Whether the request is approved (true) or rejected (false).
     * @returns {Promise<string>} - Returns a success message indicating the result.
     */
    public async respondToRequest(requestId: number, approved: boolean): Promise<string> {
        const response = await axios.post(appConfig.respondRequest, {
            requestId,
            approved,
        });

        return response.data.message;
    }

     /**
     * Fetches pending partner requests for the logged-in user.
     * @param {number} userId - The ID of the logged-in user.
     * @returns {Promise<any[]>} - Returns an array of pending requests.
     */
     public async getPendingRequests(userId: number): Promise<any[]> {
        const response = await axios.get(`${appConfig.users}/pending-requests/${userId}`);
        return response.data;
    }

     /**
     * Fetches the status of the most recent partner request for the logged-in user.
     * @param {number} userId - The ID of the logged-in user.
     * @returns {Promise<any>} - Returns the status of the latest partner request.
     */
     public async getRequestStatus(userId: number): Promise<any> {
        const response = await axios.get(`${appConfig.requestStatus}/${userId}`);
        return response.data;
    }

}

export const userService = new UserService();