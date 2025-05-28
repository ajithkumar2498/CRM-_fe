import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosService from "../../utils/axiosService";

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("token", token)
      const res = await AxiosService.put("/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
