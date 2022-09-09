import { useEffect, useMemo, useRef, useState } from "react"
import { SpinnerCircular } from "spinners-react"

import styled, { useTheme } from "styled-components"

// @ts-ignore

import { isEmail } from "validator"

import { userExistence } from "../../api"

import { getApiJson } from "../../controllers/APICtrl"

import { removeFullLoader, sendFullLoader } from "../../controllers/LoadingCtrl"

import { sendMiniMessage } from "../../controllers/MessageCtrl"

import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "../general/InputComponent"


const StageThree = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const { rgbaOpp, rgbaSame } = useTheme()

  const [pageStage, setPageStage] = useState(3)

  const [validText, setValidText] = useState("")

  const [nameList, setNameList] = useState([])

  const elementStages = useMemo(() => [[0, 2300], [1, 1500], [2, 1600], [3], [4], [5, 1850]], [])

  const stageAction = elementStages[pageStage]

  const showOn = (index: number) => {

    return stageAction[0] === index ? " show " : ""

  }

  useEffect(() => {

    const doStuff = async () => {

      const stageAction = elementStages[pageStage]

      if (typeof stageAction[1] === "number") {

        await waitFor(stageAction[1])

        if (pageStage === elementStages.length - 1) setSignupStage("stage-4")

        else setPageStage(pageStage + 1)

      }

    }

    doStuff()

  }, [pageStage, elementStages, setSignupStage])

  useEffect(() => {

    const runAFunction = async () => {

      const existData = await getApiJson(userExistence(signupData.name))

    }

    if (nameList.length === 0) runAFunction()

  }, [nameList])


  const submitForm = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-ID-inp"].value.trim()

    if (!isEmail(val)) {

      setValidText("Invalid Email")

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Invalid Email" }

      }, 2000)

    }

    sendFullLoader({ text: "Validating Email" })

    const existData = await getApiJson(userExistence(val))

    if (existData.message === 'user does not exist') {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Valid Email" }

      }, 2000)

      setSignupData({ ...signupData, email: val })

      setPageStage(pageStage + 1)

    } else {

      setValidText("Email is taken")

    }

    removeFullLoader()

  }

  const inputHandler = () => {

    // do nothing

  }

  return (

    <StageThreeStyle>

      <div className="inner" ref={innerRef}>

        <div className="stage-list">

          <p className={showOn(0)}>As part of the registration, you need to provide a unique name that no one here has</p>

          <p className={showOn(1)}>Sounds stressful right?</p>

          <p className={showOn(2)}>That's why we thought up three different ones for you</p>

          <div className={showOn(3)}>

            {nameList.length === 0 && <div>

              <SpinnerCircular size="8pc" color={rgbaOpp(1)} secondaryColor={rgbaOpp(.2)} />

              <p>Loading names...</p>

            </div>}

            {nameList.length > 0 && <>

              <p>You can still edit them if you want</p>

              <div className="bt-hol">

                {nameList.map(it => <button>{it}</button>)}

                <button>None</button>

              </div>

            </>}

          </div>

          <form onSubmit={submitForm} className={showOn(4)}>

            <div className="inp-cont">

              <InputComponent label="Enter your ID" valid={validText}

                input={<input required id="ny-ID-inp" name="ny-ID-inp"

                  onInput={inputHandler}

                  type="text" autoComplete="ny-ID-inp" />} />

            </div>

            <button>Validate</button>

          </form>

          <p className={showOn(5)}>Now your identity is established</p>

        </div>

      </div>

    </StageThreeStyle>

  )

}

const StageThreeStyle = styled.div`
  width: 100%;
  flex: 1;

  ${p => p.theme.flexing()}

  .inner {
    width: 80%;
    text-align: center;
    padding: 5pc 0;
    
    @media screen and (max-width: 600px) {
      width: 90%;
    }

    .stage-list {
      display: block;

      p {

        &.heavy {
          font-size: 2pc;
          line-height: 3pc;
        }

        font-weight: bold;
        font-size: 1.3pc;
        line-height: 2.5pc;
      }

      > * {
        display: none;

        &.show {
          display: block;
          width: 100%;
          ${props => props.theme.useAnimation("opacity", "kjasdk")}
        }
      }

      form {

        &.show {
          ${p => p.theme.flexing("center", "stretch")}

          @media screen and (max-width: 500px) {
            flex-direction: column;
  
            .inp-cont {
              width: 100%;
            }
            
            button {
              width: 100%;
              margin: 0;
            }
          }
        }

        .inp-cont {
          flex: 1;
        }
        
        button {
          display: block;
          margin: 0 auto;
          margin-left: 1pc;
          /* margin-bottom: .5pc; */
          border: 0 none;
          padding: 0pc 2pc;
          border-radius: 0.5pc;
          background-color: ${props => props.theme.bg};
          box-shadow: -2px -2px 4px ${props => props.theme.rgbaFullSame(.5)}, 2px 2px 4px ${props => props.theme.rgbaFullOpp(.3)};

          &:hover {
            box-shadow: inset -2px -2px 8px ${props => props.theme.rgbaFullSame(.5)}, inset 2px 2px 8px ${props => props.theme.rgbaFullOpp(.1)};
          }

          &:disabled {
            opacity: 0.3;
          }
        }
      }
    }
  }
`

export default StageThree
