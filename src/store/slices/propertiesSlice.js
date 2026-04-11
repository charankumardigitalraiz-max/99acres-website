import { createSlice } from '@reduxjs/toolkit';
import { propertiesData } from '../../data/propertiesData';
import { CITIES } from '../../data/constants';

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    buyProperties: propertiesData.filter(p => p.purpose === 'selling'),
    rentProperties: propertiesData.filter(p => p.purpose === 'renting'),
    highRated: propertiesData.slice(0, 10), // Expanded for "View All"
    featured: propertiesData.filter(p => p.pricing?.expectedPrice > 50000000).slice(0, 8), // Premium listings
    landProperties: propertiesData.filter(p => p.propertyType === 'Plots' || p.propertyType === 'Lands'),
    cities: CITIES,
    hydLocalities: propertiesData.filter(p => p.city === 'Hyderabad'),
    wishlist: [],
  },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      state.wishlist = state.wishlist.includes(id)
        ? state.wishlist.filter(w => w !== id)
        : [...state.wishlist, id];
    },
  },
});

export const { toggleWishlist } = propertiesSlice.actions;
export default propertiesSlice.reducer;
