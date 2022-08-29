export const creator = "Elpis"

export const siteName = "Nyux Whispers"

export const siteDescription = "Nyux Whispers presents you a fabulous experience on our chatting application where you can communicate with users around the world"

export const emailName = "Nyux Whispers"

export const hostEmail = "site.overseer.alpha@gmail.com"

export const tokenCookieName = "nyux-whispers-user-token"


// Dynamic Variables
export const host = window ? window.location.origin : process.env.REACT_APP_HOST

export const backendLocation: string = process.env.REACT_APP_BACK_END ? process.env.REACT_APP_BACK_END : ""

export const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true"

export const complain = `${process.env.REACT_APP_BACK_END}/complain`
