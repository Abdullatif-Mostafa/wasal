// "use strict";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wasal-api-production.up.railway.app";
const API_URL = process.env.REACT_APP_API_URL ||"https://wasal-api-production.up.railway.app";
console.log("API_URL in userSlice", API_URL);
// Get all users
export const getAllUsersAsync = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    const fetchWithRetry = async (retries = 3, delay = 2000) => {
      try {
        const res = await fetch(`${API_URL}/api/users`);
        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
          throw new Error(data?.data?.message || 'فشل جلب المستخدمين');
        }

        return data.data; // البيانات الحقيقية من السيرفر
      } catch (error) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(retries - 1, delay);
        } else {
          return thunkAPI.rejectWithValue(
            'تعذر تحميل المستخدمين بعد عدة محاولات، تأكد من الاتصال بالإنترنت'
          );
        }
      }
    };

    return await fetchWithRetry();
  }
);
// Get user by id
export const getUserByIdAsync = createAsyncThunk(
  'users/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${userId}`);
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل جلب المستخدم');
      }
      console.log("user from useSlice -=-=---=", data.data);
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
    console.log("userData in editUserByIdAsync", userData);
    console.log("userData.id in editUserByIdAsync", userData._id);
    try {
      // const res = await fetch(`${API_URL}/api/users/${userData.id}`, {
      const res = await fetch(`http://localhost:4000/api/users/${userData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${localStorage?.getItem('token')}`
                },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل تعديل المستخدم');
      }
      console.log("user from useSlice -=-=---=", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue('فشل تعديل المستخدم');
    }
  }
);
// change my password
export const changeMyPasswordAsync = createAsyncThunk(
  'users/changeMyPassword',
  async (passwordData, { rejectWithValue }) => {
    const { oldPassword, newPassword } = passwordData;
    console.log("oldPassword , newPassword  ", oldPassword, newPassword);
    console.log("token in change my password", localStorage.getItem('token'));
    try {
      const res = await fetch(`${API_URL}/api/users/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage?.getItem('token')}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      console.log("data in change my password", data)

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data?.message || 'فشل تغيير كلمة المرور');
      }
      return data;
    } catch (error) {
      return rejectWithValue('فشل تغيير كلمة المرور');
    }
  }
)
// Delete user by id
export const deleteUserByIdAsync = createAsyncThunk(
  'users/deleteUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${userId}`, {
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      console.log("data in delete my account", data)
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
        state.error = null;
        console.log("action.payload in getUserByIdAsync", action.payload)
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
      // Change my password
      .addCase(changeMyPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeMyPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Password change success:", action.payload.message);
      })
      .addCase(changeMyPasswordAsync.rejected, (state, action) => {
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
        console.log(" action payload ", action)
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

