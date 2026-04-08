import { createSlice } from '@reduxjs/toolkit';
import { MOCK_USER_DATA } from '../../data/constants';

const initialState = MOCK_USER_DATA;

const userPanelSlice = createSlice({
  name: 'userPanel',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    sendMessage: (state, action) => {
      // Logic for adding a message to a chat could go here
    },
    addTicket: (state, action) => {
      state.tickets.unshift(action.payload);
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.unread = false);
    },
    toggleSetting: (state, action) => {
      const key = action.payload;
      state.settings[key] = !state.settings[key];
    }
  }
});

export const { 
  updateProfile, 
  sendMessage, 
  addTicket, 
  markAllNotificationsRead, 
  toggleSetting 
} = userPanelSlice.actions;

export default userPanelSlice.reducer;
