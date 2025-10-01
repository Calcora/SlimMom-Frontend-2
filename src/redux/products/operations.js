import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      // Mock products since no backend
      const mockProducts = [
        { value: "Eggplant", label: "Eggplant", kcalPer100: 25 },
        { value: "Poultry meat", label: "Poultry meat", kcalPer100: 165 },
        { value: "Bread", label: "Bread", kcalPer100: 265 },
        { value: "Nut", label: "Nut", kcalPer100: 600 },
        { value: "Pork meat", label: "Pork meat", kcalPer100: 242 },
        { value: "Potato", label: "Potato", kcalPer100: 77 },
      ];
      return mockProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
