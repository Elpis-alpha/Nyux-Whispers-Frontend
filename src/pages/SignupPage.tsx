import { useState } from "react"
import styled from "styled-components"
import Intro from "../components/signup/Intro"
import StageOne from "../components/signup/StageOne"
import StageTwo from "../components/signup/StageTwo"
import StageThree from "../components/signup/StageThree"
import StageFour from "../components/signup/StageFour"
import Average from "../components/signup/Average"


const SignupPage = () => {

  const [signupData, setSignupData] = useState({
    name: "", email: "", emailCode: "", uniqueName: "", password: ""
  })

  const [signupStage, setSignupStage] = useState<"initial" | "stage-1" | "stage-2" | "stage-3" | "stage-4" | "average">("initial") // initial

  return (

    <SignupPageStyle>

      {signupStage === "initial" && <Intro {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-1" && <StageOne {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-2" && <StageTwo {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-3" && <StageThree {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-4" && <StageFour {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "average" && <Average {...{ signupData, setSignupData, setSignupStage }} />}

    </SignupPageStyle>

  )

}

const SignupPageStyle = styled.div`

  flex: 1;
  width: 100%;
  font-display: optional;

  ${props => props.theme.flexing('stretch')}
`

export default SignupPage
