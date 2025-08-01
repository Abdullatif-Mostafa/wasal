import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wasal-api-production.up.railway.app"  ;
const API_URL = process.env.REACT_APP_API_URL || "https://wasal-api-production.up.railway.app";
// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      console.log("login data", data);
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل تسجيل الدخول');
      }

      // تخزين البيانات في localStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      return {
        token: data.data.token,
        user: data.data.user,
      };

    } catch (error) {
      return rejectWithValue('فشل تسجيل الدخول');
    }
  }
);

// Async thunk for register
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      console.log("register data", data);

      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل إنشاء الحساب');
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      return {
        token: data.data.token,
        user: data.data.user,
      };
    } catch (error) {
      return rejectWithValue('فشل إنشاء الحساب');
    }
  }
);
// forget password
export const forgetPasswordAsync = createAsyncThunk(
  'auth/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/forgetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log("forgetPassword data", data);
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل في إرسال رابط إعادة تعيين كلمة المرور');
      }
      return data.message;
    } catch (error) {
      return rejectWithValue('فشل في إرسال رابط إعادة تعيين كلمة المرور');
    }
  }
);
// reset password
export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    console.log("resetPasswordAsync called with token:", token)
    console.log("newPassword:", newPassword)
    try {
      const res = await fetch(`${API_URL}/api/auth/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      console.log("resetPassword data =====", data);
      console.log("data.message", data.message)
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data?.message || 'فشل في تغيير كلمة المرور');
      }
      return data.message;
    } catch (error) {
      return rejectWithValue('فشل في تغيير كلمة المرور');
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
      const res = await fetch(`${API_URL}/api/auth/changePassword`, {
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
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
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

export const {
  loginSuccess,
  logout,
  setAuthLoading,
  setAuthError,
  loadUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
