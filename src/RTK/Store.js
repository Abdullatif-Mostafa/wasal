import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userSlice';
import postReducer from './Reducers/postSlice';
import authReducer from './Reducers/authSlice';
// /e:/chatapp/src/RTK/Store.js

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        auth: authReducer,
    },
});

export default store;