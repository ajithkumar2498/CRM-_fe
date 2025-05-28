import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosService from "../../utils/axiosService";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createContact.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.error = action.payload;
      })

      //  UPDATE
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c._id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

//GET all contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await AxiosService.get("/contact/allcontacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch contacts");
    }
  }
);

// Add new contact
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await AxiosService.post("/contact/addcontact", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to create contact");
    }
  }
);

// update contact
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
       const token = sessionStorage.getItem("token");
      const res = await AxiosService.put(`/contact/edit/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to update contact");
    }
  }
);

// DELETE contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      await AxiosService.delete(`/contact/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to delete contact");
    }
  }
);



export default contactSlice.reducer;
