import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import AxiosService from "../../utils/axiosService";


// Fetch all companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
      const response = await AxiosService.get("/companies/allcompanies" , 
        { headers: { Authorization: `Bearer ${token}` }},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new company
export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
      const response = await AxiosService.post("/companies/create", companyData,
        { headers: { Authorization: `Bearer ${token}` }},);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a company
export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (companyId, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
      await AxiosService.delete(`/companies/delete/${companyId}` , 
        { headers: { Authorization: `Bearer ${token}` }},);
      return companyId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a company
export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem("token")
      const response = await AxiosService.put(`/companies/edit/${id}`, updatedData, 
        { headers: { Authorization: `Bearer ${token}` }},);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.data = state.data.filter((c) => c._id !== action.payload);
      })

      // update
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
