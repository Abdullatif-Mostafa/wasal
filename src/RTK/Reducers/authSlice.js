import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wasal-api-production.up.railway.app"  ;
const API_URL = process.env.REACT_APP_API_URL ||"https://wasal-api-production.up.railway.app";
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
      const res = await fetch(`${API_URL}/api/auth/register}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        return rejectWithValue(data.data?.message || 'فشل إنشاء الحساب');
      }

      // تخزين البيانات في localStorage
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
    // ✅ تحميل بيانات المستخدم من localStorage عند بدء التطبيق
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
      });
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
