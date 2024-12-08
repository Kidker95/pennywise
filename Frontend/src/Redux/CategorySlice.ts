import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel } from "../Models/CategoryModel";

const initialCategoryState: CategoryModel[] = [];

export function initCategory(currentState: CategoryModel[], action: PayloadAction<CategoryModel[]>): CategoryModel[] {
    return action.payload;
}

export const categorySlice = createSlice({
    name: "categories",
    initialState: initialCategoryState,
    reducers: { initCategory }
});

// Export category actions and reducer
export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
