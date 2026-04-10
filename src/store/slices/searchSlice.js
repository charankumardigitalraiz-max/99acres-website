import { createSlice } from '@reduxjs/toolkit';
import { propertiesData } from '../../data/propertiesData';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    activeTab: 'Buy',
    location: '',
    query: '',
    suggestions: [],
    recentSearches: [],
    locStatus: 'idle',
    propertyType: 'All Residential',
    propertyCategory: '',
    minBudget: '',
    maxBudget: '',
    bhk: [],
    furnishing: '',
    postedBy: '',
    possessionStatus: '',
    showAdvancedFilters: false,
  },
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
      state.bhk = [];
      state.minBudget = '';
      state.maxBudget = '';
      state.propertyType = 'All Residential';
    },
    setLocation(state, action) {
      state.location = action.payload;
      state.query = '';
      // Save to recent
      if (action.payload && !state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches].slice(0, 5);
      }
    },
    setQuery(state, action) {
      const query = action.payload;
      state.query = query;
      state.location = '';

      if (!query || query.length < 2) {
        state.suggestions = [];
        return;
      }

      const lowerQuery = query.toLowerCase();
      const matchMap = new Map();

      propertiesData.forEach(p => {
        if (p.city?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(p.city)) matchMap.set(p.city, { type: 'city', text: p.city });
        }
        const localityText = `${p.location.locality}, ${p.city}`;
        if (p.location?.locality?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(localityText)) matchMap.set(localityText, { type: 'locality', text: localityText });
        }
        const projectText = `${p.location.projectName} (${p.location.locality})`;
        if (p.location?.projectName?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(projectText)) matchMap.set(projectText, { type: 'project', text: projectText });
        }
        if (p.title?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(p.title)) matchMap.set(p.title, { type: 'property', text: p.title });
        }
        if (p.propertyType?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(p.propertyType)) matchMap.set(p.propertyType, { type: 'type', text: p.propertyType });
        }
      });

      state.suggestions = Array.from(matchMap.values()).slice(0, 8);
    },
    clearSuggestions(state) {
      state.suggestions = [];
      state.query = '';
    },
    setLocStatus(state, action) {
      state.locStatus = action.payload;
    },
    setPropertyType(state, action) {
      state.propertyType = action.payload;
    },
    setPropertyCategory(state, action) {
      state.propertyCategory = action.payload;
    },
    setMinBudget(state, action) {
      state.minBudget = action.payload;
    },
    setMaxBudget(state, action) {
      state.maxBudget = action.payload;
    },
    toggleBhk(state, action) {
      const val = action.payload;
      if (state.bhk.includes(val)) {
        state.bhk = state.bhk.filter(b => b !== val);
      } else {
        state.bhk = [...state.bhk, val];
      }
    },
    setBhk(state, action) {
      state.bhk = action.payload;
    },
    setFurnishing(state, action) {
      state.furnishing = action.payload;
    },
    setPostedBy(state, action) {
      state.postedBy = action.payload;
    },
    setPossessionStatus(state, action) {
      state.possessionStatus = action.payload;
    },
    toggleAdvancedFilters(state) {
      state.showAdvancedFilters = !state.showAdvancedFilters;
    },
    setShowAdvancedFilters(state, action) {
      state.showAdvancedFilters = action.payload;
    },
    resetAllFilters(state) {
      state.bhk = [];
      state.minBudget = '';
      state.maxBudget = '';
      state.furnishing = '';
      state.postedBy = '';
      state.possessionStatus = '';
      state.propertyCategory = '';
      state.propertyType = 'All Residential';
      state.showAdvancedFilters = false;
    },
    setBudget(state, action) {
      state.minBudget = action.payload;
    },
  },
});

export const {
  setActiveTab, setLocation, setQuery, clearSuggestions,
  setLocStatus, setPropertyType, setPropertyCategory,
  setMinBudget, setMaxBudget, toggleBhk, setBhk,
  setFurnishing, setPostedBy, setPossessionStatus,
  toggleAdvancedFilters, setShowAdvancedFilters, resetAllFilters,
  setBudget,
} = searchSlice.actions;

export default searchSlice.reducer;
