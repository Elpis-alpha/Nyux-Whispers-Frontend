import common from "./common"


const dark = {

  ...common,

  name: 'dark',

  bg: '#121212',

  col: '#ededed',

  rgbaSame: (a = .2) => `rgba(19, 19, 19, ${a})`,

  rgbaOpp: (a = .2) => `rgba(237, 237, 237, ${a})`,

  rgbaFullSame: (a = .2) => `rgba(0, 0, 0, ${a})`,
  
  rgbaFullOpp: (a = .2) => `rgba(255, 255, 255, ${a})`,

  newMorph: (x = 10, y = 10, b = 20) => `
    box-shadow: ${x}px ${y}px ${b}px #0F0F0F, -${x}px -${y}px ${b}px #252525;
  `,

}

export default dark
