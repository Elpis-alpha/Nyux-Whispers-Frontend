import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"

// @ts-ignore
import { isEmail } from "validator"
import { userExistence } from "../../api"
import { getApiJson } from "../../controllers/APICtrl"
import { removeFullLoader, sendFullLoader } from "../../controllers/LoadingCtrl"
import { sendMiniMessage } from "../../controllers/MessageCtrl"


import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "../general/InputComponent"


const StageTwo = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const elementStages = useMemo(() => [[0, 1300], [1, 1500], [2, 1400], [3, 1500], [4], [5, 1400]], [])

  const stageAction = elementStages[pageStage]

  const showOn = (index: number) => {

    return stageAction[0] === index ? " show " : ""

  }

  useEffect(() => {

    const doStuff = async () => {

      const stageAction = elementStages[pageStage]

      if (typeof stageAction[1] === "number") {

        await waitFor(stageAction[1])

        if (pageStage === elementStages.length - 1) setSignupStage("stage-3")

        else setPageStage(pageStage + 1)

      }

    }

    doStuff()

  }, [pageStage, elementStages, setSignupStage])

  const submitForm = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-email-inp"].value.trim()

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

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {

    const text = e.currentTarget.value.trim()

    setValidText(isEmail(text) ? "" : "Invalid Email")

    if (text.length === 0) {

      setValidText("")

    }

  }

  return (

    <StageTwoStyle>

      <div className="inner" ref={innerRef}>

        <div className="stage-list">

          <p className={"heavy" + showOn(0)}>Hello {signupData.name}</p>

          <p className={showOn(1)}>Welcome to this platform</p>

          <p className={showOn(2)}>Do you mind dropping your email address?</p>

          <p className={showOn(3)}>We need it to start the registration</p>

          <form onSubmit={submitForm} className={showOn(4)}>

            <div className="inp-cont">

              <InputComponent label="Enter your email" valid={validText}

                input={<input required id="ny-email-inp" name="ny-email-inp"

                  onInput={inputHandler}

                  type="text" autoComplete="ny-email-inp" />} />

            </div>

            <button>Validate</button>

          </form>

          <p className={showOn(5)}>Perfect, now we can get started</p>

        </div>

      </div>

    </StageTwoStyle>

  )

}

const StageTwoStyle = styled.div`
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

export default StageTwo
