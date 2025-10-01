import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getTodayDiary = createAsyncThunk(
  "userDiary/getTodayDiary",
  async (_, thunkAPI) => {
    try {
      const todayDate = new Date().toISOString().split("T")[0].toString();
      // Mock response since no backend
      const mockData = {
        left: 1500,
        consumed: 500,
        dailyRate: 2000,
        nOfNormal: 25,
        notAllowedProducts: ["Sugar", "Fatty foods"],
      };
      console.log("Mock today's diary:", mockData);
      return { date: todayDate, data: mockData };
    } catch (error) {
      toast.warning("Failed to fetch today's diary");
      console.error("Error fetching today's diary:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSelectedDateDiary = createAsyncThunk(
  "userDiary/getSelectedDateDiary",
  async (selectedDate, thunkAPI) => {
    try {
      // Mock response since no backend
      const mockData = {
        left: 1500,
        consumed: 500,
        dailyRate: 2000,
        nOfNormal: 25,
        notAllowedProducts: ["Sugar", "Fatty foods"],
      };
      console.log("Mock selected date diary:", mockData);
      return { date: selectedDate, data: mockData };
    } catch (error) {
      toast.warning("Failed to fetch selected date's diary");
      console.error("Error fetching selected date's diary:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const calculator = createAsyncThunk(
  "userDiary/calculator",
  async (formData, thunkAPI) => {
    try {
      // Mock response since no backend
      const mockData = {
        left: 1500,
        consumed: 500,
        dailyRate: 2000,
        nOfNormal: 25,
        notAllowedProducts: ["Sugar", "Fatty foods"],
      };
      console.log("Mock calculator data:", mockData);
      toast.success("Calculator data submitted successfully");
      thunkAPI.dispatch(getTodayDiary());
      return mockData;
    } catch (error) {
      toast.warning("Failed to submit calculator data");
      console.error("Error submitting calculator data:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
