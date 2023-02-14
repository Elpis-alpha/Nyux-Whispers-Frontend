import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"

// @ts-ignore
import { isEmail } from "validator"
import { createPreUser, userExistence, verifyPreUser } from "../../api"
import { getApiJson, postApiJson } from "../../controllers/APICtrl"
import { removeFullLoader, sendFullLoader } from "../../controllers/LoadingCtrl"
import { sendMiniMessage } from "../../controllers/MessageCtrl"


import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "../general/InputComponent"


const StageTwo = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const [resendable, setResendable] = useState(true)

  const [counter, setCounter] = useState(0)

  const [resendableTimeout, setResendableTimeout] = useState<{ t: any, i: any }>({ t: 0, i: 0 })

  const elementStages = useMemo(() => [[0, 1300], [1, 1500], [2, 1400], [3, 1500], [4], [5, 1700], [6], [7, 1400]], [])

  const stageAction = elementStages[pageStage]

  const showOn = (index: number) => {

    return stageAction[0] === index ? " show " : ""

  }

  useEffect(() => {
    return () => {
      clearTimeout(resendableTimeout.t)
      clearInterval(resendableTimeout.i)
    }
  }, [resendableTimeout])


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

      await postApiJson(createPreUser(), {
        email: val,
      })

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

  const resendEmail = async () => {

    if (!resendable) return false

    const meessageID = sendMiniMessage({

      icon: { name: "loading" },

      content: { text: "Sending Email" }

    })

    setResendable(false)

    const emailStatus = await postApiJson(createPreUser(), {
      email: signupData.email
    })

    if (emailStatus?.mailInfo?.message === "email sent") {

      setResendable(false)

      const tmxr = setTimeout(() => {
        setResendable(true)
      }, 10000)

      setCounter(10)

      const imxr = setInterval(() => {
        setCounter(prev => {
          if (prev === 1) clearInterval(imxr)
          return prev - 1
        })
      }, 1000)

      setResendableTimeout({ t: tmxr, i: imxr })

      return sendMiniMessage({

        id: meessageID,

        icon: { name: "ok" },

        content: { text: "Email Sent" }

      }, 2000)

    } else {

      setResendable(true)

      return sendMiniMessage({

        id: meessageID,

        icon: { name: "times" },

        content: { text: "Sending Failed" }

      }, 2000)

    }

  }

  const submitValidateForm = async (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-email-val-inp"].value.trim()

    if (val.length !== 6) {

      setValidText("Invalid Code")

      return sendMiniMessage({

        icon: { name: "times" },

        content: { text: "Invalid Code" }

      }, 2000)

    }

    sendFullLoader({ text: "Validating Email" })

    const validationData = await postApiJson(verifyPreUser(), {
      email: signupData.email,
      emailCode: val
    })

    if (validationData.verified) {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: "Valid Email" }

      }, 2000)

      setSignupData({ ...signupData, emailCode: val })

      setPageStage(pageStage + 1)

    } else {

      setValidText("Invalid Email Code")

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

          <p className={showOn(5)}>Kindly check your mail for your verification code</p>

          <form onSubmit={submitValidateForm} className={showOn(6)}>

            <div className="inp-cont">

              <InputComponent label="Enter the code" valid={validText}

                input={<input required id="ny-email-val-inp" name="ny-email-val-inp"

                  type="text" autoComplete="ny-email-val-inp" />} />

            </div>

            <button type="button" onClick={resendEmail} disabled={!resendable}>{counter === 0 ? "Resend" : counter + "s"}</button>

            <button>Validate</button>

          </form>

          <p className={showOn(7)}>Perfect, now we can get started</p>

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

              &:nth-of-type(2) {
                margin-top: 1pc;
              }
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
            opacity: .4;
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
