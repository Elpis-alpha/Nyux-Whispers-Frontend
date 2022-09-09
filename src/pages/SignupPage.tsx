import { useState } from "react"

import styled from "styled-components"

import Intro from "../components/signup/Intro"

import StageOne from "../components/signup/StageOne"

import StageTwo from "../components/signup/StageTwo"

import StageThree from "../components/signup/StageThree"


const SignupPage = () => {

  const [signupData, setSignupData] = useState({

    name: "Elpis", email: "elpis@gmail.com", uniqueName: "", password: ""

  })

  const [signupStage, setSignupStage] = useState("stage-3") // initial

  return (

    <SignupPageStyle>

      {signupStage === "initial" && <Intro {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-1" && <StageOne {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-2" && <StageTwo {...{ signupData, setSignupData, setSignupStage }} />}

      {signupStage === "stage-3" && <StageThree {...{ signupData, setSignupData, setSignupStage }} />}

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
