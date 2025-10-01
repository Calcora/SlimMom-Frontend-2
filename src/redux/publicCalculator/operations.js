import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const publicCalculator = createAsyncThunk(
  "publicCalculator/calculator",
  async (_, thunkAPI) => {
    try {
      // Mock response since no backend
      const mockResponse = {
        calorie: 2000,
        notAllowedProducts: ["Sugar", "Fatty foods", "Processed meats"],
      };
      console.log(
        "Mock response from publicCalculator operation:",
        mockResponse
      );
      toast.success("Calculation successful ✔");
      return mockResponse;
    } catch (error) {
      console.error("Error in publicCalculator operation:", error);
      toast.error("Calculator: " + error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
