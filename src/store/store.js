import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    search: searchReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
