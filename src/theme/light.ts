import common from "./common"


const light = {

  ...common,

  name: 'light',

  bg: '#ededed',

  col: '#121212',

  rgbaSame: (a = .2) => `rgba(237, 237, 237, ${a})`,

  rgbaOpp: (a = .2) => `rgba(19, 19, 19, ${a})`,

  newMorph: (x = 10, y = 10, b = 20) => `
    box-shadow: ${x}px ${y}px ${b}px #C6C6C6, -${x}px -${y}px ${b}px #FFFFFF;
  `,

}

export default light
