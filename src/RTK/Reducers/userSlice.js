// "use strict";
"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Get all users
export const getAllUsersAsync = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:4000/api/users');
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل جلب المستخدمين');
      }
      return data.data;
    } catch (error) {
      return rejectWithValue('فشل جلب المستخدمين');
    }
  }
);

// Get user by id
export const getUserByIdAsync = createAsyncThunk(
  'users/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`);
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل جلب المستخدم');
      }
      return data.data;
    } catch (error) {
      return rejectWithValue('فشل جلب المستخدم');
    }
  }
);

// Edit user by id
export const editUserByIdAsync = createAsyncThunk(
  'users/editUserById',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل تعديل المستخدم');
      }
      return data.data;
    } catch (error) {
      return rejectWithValue('فشل تعديل المستخدم');
    }
  }
);

// Delete user by id
export const deleteUserByIdAsync = createAsyncThunk(
  'users/deleteUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل حذف المستخدم');
      }
      return userId;
    } catch (error) {
      return rejectWithValue('فشل حذف المستخدم');
    }
  }
);
// delete my account
export const deleteMyAccountAsync = createAsyncThunk(
  'users/deleteMyAccount',
  async ( _, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:4000/api/users/me', {
        method: 'DELETE',
        headers:{ 'Authorization': `Bearer ${localStorage.getItem('token')}`  }
      });
      const data = await res.json();
      console.log("data in delete my account",data)
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data?.message || 'فشل حذف الحساب');
      }
      return data;
    } catch (error) {
      return rejectWithValue('فشل حذف الحساب');
    }
  }
);
const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all users
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get user by ID
      .addCase(getUserByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedUser = null;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedUser = null;
      })
      // Edit user by ID
      .addCase(editUserByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the users array
        state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
        if (state.selectedUser && state.selectedUser._id === action.payload._id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(editUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user by ID
      .addCase(deleteUserByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        if (state.selectedUser && state.selectedUser._id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete my account
      .addCase(deleteMyAccountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMyAccountAsync.fulfilled, (state, action) => {
        console.log(" action payload ",action)
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        if (state.selectedUser && state.selectedUser._id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteMyAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  


      
            
    
  },
});

export default userSlice.reducer;

