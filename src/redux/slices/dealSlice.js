import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosService from "../../utils/axiosService";

// Fetch all deals
export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await AxiosService.get("/deals/alldeals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new deal
export const addDeal = createAsyncThunk(
  "deals/addDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await AxiosService.post("/deals/create", dealData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a deal
export const deleteDeal = createAsyncThunk(
  "deals/deleteDeal",
  async (dealId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      await AxiosService.delete(`/deals/delete/${dealId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dealId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a deal
export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await AxiosService.put(`/deals/edit/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dealSlice = createSlice({
  name: "deals",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((d) => d._id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dealSlice.reducer;
