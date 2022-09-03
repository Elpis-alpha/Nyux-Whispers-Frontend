import { createSlice } from '@reduxjs/toolkit'


const displaySlice = createSlice({

  name: "display",

  initialState: {

    theme: 'Auto',

    showNav: true,

    revealView: false,

  },

  reducers: {

    setShowNav: (state, { payload }) => {

      state.showNav = payload

    },

    setRevealView: (state, { payload }) => {

      state.revealView = payload

    },

    setTheme: (state, { payload }) => {

      state.theme = payload

    },

  }

})

export default displaySlice.reducer;

export const { setShowNav, setRevealView, setTheme } = displaySlice.actions
