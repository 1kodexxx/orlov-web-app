// src/store/slices/navbarSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavbarState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAccountOpen: boolean;

  animateBadge: boolean;
  animatePrice: boolean;
}

const initialState: NavbarState = {
  isCartOpen: false,
  isSearchOpen: false,
  isAccountOpen: false,

  animateBadge: false,
  animatePrice: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
      if (state.isCartOpen) {
        state.isSearchOpen = false;
        state.isAccountOpen = false;
      }
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
      if (state.isSearchOpen) {
        state.isCartOpen = false;
        state.isAccountOpen = false;
      }
    },
    toggleAccount(state) {
      state.isAccountOpen = !state.isAccountOpen;
      if (state.isAccountOpen) {
        state.isCartOpen = false;
        state.isSearchOpen = false;
      }
    },

    closeCart(state) {
      state.isCartOpen = false;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
    closeAccount(state) {
      state.isAccountOpen = false;
    },
    closeAll(state) {
      state.isCartOpen = false;
      state.isSearchOpen = false;
      state.isAccountOpen = false;
    },

    setAnimateBadge(state, action: PayloadAction<boolean>) {
      state.animateBadge = action.payload;
    },
    setAnimatePrice(state, action: PayloadAction<boolean>) {
      state.animatePrice = action.payload;
    },
  },
});

export const {
  toggleCart,
  toggleSearch,
  toggleAccount,
  closeCart,
  closeSearch,
  closeAccount,
  closeAll,
  setAnimateBadge,
  setAnimatePrice,
} = navbarSlice.actions;

export default navbarSlice.reducer;
