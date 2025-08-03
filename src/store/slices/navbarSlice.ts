// src/store/slices/navbarSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavbarState {
  // глобальные переключатели для дропдаунов в шапке (мобайл)
  isCartOpen: boolean;
  isSearchOpen: boolean;

  // флаги анимаций бейджа/цены (используются и в мобайл, и в десктопе)
  animateBadge: boolean;
  animatePrice: boolean;
}

const initialState: NavbarState = {
  isCartOpen: false,
  isSearchOpen: false,
  animateBadge: false,
  animatePrice: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    // cart
    openCart(state) {
      state.isCartOpen = true;
      state.isSearchOpen = false;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
      state.isSearchOpen = false;
    },

    // search
    openSearch(state) {
      state.isSearchOpen = true;
      state.isCartOpen = false;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
      state.isCartOpen = false;
    },

    // utility
    closeAll(state) {
      state.isCartOpen = false;
      state.isSearchOpen = false;
    },

    // animations
    setAnimateBadge(state, action: PayloadAction<boolean>) {
      state.animateBadge = action.payload;
    },
    setAnimatePrice(state, action: PayloadAction<boolean>) {
      state.animatePrice = action.payload;
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  openSearch,
  closeSearch,
  toggleSearch,
  closeAll,
  setAnimateBadge,
  setAnimatePrice,
} = navbarSlice.actions;

export default navbarSlice.reducer;
