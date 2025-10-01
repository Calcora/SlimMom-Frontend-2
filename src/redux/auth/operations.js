import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    console.log("Login User dispatched");
    try {
      // Mock response since no backend
      const mockResponse = {
        token: "mock-jwt-token",
        user: { email: _.email },
      };
      console.log("Mock login response:", mockResponse);
      toast.success("Login successful ✔");
      window.location.replace("/diary");
      return mockResponse;
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    console.log("Logout User dispatched");
    return thunkAPI.fulfillWithValue();
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (_, thunkAPI) => {
    console.log("Register User dispatched");
    try {
      // Mock response since no backend
      const mockResponse = {
        token: "mock-jwt-token",
        user: { email: _.email },
      };
      console.log("Mock registration response:", mockResponse);
      thunkAPI.dispatch(loginUser({ email: _.email, password: _.password }));
      return mockResponse;
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
