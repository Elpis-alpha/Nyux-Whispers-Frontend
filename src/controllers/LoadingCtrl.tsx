import { CSSProperties } from 'styled-components'

import { setFullLoader, hideFullLoader } from '../store/slice/loadingSlice'

import store from '../store/store'


interface fullLType {

  text: string

  style?: CSSProperties

}

export const sendFullLoader = ({ text, style = {} }: fullLType, time?: number) => {

  store.dispatch(setFullLoader({ show: true, text, style }))

  if (time === undefined) return;

  let newTime = time

  setTimeout(() => {

    const state = store.getState().loading.fullLoader

    if (state.text === text) removeFullLoader()

  }, newTime);

}

export const removeFullLoader = () => {

  store.dispatch(hideFullLoader())

}

/* How to use me 

const fl = sendFullLoader({

  text: "Verifying ID",

  style: {}

}, 2000)

*/
