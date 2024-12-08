import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CredentialsModel } from "../Models/CredentialsModel";

// Initial state based on the CredentialsModel
const initialState: CredentialsModel = {
    email: "",
    password: ""
};

// Create the credentials slice with relevant actions
export const credentialsSlice = createSlice({
    name: "credentials",
    initialState,
    reducers: {
        // Action to set credentials
        setCredentials: (state, action: PayloadAction<CredentialsModel>) => {
            return action.payload;
        },
        // Action to clear credentials (reset to initial state)
        clearCredentials: () => initialState
    }
});

// Export actions for dispatching in components
export const credentialsActions = credentialsSlice.actions;

// Export the reducer to use in the store
export default credentialsSlice.reducer;
