import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import userPanelReducer from './slices/userPanelSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    search: searchReducer,
    auth: authReducer,
    subscription: subscriptionReducer,
    userPanel: userPanelReducer,
  },
});

export default store;
