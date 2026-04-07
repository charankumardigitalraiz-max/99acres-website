import { createSlice } from '@reduxjs/toolkit';
import { propertiesData } from '../../data/propertiesData';
import { CITIES } from '../../data/constants';

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    buyProperties: propertiesData.filter(p => p.purpose === 'selling'),
    rentProperties: propertiesData.filter(p => p.purpose === 'renting'),
    highRated: propertiesData.slice(0, 4), // Fallback: first 4 as high rated
    landProperties: propertiesData.filter(p => p.propertyType === 'Plots'),
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
