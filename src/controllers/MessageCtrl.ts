import { CSSProperties } from 'styled-components'

import { v4 } from 'uuid'

import { addMiniMessage, setNormalMessage, setSmallMessage, setXMessage, hideMiniMessage } from '../store/slice/messagesSlice'

import store from '../store/store'


interface miniType {

  icon: {

    name?: "ok" | "copy" | "save" | "info" | "times" | "loading",

    style?: CSSProperties

  }

  content: {

    text: string,

    style?: CSSProperties

  }

  style?: CSSProperties

  id?: string

}

interface smallNormalType {

  heading: {

    text?: string,

    style?: CSSProperties

  }

  content: {

    text?: string,

    style?: CSSProperties

  }

  style?: CSSProperties

}

interface XType {

  heading?: {

    text?: string,

    style?: CSSProperties

  }

  content?: {

    text?: string,

    style?: CSSProperties

  }

  style?: CSSProperties

  buttons: {

    text: string,

    waitFor: string,

    style?: CSSProperties

  }[]

}

export const sendMiniMessage = ({ icon = {}, content = { text: "" }, style = {}, id }: miniType, time?: number) => {

  id = id ? id : v4()

  icon.name = icon.name === undefined ? 'ok' : icon.name

  store.dispatch(addMiniMessage({ show: true, content, style, icon, id }))

  if (time === undefined) { return id }

  let newTime = time

  newTime = newTime < 51000 ? newTime : 1000

  setTimeout(() => {

    // const state = store.getState().messages.miniMessage

    // @ts-ignore
    // if (state.content.text === content.text) { removeMiniMessage(id) }
    removeMiniMessage(id)
    
  }, newTime);

  return id

}

export const removeMiniMessage = (id: string) => {

  store.dispatch(hideMiniMessage(id))

}

export const sendSmallMessage = ({ heading = {}, content = {}, style = {} }: smallNormalType, time?: number) => {

  removeSmallMessage()

  store.dispatch(setSmallMessage({ show: true, heading, content, style }))

  if (time === undefined) { return false }

  let newTime = time

  newTime = newTime < 10001 ? newTime : 1000

  setTimeout(() => {

    const state = store.getState().messages.smallMessage

    // @ts-ignore
    if (state.content.text === content.text) { removeSmallMessage() }

  }, newTime);

}

export const removeSmallMessage = () => {

  store.dispatch(setSmallMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    style: undefined

  }))

}

export const sendNormalMessage = async ({ heading = {}, content = {}, style = {} }: smallNormalType) => {

  const accepted = await new Promise(resolve => {

    const stateX = store.getState().messages.normalMessage

    if (stateX.show === true) { return false }

    store.dispatch(setNormalMessage({ show: true, heading, content, answer: "", style }))

    const unsubscribe = store.subscribe(() => {

      const state = store.getState().messages.normalMessage

      if (state.answer !== "") {

        unsubscribe()

        resolve(state.answer)

        removeNormalMessage()

      }

    })

  });

  return accepted

}

export const removeNormalMessage = () => {

  store.dispatch(setNormalMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    answer: "",

    style: undefined

  }))

}

export const sendXMessage = async ({ heading = {}, content = {}, buttons = [], style = {} }: XType) => {

  const accepted = await new Promise(resolve => {

    const stateX = store.getState().messages.XMessage

    if (stateX.show === true) { return false }

    store.dispatch(setXMessage({ show: true, heading, content, buttons, answer: "", style }))

    const unsubscribe = store.subscribe(() => {

      const state = store.getState().messages.XMessage

      if (state.answer !== "") {

        unsubscribe()

        resolve(state.answer)

        removeXMessage()

      }

    })

  });

  return accepted

}

export const removeXMessage = () => {

  store.dispatch(setXMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    buttons: [],

    answer: ""

  }))

}

/* How to use me 

const xMessg = await sendXMessage({

  heading: { text: "Cookies Settings", style: {} },

  content: { text: "We use cookies primarily for authentication sanlk asdlkknasd sdalksda ljads", style: { textAlign: 'left' } },

  buttons: [

    { text: 'Accept', waitFor: 'allowed', style: { backgroundColor: '#2e2e52' } }

  ],

  style: {}

})

const normMessg = await sendNormalMessage({

  heading: { text: "Welcome to the New World", style: {} },

  content: { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus, earum excepturi iusto quibusdam.", style: {} },

  style: {}

})

const smallMessg = sendSmallMessage({

  heading: { text: "You just became smarter", style: { padding: '.5rem' } },

  content: { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus, earum excepturi iusto quibusdam.", style: {} },

  style: {}

}, 4000)

const miniMessg = sendMiniMessage({

  icon: { name: "copy", style: {} },

  content: { text: "Text Copied!", style: {} },

  style: {}

}, 2000)

*/
