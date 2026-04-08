import { createSlice } from '@reduxjs/toolkit';
import { propertiesData } from '../../data/propertiesData';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    activeTab: 0,
    location: '',
    query: '',
    suggestions: [],
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
    setQuery(state, action) {
      const query = action.payload;
      state.query = query;
      // Clear selected location to prevent fallback when query is cleared
      state.location = '';

      if (!query || query.length < 2) {
        state.suggestions = [];
        return;
      }

      const lowerQuery = query.toLowerCase();
      const matchMap = new Map();

      propertiesData.forEach(p => {
        // 1. Collect Cities
        if (p.city?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(p.city)) {
            matchMap.set(p.city, { type: 'city', text: p.city });
          }
        }

        // 2. Collect Localities
        const localityText = `${p.location.locality}, ${p.city}`;
        if (p.location?.locality?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(localityText)) {
            matchMap.set(localityText, { type: 'locality', text: localityText });
          }
        }

        // 3. Collect Project Names
        const projectText = `${p.location.projectName} (${p.location.locality})`;
        if (p.location?.projectName?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(projectText)) {
            matchMap.set(projectText, { type: 'project', text: projectText });
          }
        }

        // 4. Collect Property Titles (Names)
        if (p.title?.toLowerCase().includes(lowerQuery)) {
          if (!matchMap.has(p.title)) {
            matchMap.set(p.title, { type: 'property', text: p.title });
          }
        }

        // 5. Collect Property Types
        if (p.propertyType?.toLowerCase().includes(lowerQuery)) {
          const typeText = p.propertyType;
          if (!matchMap.has(typeText)) {
            matchMap.set(typeText, { type: 'type', text: typeText });
          }
        }
      });

      // Convert Map values to Array and limit results
      state.suggestions = Array.from(matchMap.values()).slice(0, 10);
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
    setBudget(state, action) {
      state.budget = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setLocation,
  setQuery,
  clearSuggestions,
  setLocStatus,
  setPropertyType,
  setBudget,
} = searchSlice.actions;

export default searchSlice.reducer;
