import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api.js";
import { toast } from "react-toastify";

export const getTodayDiary = createAsyncThunk(
  "userDiary/getTodayDiary",
  async (_, thunkAPI) => {
    try {
      const todayDate = new Date(new Date.getTime() + 3 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
        .toString();
      console.log("Fetching diary for today:", todayDate);
      const response = await api.get(`calorie/private/${todayDate}/all`);
      if (response.status === 200) {
        return { date: todayDate, data: response.data.data };
      } else {
        toast.error("Failed to fetch today's diary");
        return thunkAPI.rejectWithValue("Failed to fetch today's diary");
      }
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
      console.log(
        "Fetching diary for selected date:",
        selectedDate.toISOString().split("T")[0]
      );
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const currentState = thunkAPI.getState().selectedDate;
      if (currentState === formattedDate) {
        return thunkAPI.dispatch(getTodayDiary());
      } else {
        const response = await api.get(`calorie/private/${formattedDate}/all`);
        if (response.status === 200) {
          return { date: formattedDate, data: response.data.data };
        } else {
          toast.error("Failed to fetch selected date's diary");
        }
      }
    } catch (error) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      toast.warning("Failed to fetch selected date's diary");
      console.error("Error fetching selected date's diary:", error);
      return thunkAPI.rejectWithValue({ date: formattedDate });
    }
  }
);

export const calculator = createAsyncThunk(
  "userDiary/calculator",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/calorie/private", {
        userData: formData,
      });
      if (response.status === 201) {
        toast.success("Calculator data submitted successfully");
        return response.data.data;
      } else {
        toast.error("Failed to submit calculator data");
        return thunkAPI.rejectWithValue("Failed to submit calculator data");
      }
    } catch (error) {
      toast.warning("Failed to submit calculator data");
      console.error("Error submitting calculator data:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "userDiary/addProduct",
  async ({ name, weight }, thunkAPI) => {
    try {
      const sDate = thunkAPI.getState().userDiary.selectedDate;
      const response = await api.post("/calorie/private/" + sDate + "/add", {
        name,
        weight,
      });
      if (response.status === 201) {
        toast.success("Product added successfully");
        thunkAPI.dispatch(getSelectedDateDiary(sDate));
        return response.data.data;
      } else {
        toast.error("Failed to add product");
        return thunkAPI.rejectWithValue("Failed to add product");
      }
    } catch (error) {
      toast.warning("Failed to add product");
      console.error("Error adding product:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "userDiary/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const sDate = thunkAPI.getState().userDiary.selectedDate;
      const response = await api.delete(
        `/calorie/private/${sDate}/delete/${productId}`
      );
      if (response.status === 204) {
        toast.success("Product deleted successfully");
        thunkAPI.dispatch(getSelectedDateDiary(sDate));
        return productId;
      } else {
        toast.error("Failed to delete product");
        return thunkAPI.rejectWithValue("Failed to delete product");
      }
    } catch (error) {
      toast.warning("Failed to delete product");
      console.error("Error deleting product:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
