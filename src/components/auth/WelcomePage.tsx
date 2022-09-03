import { useEffect } from "react";
import { useDispatch } from "react-redux";

import styled, { useTheme } from "styled-components"

import { setTheme } from "../../store/slice/displaySlice";


const WelcomePage = () => {

  const theme = useTheme()

  const dispatch = useDispatch()



  console.log(theme);


  return (

    <WelcomePageStyle about="teal">

      Distinctively drive dynamic meta-services whereas proactive relationships. Credibly plagiarize installed base infomediaries through scalable information. Efficiently fabricate interdependent internal or "organic" sources vis-a-vis backend alignments. Completely deploy collaborative methods of empowerment rather than reliable ideas. Collaboratively iterate business convergence vis-a-vis integrated vortals.

      {/* Continually cultivate interdependent functionalities with functionalized infomediaries. Competently drive value-added communities vis-a-vis client-centered testing procedures. Appropriately build integrated innovation before premier networks. Professionally build cross functional methods of empowerment whereas real-time e-markets. Energistically provide access to state of the art benefits through exceptional internal or "organic" sources. */}

      <button onClick={() => dispatch(setTheme("Light"))}>Light</button>

      <button onClick={() => dispatch(setTheme("Dark"))}>Dark</button>

    </WelcomePageStyle>

  )

}

const WelcomePageStyle = styled.div`

padding: 1pc;
  
`

export default WelcomePage
