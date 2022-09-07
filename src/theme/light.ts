import common from "./common"


const light = {

  ...common,

  name: 'light',

  bg: '#ededed',

  col: '#121212',

  rgbaSame: (a = .2) => `rgba(237, 237, 237, ${a})`,

  rgbaOpp: (a = .2) => `rgba(19, 19, 19, ${a})`,

  rgbaFullSame: (a = .2) => `rgba(255, 255, 255, ${a})`,

  rgbaFullOpp: (a = .2) => `rgba(0, 0, 0, ${a})`,

  newMorph: (x = 10, y = 10, b = 20) => `
    box-shadow: ${x}px ${y}px ${b}px #C6C6C6, -${x}px -${y}px ${b}px #FFFFFF;
  `,

  newMorph2: `
    background: linear-gradient(145deg, #fefefe, #d5d5d5);
    box-shadow:  10px 10px 20px #b2b2b2, -10px -10px 20px #ffffff;
  `,

  newMorphMessages: `
    background: linear-gradient(145deg, #fefefe, #d5d5d5);
    box-shadow:  10px 10px 20px #b2b2b2, -10px -10px 20px #ffffff;
  `

}

export default light
