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

  newMorph2: `
    background: linear-gradient(145deg, #131313, #101010);
    box-shadow:  10px 10px 20px #0e0e0e,-10px -10px 20px #171717;
  `,

  newMorphMessages: `
    background: linear-gradient(145deg, #131313, #101010);
    box-shadow:  10px 10px 20px #0e0e0e,-10px -10px 20px #171717;
  `

}

export default dark
