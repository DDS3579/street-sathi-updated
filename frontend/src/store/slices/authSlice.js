// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password, userType }, { rejectWithValue }) => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockUsers = {
//         'admin@street.com': { id: 1, role: 'admin', name: 'Thara Bhai Admin' },
//         'divyadarsheel.dds@gmail.com': { id: 2, role: 'user', name: 'Divya Darsheel Sharma' },
//         'marescuerho@gmail.com': { id: 3, role: 'rescuer', name: 'Thara Bhai Rescuer' },
//       };

//       const user = mockUsers[email.toLowerCase()];
      
//       if (!user || password !== 'projecthobhai123') {
//         throw new Error('Bhaena babu feri gar tw');
//       }

//       return {
//         token: `mock-token-${user.role}-${user.id}`,
//         user,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     isLoading: false,
//     error: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, userType }, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;