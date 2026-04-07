import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    activeTab: 0,
    location: '',
    locStatus: 'idle',   // idle | loading | done | error
    propertyType: '',
    budget: '',
  },
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setLocStatus(state, action) {
      state.locStatus = action.payload;
    },
    setPropertyType(state, action) {
      state.propertyType = action.payload;
    },
    setBudget(state, action) {
      state.budget = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setLocation,
  setLocStatus,
  setPropertyType,
  setBudget,
} = searchSlice.actions;

export default searchSlice.reducer;
