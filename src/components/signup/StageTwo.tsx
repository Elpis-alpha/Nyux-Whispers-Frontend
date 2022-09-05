import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"

// @ts-ignore
import { isEmail } from "validator"


import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "../general/InputComponent"


const StageTwo = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const [hasStarted, setHasStarted] = useState(false)

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const elementStages = useMemo(() => [[0, 0, 2000], [0, 1, 2000], [0, 2, 2000], ["input", 1], [2, 0, 1500]], [])

  useEffect(() => {

    const doStuff = async () => {

      setHasStarted(true)

      const stageAction = elementStages[pageStage]

      Array.from((innerRef.current as any)?.children).forEach((parent: any) => {

        parent.classList.remove("show")

        if (parent.classList.contains("sn")) return

        Array.from(parent?.children).forEach((child: any) => {

          child.classList.remove("show")

        })

      })

      if (!stageAction) {

        setSignupStage("stage-2")

      } else if (typeof stageAction[0] === "number") {

        // @ts-ignore
        const targetParent = innerRef.current?.children[stageAction[0]] as HTMLElement

        targetParent?.classList?.add('show')

        // @ts-ignore
        const target = innerRef.current?.children[stageAction[0]]?.children[stageAction[1]] as HTMLElement

        target?.classList?.add('show')

        // @ts-ignore
        await waitFor(stageAction[2])

        setPageStage(pageStage + 1)

      } else {

        // @ts-ignore
        const targetParent = innerRef.current?.children[stageAction[1]] as HTMLElement

        targetParent?.classList?.add('show')

      }

    }

    if (!hasStarted) doStuff()

  }, [pageStage, elementStages, setSignupStage, hasStarted])

  const submitForm = (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-name-inp"].value

    if (isEmail(val)) {

      setValidText("Name is too short")

    } else {

      setSignupData({ ...signupData, email: val })

      setPageStage(pageStage + 1)

    }

  }

  return (

    <StageTwoStyle>

      <div className="inner" ref={innerRef}>

        <div className="start-list">

          <p className="heavy">Hello {signupData.name} <br /> Welcome to this platform</p>

          <p>Do you mind dropping your email address?</p>

          <p>We need it to start the registration</p>

        </div>

        <div className="reveal sn">

          <form onSubmit={submitForm}>

            <div className="inp-cont">

              <InputComponent label="Enter your email" valid={validText}

                input={<input required id="ny-email-inp" name="ny-email-inp"

                  onInput={e => setValidText(isEmail(e.currentTarget.value) ? "Invalid Email" : "")}

                  type="text" autoComplete="ny-email-inp" />} />

            </div>

            <button>Send</button>

          </form>


        </div>

        <div className="end-list">

          <p>Perfect, now we can get started</p>

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

    .reveal, .end {
      display: none;

      &.show {
        display: block;
        ${props => props.theme.useAnimation("opacity")}
      }
    }

    .start-list, .end-list {
      display: none;

      p {

        &.heavy {
          font-size: 2pc;
          line-height: 3pc;
        }

        font-weight: bold;
        font-size: 1.3pc;
        line-height: 2.5pc;
      }

      &.show {
        display: block;
      }

      > * {
        display: none;

        &.show {
          display: block;
          width: 100%;
          ${props => props.theme.useAnimation("opacity")}
        }
      }
    }

    form {
      ${p => p.theme.flexing("center", "stretch")}

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
`

export default StageTwo













































