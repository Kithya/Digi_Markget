import { createSlice } from "@reduxjs/toolkit";
import { dummyListings } from "../../assets/assets";

export const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: dummyListings,
    userListings: dummyListings,
    balance: {
      earned: 0,
      withdrawn: 0,
      available: 0,
    },
  },
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
    addListing: (state, action) => {
      state.value.push(action.payload);
    },
    removeListing: (state, action) => {
      state.value = state.value.filter(
        (listing) => listing.id !== action.payload,
      );
    },
    updateListing: (state, action) => {
      const { id, title, description, price, category, image } = action.payload;
      const listingToUpdate = state.value.find((listing) => listing.id === id);
      if (listingToUpdate) {
        listingToUpdate.title = title;
        listingToUpdate.description = description;
        listingToUpdate.price = price;
        listingToUpdate.category = category;
        listingToUpdate.image = image;
      }
    },
  },
});

export const { setListings, addListing, removeListing, updateListing } =
  listingSlice.actions;
export default listingSlice.reducer;
