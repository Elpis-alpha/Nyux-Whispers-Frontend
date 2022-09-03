import { CSSProperties } from "styled-components"

import { splitCapital } from "../controllers/SpecialCtrl"

const common = {

  flexing: (align = "center", justify = "center", dir = "row") => {

    return `
      display: flex;
      align-items: ${align};
      justify-content: ${justify};
      flex-direction: ${dir};
    `

  },

  opacityAnimation: (name = "opacity-in") => {

    return `
      @keyframes ${name} {
        0% {opacity: 0} 
        100% {opacity: 1} 
      }
    `

  },

  scaleAnimation: (name = "scale-in") => {

    return `
      @keyframes ${name} {
        0% {transform: scale(0)} 
        100% {transform: scale(1)} 
      }
    `

  },

  transitions: (object: CSSProperties) => {

    let final = 'transition:'

    for (const name in object) {

      if (Object.prototype.hasOwnProperty.call(object, name)) {

        // @ts-ignore
        const time = object[name] + "s";

        final += ` ${splitCapital(name)} ${time},`

      }

    }
    
    final = final.split('').slice(0, -1).join('')

    final += ';'
    
    return final

  },

  scaleHover: (scale = 1.1) => {

    return `
      transform: scale(1);
      &:hover {
        transform: scale(${scale});
      }
    `

  },

}

export default common
