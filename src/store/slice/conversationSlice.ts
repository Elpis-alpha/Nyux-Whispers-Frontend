import { createSlice } from '@reduxjs/toolkit'


const conversationSlice = createSlice({

  name: "conversation",

  initialState: {

    data: [],

    available: false,

    tested: false,

    // This is used to determine weather or not the conversation data should be refetched in the FetchAppData Component

    // It is set to true in the login and sign up pages so that the conversation will be refetched 

    refetchConversation: false

  },

  reducers: {

    setConversationData: (state, { payload }) => {

      state.data = payload

      state.tested = true

      state.available = true

      state.refetchConversation = false

    },

    setConversationTest: (state, { payload }) => {

      state.tested = payload

    },

    removeConversationData: (state) => {

      state.data = []

      state.available = false

      state.tested = true

      state.refetchConversation = false

    },

    setRefetchConversation: (state, { payload }) => {

      state.refetchConversation = payload

    },

  }

})

export default conversationSlice.reducer;

export const { removeConversationData, setConversationData, setConversationTest, setRefetchConversation } = conversationSlice.actions
