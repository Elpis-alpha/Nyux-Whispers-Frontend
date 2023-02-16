import { useEffect, useMemo, useRef, useState } from "react"

import styled from "styled-components"
import { requestFullScreen } from "../../controllers/SpecialCtrl"

import { waitFor } from "../../controllers/TimeCtrl"

import InputComponent from "../general/InputComponent"


const StageOne = ({ signupData, setSignupData, setSignupStage }: SignUpStages) => {

  const innerRef = useRef(null)

  const [pageStage, setPageStage] = useState(0)

  const [validText, setValidText] = useState("")

  const elementStages = useMemo(() => [[0, 2000], [1, 2300], [2, 2000], [3], [4, 1000], [5, 1500]], [])

  const stageAction = elementStages[pageStage]

  const showOn = (index: number) => {

    return stageAction[0] === index ? " show " : ""

  }

  useEffect(() => {

    const doStuff = async () => {

      const stageAction = elementStages[pageStage]

      if (typeof stageAction[1] === "number") {

        await waitFor(stageAction[1])

        if (pageStage === elementStages.length - 1) setSignupStage("stage-2")

        else setPageStage(pageStage + 1)

      }

    }

    doStuff()

    if (pageStage === 0) requestFullScreen()

  }, [pageStage, elementStages, setSignupStage])

  const submitForm = (e: any) => {

    e.preventDefault()

    setValidText("")

    const form = e.target

    const val = form["ny-name-inp"].value

    if (val.trim() === "") {

      setValidText("Name is too short")

    } else {

      setSignupData({ ...signupData, name: val })

      setPageStage(pageStage + 1)

    }

  }

  return (

    <StageOneStyle>

      <div className="inner" ref={innerRef}>

        <div className="stage-list">

          <p className={"heavy" + showOn(0)}>Hello there</p>

          <p className={showOn(1)}>Actually before we start courtesy demands we exchange names.</p>

          <p className={showOn(2)}>We're Nyux Whispers, what's your name?</p>

          <form onSubmit={submitForm} className={showOn(3)}>

            <div className="inp-cont">

              <InputComponent label="Enter your name" valid={validText}

                input={<input required id="ny-name-inp" type="text" name="ny-name-inp" autoComplete="on" defaultValue={signupData.name} />} />

            </div>

            <button>Send</button>

          </form>

          <h3 className={showOn(4)}>{signupData.name}</h3>

          <p className={showOn(5)}>Has a nice ring to it</p>

        </div>

      </div>

    </StageOneStyle>

  )

}

const StageOneStyle = styled.div`
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

export default StageOne
