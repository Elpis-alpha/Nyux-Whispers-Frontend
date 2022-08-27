import { createSlice } from '@reduxjs/toolkit'

// Just typescript stress
let a: any = []

const itemSlice = createSlice({

  name: "messages",

  initialState: {

    miniMessage: [...a],

    smallMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      style: undefined

    },

    normalMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      answer: "",

      style: undefined

    },

    XMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      buttons: [],

      answer: "",

      style: undefined

    },

  },

  reducers: {

    addMiniMessage: (state, { payload }) => {

      const existAlready = state.miniMessage.find(msg => msg.id === payload.id)

      if (existAlready) {

        state.miniMessage.forEach(msg => {

          if (msg.id === payload.id) {

            msg.icon = payload.icon

            msg.content = payload.content

            msg.style = payload.style

          }

        })

      } else {

        state.miniMessage.push({

          id: payload.id,

          icon: payload.icon,

          content: payload.content,

          show: true,

          style: payload.style

        })

      }

    },

    hideMiniMessage: (state, { payload }: { payload: string }) => {

      // Find the message and set show to false
      state.miniMessage.forEach(msg => { if (msg.id === payload) msg.show = false })

    },

    removeMiniMessage: (state, { payload }: { payload: string }) => {

      state.miniMessage = state.miniMessage.filter(msg => msg.id !== payload)

    },

    setSmallMessage: (state, { payload }) => {

      state.smallMessage.heading = payload.heading

      state.smallMessage.content = payload.content

      state.smallMessage.style = payload.style

      state.smallMessage.show = payload.show

    },

    setNormalMessage: (state, { payload }) => {

      state.normalMessage.heading = payload.heading

      state.normalMessage.content = payload.content

      state.normalMessage.style = payload.style

      state.normalMessage.answer = payload.answer

      state.normalMessage.show = payload.show

    },

    setNormalMessageAnswer: (state, { payload }) => {

      state.normalMessage.answer = payload

    },

    setXMessage: (state, { payload }) => {

      state.XMessage.heading = payload.heading

      state.XMessage.content = payload.content

      state.XMessage.style = payload.style

      state.XMessage.show = payload.show

      state.XMessage.buttons = payload.buttons

      state.XMessage.answer = payload.answer

    },

    setXMessageAnswer: (state, { payload }) => {

      state.XMessage.answer = payload

    },

  }

})

export default itemSlice.reducer;

export const { addMiniMessage, hideMiniMessage, removeMiniMessage, setNormalMessage, setNormalMessageAnswer, setSmallMessage, setXMessage, setXMessageAnswer } = itemSlice.actions
